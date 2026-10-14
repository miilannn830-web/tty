# DailyCut

A lightweight short-video creator app with a Gemini-powered AI chat page.

## Run the app

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env`.
3. Add a Gemini API key from Google AI Studio to `.env`:

	```env
	GEMINI_API_KEY=your_key_here
	GEMINI_MODEL=gemini-2.5-flash
	PORT=3000
	```

4. Start the app:

	```powershell
	npm start
	```

5. Open `http://localhost:3000` and choose **AI Studio** in the desktop rail, or the sparkle button on mobile.

The key is read by `server.js` and is never sent to the browser. Do not commit `.env`. Without a key, the chat page still loads and shows a setup message when a prompt is sent.

## Gemini configuration

Create an API key in Google AI Studio and set it as `GEMINI_API_KEY` in your private `.env` file. The server defaults to `gemini-2.5-flash`; set `GEMINI_MODEL` to another model available to your key if needed. The frontend calls only the local `/api/chat` route, and the server forwards a short conversation history to Gemini.

Chat history is stored in the current browser's local storage. This is a prototype: add authentication, server-side rate limiting, and a privacy policy before exposing it publicly.