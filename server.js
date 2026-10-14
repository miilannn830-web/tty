import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const port = Number(process.env.PORT || 3000);
const maxBodyBytes = 24_000;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const loadEnv = async () => {
  const envPath = resolve(root, '.env');
  if (!existsSync(envPath)) return;
  const content = await readFile(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, '$2');
  }
};

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(payload));
};

const readJsonBody = (request) => new Promise((resolveBody, rejectBody) => {
  let body = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => {
    body += chunk;
    if (Buffer.byteLength(body) > maxBodyBytes) {
      rejectBody(Object.assign(new Error('Message is too large.'), { statusCode: 413 }));
      request.destroy();
    }
  });
  request.on('end', () => {
    try {
      resolveBody(JSON.parse(body || '{}'));
    } catch {
      rejectBody(Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }));
    }
  });
  request.on('error', rejectBody);
});

const handleChat = async (request, response) => {
  if (request.method !== 'POST') {
    return sendJson(response, 405, { error: 'Use POST to send a chat message.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return sendJson(response, 503, {
      error: 'Gemini is not connected yet. Add GEMINI_API_KEY to your local .env file, then restart the app.'
    });
  }

  try {
    const body = await readJsonBody(request);
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message || message.length > 4000) {
      return sendJson(response, 400, { error: 'Write a message between 1 and 4000 characters.' });
    }

    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];
    const contents = history
      .filter((entry) => entry && ['user', 'model'].includes(entry.role) && typeof entry.text === 'string')
      .map((entry) => ({
        role: entry.role,
        parts: [{ text: entry.text.slice(0, 4000) }]
      }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: 'You are DailyCut AI, a warm, clear and creative assistant inside a short-video creator app. Help with video ideas, scripts, editing, captions, and everyday questions. Be useful, conversational, and concise unless asked for detail.' }]
          },
          contents,
          generationConfig: { temperature: 0.8, maxOutputTokens: 1200 }
        }),
        signal: AbortSignal.timeout(45_000)
      }
    );

    const result = await geminiResponse.json().catch(() => ({}));
    if (!geminiResponse.ok) {
      const upstreamMessage = result.error?.message;
      const safeMessage = geminiResponse.status === 400 || geminiResponse.status === 403
        ? 'Gemini rejected the request. Check the API key and model settings.'
        : geminiResponse.status === 429
          ? 'Gemini is busy or the API quota is exhausted. Try again shortly.'
          : 'Gemini could not answer right now. Try again shortly.';
      console.error('Gemini API error:', geminiResponse.status, upstreamMessage || 'No details');
      return sendJson(response, 502, { error: safeMessage });
    }

    const reply = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();
    if (!reply) return sendJson(response, 502, { error: 'Gemini returned an empty answer. Try rephrasing.' });
    return sendJson(response, 200, { reply });
  } catch (error) {
    const statusCode = error.statusCode || (error.name === 'TimeoutError' ? 504 : 500);
    const message = statusCode === 504 ? 'Gemini took too long to answer. Please try again.' : error.message;
    if (!response.headersSent && !response.destroyed) sendJson(response, statusCode, { error: message });
  }
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  if (url.pathname === '/api/chat') return handleChat(request, response);
  if (url.pathname === '/api/status') {
    if (request.method !== 'GET') return sendJson(response, 405, { error: 'Use GET to check AI status.' });
    return sendJson(response, 200, {
      configured: Boolean(process.env.GEMINI_API_KEY),
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    });
  }

  const requestedPath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const filePath = resolve(root, `.${requestedPath}`);
  if (filePath !== root && !filePath.startsWith(root + sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(file);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

await loadEnv();
server.listen(port, () => {
  console.log(`DailyCut is running at http://localhost:${port}`);
  console.log(process.env.GEMINI_API_KEY ? 'Gemini chat is configured.' : 'Set GEMINI_API_KEY in .env to enable live AI replies.');
});
