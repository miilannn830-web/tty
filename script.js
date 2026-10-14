const videoPool = [
  'https://videos.pexels.com/video-files/6798980/6798980-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/7126551/7126551-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/38410501/38410501-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/38251068/38251068-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/7009794/7009794-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/6956635/6956635-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/7236047/7236047-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/7646456/7646456-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/8851743/8851743-hd_1080_1920_25fps.mp4',
  'https://videos.pexels.com/video-files/6583560/6583560-hd_1080_1920_25fps.mp4'
];

const adjectivePool = ['sunset', 'coffee', 'street', 'night', 'glow', 'dreamy', 'travel', 'wild', 'golden', 'forest', 'city', 'dance', 'vibes', 'studio', 'summer', 'slow', 'moment', 'spark', 'cozy', 'midnight'];
const nichePool = ['edit', 'look', 'clip', 'story', 'vlog', 'challenge', 'travel', 'fitness', 'mood', 'flow', 'nightlife', 'run', 'studio', 'food', 'fashion', 'dance', 'trip'];
const motionPool = ['just posted a new edit', 'after-hours vibes', 'keeping it real', 'routine reset', 'this one is for the feed', 'late-night energy', 'fresh from the studio', 'living the moment', 'here we go again', 'caught this one on camera'];
const emojis = ['✨', '🔥', '🎧', '🌆', '📸', '💫', '🥂', '🚀', '🌴', '🎶', '🤍', '⚡'];

const usernames = [
  'luna.studio', 'mio.motion', 'niko.run', 'nova.frame', 'sora.snaps', 'aria.chase', 'pixel.hush', 'ethan.cove', 'sami.wave', 'jules.city',
  'mia.blaze', 'zane.lane', 'ruby.loop', 'leo.nova', 'ivy.hill', 'dan.pulse', 'nina.grove', 'ryan.tide', 'cassidy.yo', 'olive.sky',
  'marin.eye', 'aiden.studio', 'skyler.glow', 'maya.road', 'elio.film', 'priya.play', 'noah.peak', 'hannah.rise', 'tariq.studio', 'calla.vibe',
  'harper.q', 'omar.miles', 'sol.vibe', 'brielle.day', 'kayden.coast', 'tatiana.rise', 'corey.flow', 'dahlia.drip', 'levi.moon', 'jesse.walk',
  'kira.harbor', 'jordan.ease', 'sasha.halo', 'jett.route', 'amelia.drift', 'victor.fuse', 'mila.ink', 'owen.loop', 'selena.dream', 'gavin.voyage',
  'celeste.aura', 'rory.glow', 'isa.vibe', 'max.current', 'zoe.sight', 'lucas.frame', 'lyra.peak', 'dante.stream', 'rhea.flare', 'peter.fall',
  'sienna.out', 'matteo.blaze', 'preston.route', 'tessa.echo', 'nolan.film', 'mina.moon', 'finn.path', 'clara.run', 'eli.wave', 'aisha.mode',
  'brandon.still', 'evie.focus', 'samir.chase', 'naomi.rise', 'charlie.loop', 'doe.kite', 'indra.fade', 'xavier.beam', 'freya.art', 'adrian.halo'
];

const buildVideos = () => {
  const videos = [];

  for (let i = 0; i < 100; i += 1) {
    const user = usernames[i % usernames.length];
    const handle = `@${user.replace(/\./g, '').replace(/[^a-z0-9]/gi, '')}`;
    const adjective = adjectivePool[i % adjectivePool.length];
    const niche = nichePool[(i * 2) % nichePool.length];
    const mood = motionPool[i % motionPool.length];
    const tag = `#${adjective} #${niche} #${user.split('.')[0]}`;
    const caption = `${mood} ${emojis[i % emojis.length]} ${user.split('.')[0]} style everywhere.`;
    const likes = 230 + (i * 81) + (i % 11) * 17;
    const comments = 30 + (i * 13) + (i % 7) * 9;
    const shares = 8 + (i * 4) + (i % 5) * 3;
    const avatar = user.split('.').map((part) => part[0].toUpperCase()).join('').slice(0, 2);
    const initials = user.split('.')[0][0].toUpperCase();
    const src = videoPool[i % videoPool.length];

    videos.push({
      id: i + 1,
      user,
      handle,
      caption,
      tag,
      src,
      likes,
      comments,
      shares,
      accent: `linear-gradient(135deg, hsl(${(i * 17) % 360} 80% 60%), hsl(${(i * 29 + 40) % 360} 75% 55%))`,
      avatar,
      initials,
      isLiked: i % 5 === 0,
      isFollowing: i % 3 === 0,
      commentsList: [
        { user: 'tay', text: 'This is so clean 😍', time: `${(i % 5) + 1}m` },
        { user: 'milo', text: 'Need this in my feed today', time: `${(i % 8) + 2}m` },
        { user: 'zoe', text: 'The vibe is unreal', time: `${(i % 11) + 5}m` }
      ]
    });
  }

  return videos;
};

const videos = buildVideos();
const feed = document.getElementById('feed');
const shaderCanvas = document.getElementById('shader-canvas');
const drawer = document.getElementById('comment-drawer');
const commentsList = document.getElementById('comments-list');
const drawerTitle = document.getElementById('drawer-title');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const closeDrawerButton = document.getElementById('close-drawer');
const toast = document.getElementById('toast');
const navItems = document.querySelectorAll('.nav-item');
const pageView = document.getElementById('page-view');

let activeVideoIndex = 0;

const initShader = () => {
  if (!shaderCanvas) return;

  const gl = shaderCanvas.getContext('webgl', { alpha: true, antialias: false });
  if (!gl) return;

  const vertexSource = `
    attribute vec2 position;
    varying vec2 uv;
    void main() {
      uv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec2 uv;
    uniform vec2 resolution;
    uniform float time;
    void main() {
      vec2 p = (uv * resolution - 0.5 * resolution) / resolution.y;
      float t = time * 0.12;
      float waveA = sin(p.x * 3.0 + sin(p.y * 2.0 + t) * 1.4 + t);
      float waveB = cos(p.y * 3.6 - p.x * 1.7 + t * 0.7);
      float field = 0.5 + 0.5 * sin(waveA + waveB + t);
      float leftGlow = exp(-length((p - vec2(-0.7, -0.15)) * vec2(0.8, 1.0)) * 2.4);
      float rightGlow = exp(-length((p - vec2(0.8, 0.55)) * vec2(0.9, 1.2)) * 2.8);
      vec3 base = vec3(0.025, 0.04, 0.035);
      vec3 moss = vec3(0.12, 0.32, 0.20) * (0.16 + field * 0.2) * leftGlow;
      vec3 ember = vec3(0.3, 0.15, 0.08) * (0.12 + (1.0 - field) * 0.18) * rightGlow;
      vec3 color = base + moss + ember;
      float vignette = smoothstep(1.3, 0.12, length(p * vec2(0.9, 0.72)));
      gl_FragColor = vec4(color * vignette, 1.0);
    }
  `;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolution = gl.getUniformLocation(program, 'resolution');
  const time = gl.getUniformLocation(program, 'time');
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    shaderCanvas.width = Math.floor(window.innerWidth * ratio);
    shaderCanvas.height = Math.floor(window.innerHeight * ratio);
    gl.viewport(0, 0, shaderCanvas.width, shaderCanvas.height);
    gl.uniform2f(resolution, shaderCanvas.width, shaderCanvas.height);
  };

  resize();
  window.addEventListener('resize', resize);
  const start = performance.now();
  const render = (now) => {
    gl.uniform1f(time, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initShader();

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('show'), 1400);
};

const renderFriendsPage = () => {
  const friends = [
    { name: 'Maya', handle: '@maya', accent: 'linear-gradient(135deg, #7c3aed, #ec4899)' },
    { name: 'Leo', handle: '@leo', accent: 'linear-gradient(135deg, #f59e0b, #f43f5e)' },
    { name: 'Nora', handle: '@nora', accent: 'linear-gradient(135deg, #0ea5e9, #22c55e)' },
    { name: 'Zane', handle: '@zane', accent: 'linear-gradient(135deg, #fb7185, #f97316)' }
  ];

  pageView.innerHTML = `
    <div class="page-section">
      <div class="site-header">
        <h1>Friends</h1>
        <span class="site-chip">4 online</span>
      </div>

      <div class="site-card">
        <div class="friend-list">
          ${friends.map((friend) => `
            <div class="friend-item">
              <div class="friend-user">
                <div class="friend-avatar" style="background: ${friend.accent};">${friend.name.slice(0, 1)}</div>
                <div>
                  <strong>${friend.name}</strong><br />
                  <span>${friend.handle}</span>
                </div>
              </div>
              <div class="friend-actions">
                <button class="secondary-btn" type="button">Message</button>
                <button class="primary-btn" type="button">Follow</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

const renderCreatePage = () => {
  pageView.innerHTML = `
    <div class="page-section">
      <div class="site-header">
        <h1>Create</h1>
        <span class="site-chip">new post</span>
      </div>

      <div class="site-card compose-box">
        <input type="text" placeholder="Title your video" />
        <textarea placeholder="Write a caption for your TikTok..."></textarea>
        <div class="friend-actions">
          <button class="secondary-btn" type="button">Add music</button>
          <button class="primary-btn submit-btn" type="button">Post now</button>
        </div>
      </div>
    </div>
  `;

  pageView.querySelector('.submit-btn')?.addEventListener('click', () => showToast('Post created'));
};

const renderInboxPage = () => {
  const messages = [
    { name: 'Ari', message: 'Your new video is trending', accent: 'linear-gradient(135deg, #f59e0b, #ec4899)' },
    { name: 'Kira', message: 'Can we collab this weekend?', accent: 'linear-gradient(135deg, #22c55e, #14b8a6)' },
    { name: 'Drew', message: 'You got a new follower', accent: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }
  ];

  pageView.innerHTML = `
    <div class="page-section">
      <div class="site-header">
        <h1>Inbox</h1>
        <span class="site-chip">3 new</span>
      </div>

      <div class="site-card">
        <div class="message-list">
          ${messages.map((item) => `
            <div class="message-item">
              <div class="message-user">
                <div class="message-avatar" style="background: ${item.accent};">${item.name.slice(0, 1)}</div>
                <div>
                  <strong>${item.name}</strong><br />
                  <span>${item.message}</span>
                </div>
              </div>
              <button class="secondary-btn" type="button">Open</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

const renderAIChatPage = () => {
  const savedMessages = JSON.parse(localStorage.getItem('dailycut-ai-chat') || '[]');
  const messageMarkup = savedMessages.map((message) => `
    <article class="ai-message ${message.role === 'user' ? 'from-user' : 'from-ai'}">
      ${message.role === 'model' ? '<span class="ai-message-mark">✦</span>' : ''}
      <div class="ai-message-content">${escapeHTML(message.text).replace(/\n/g, '<br>')}</div>
    </article>
  `).join('');

  pageView.innerHTML = `
    <section class="ai-chat-page" aria-label="AI chat">
      <header class="ai-chat-header">
        <div class="ai-identity">
          <span class="ai-orbit" aria-hidden="true"><span>✦</span></span>
          <div><p>DAILYCUT AI</p><h1>Ask anything.</h1></div>
        </div>
        <button class="ai-new-chat" type="button" aria-label="Start a new chat" title="Start a new chat">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </header>
      <div class="ai-conversation" id="ai-conversation" aria-live="polite">
        ${messageMarkup || `
          <div class="ai-welcome">
            <span class="ai-welcome-kicker">YOUR CREATIVE SIDEKICK</span>
            <h2>What are we<br /><em>making today?</em></h2>
            <p>Brainstorm a video, shape a caption, or ask for a fresh perspective.</p>
          </div>
          <div class="ai-prompts" aria-label="Suggested prompts">
            <button type="button" class="ai-prompt">Give me 3 ideas for a cozy morning video</button>
            <button type="button" class="ai-prompt">Help me write a better caption</button>
            <button type="button" class="ai-prompt">Plan a 15-second travel edit</button>
          </div>
        `}
      </div>
      <form class="ai-composer" id="ai-chat-form">
        <textarea id="ai-chat-input" rows="1" maxlength="4000" placeholder="Ask DailyCut anything..." aria-label="Message DailyCut AI"></textarea>
        <div class="ai-composer-footer">
          <span class="ai-model-note"><span></span><span class="ai-model-status">Checking Gemini...</span></span>
          <button class="ai-send-button" type="submit" aria-label="Send message" title="Send message">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 20.4L21 12 3.4 3.6 3 10l12 2-12 2 .4 6.4z"/></svg>
          </button>
        </div>
      </form>
      <p class="ai-disclaimer">AI can make mistakes. Keep your own creative judgment in the loop.</p>
    </section>
  `;

  const conversation = pageView.querySelector('#ai-conversation');
  const form = pageView.querySelector('#ai-chat-form');
  const input = pageView.querySelector('#ai-chat-input');
  const newChatButton = pageView.querySelector('.ai-new-chat');
  const modelStatus = pageView.querySelector('.ai-model-status');

  fetch('/api/status')
    .then((response) => response.json())
    .then((status) => {
      modelStatus.textContent = status.configured ? `Gemini · ${status.model}` : 'Gemini key needed';
    })
    .catch(() => {
      modelStatus.textContent = 'AI server unavailable';
    });

  const appendMessage = (role, text, extraClass = '') => {
    const article = document.createElement('article');
    article.className = `ai-message ${role === 'user' ? 'from-user' : 'from-ai'} ${extraClass}`.trim();
    if (role !== 'user') {
      const mark = document.createElement('span');
      mark.className = 'ai-message-mark';
      mark.textContent = '✦';
      article.append(mark);
    }
    const content = document.createElement('div');
    content.className = 'ai-message-content';
    content.textContent = text;
    article.append(content);
    conversation.append(article);
    conversation.scrollTop = conversation.scrollHeight;
    return article;
  };

  const saveMessages = () => {
    const messages = [...conversation.querySelectorAll('.ai-message:not(.is-loading)')].map((message) => ({
      role: message.classList.contains('from-user') ? 'user' : 'model',
      text: message.querySelector('.ai-message-content')?.textContent || ''
    }));
    localStorage.setItem('dailycut-ai-chat', JSON.stringify(messages));
  };

  const sendMessage = async (text) => {
    const prompt = text.trim();
    if (!prompt || form.dataset.busy === 'true') return;
    if (conversation.querySelector('.ai-welcome')) conversation.innerHTML = '';
    appendMessage('user', prompt);
    const loading = appendMessage('model', 'Thinking...', 'is-loading');
    const sendButton = form.querySelector('.ai-send-button');
    form.dataset.busy = 'true';
    sendButton.disabled = true;
    input.value = '';

    const history = [...conversation.querySelectorAll('.ai-message:not(.is-loading)')].map((message) => ({
      role: message.classList.contains('from-user') ? 'user' : 'model',
      text: message.querySelector('.ai-message-content')?.textContent || ''
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, history: history.slice(-12, -1) })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'The AI service is unavailable.');
      loading.querySelector('.ai-message-content').textContent = result.reply;
      loading.classList.remove('is-loading');
      saveMessages();
    } catch (error) {
      loading.querySelector('.ai-message-content').textContent = error.message.includes('Failed to fetch')
        ? 'I cannot reach the chat service. Start the app with `npm start` and try again.'
        : error.message;
      loading.classList.add('is-error');
    } finally {
      form.dataset.busy = 'false';
      sendButton.disabled = false;
      input.focus();
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessage(input.value);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  pageView.querySelectorAll('.ai-prompt').forEach((button) => {
    button.addEventListener('click', () => sendMessage(button.textContent));
  });

  newChatButton.addEventListener('click', () => {
    localStorage.removeItem('dailycut-ai-chat');
    renderAIChatPage();
  });

  conversation.scrollTop = conversation.scrollHeight;
};

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const renderProfilePage = () => {
  const stats = [
    { label: 'Followers', value: '1.8M' },
    { label: 'Following', value: '245' },
    { label: 'Likes', value: '120M' }
  ];

  pageView.innerHTML = `
    <div class="page-section">
      <div class="site-header">
        <h1>Profile</h1>
        <span class="site-chip">creator</span>
      </div>

      <div class="site-card">
        <div class="profile-card">
          <div class="profile-avatar">L</div>
          <div class="profile-meta">
            <h2>@luna.studio</h2>
            <p>Travel • edits • city lights</p>
          </div>
        </div>

        <div class="profile-stats">
          ${stats.map((stat) => `
            <div class="stat-item">
              <strong>${stat.value}</strong>
              <span>${stat.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

const renderPage = (pageName) => {
  const pageMap = {
    Home: () => {
      feed.style.display = 'block';
      pageView.classList.remove('active');
      pageView.innerHTML = '';
    },
    Friends: renderFriendsPage,
    'Create post': renderCreatePage,
    Inbox: renderInboxPage,
    'AI Chat': renderAIChatPage,
    Profile: renderProfilePage
  };

  const selectedPage = pageMap[pageName] || pageMap.Home;
  feed.style.display = pageName === 'Home' ? 'block' : 'none';
  pageView.classList.toggle('active', pageName !== 'Home');
  selectedPage();

  navItems.forEach((nav) => {
    const label = nav.getAttribute('aria-label');
    nav.classList.toggle('active', label === pageName);
  });
};

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('aria-label');
    renderPage(target);
    showToast(target);
  });
});

document.querySelectorAll('[data-page]').forEach((item) => {
  item.addEventListener('click', () => {
    renderPage(item.dataset.page);
    showToast(item.dataset.page);
  });
});

renderPage('Home');

const syncCommentCount = (index) => {
  const buttons = [...document.querySelectorAll('.action-btn')];
  const commentButton = buttons.filter((button) => button.innerHTML.includes('M4 4h16'))[index] || null;
  if (commentButton) {
    const label = commentButton.parentElement.querySelector('.action-count');
    if (label) {
      label.textContent = formatCount(videos[index].comments);
      label.dataset.value = videos[index].comments;
    }
  }
};

const renderComments = () => {
  const currentVideo = videos[activeVideoIndex];
  commentsList.innerHTML = (currentVideo.commentsList || []).map((comment) => `
    <div class="comment-item">
      <div class="comment-avatar">${(comment.user || 'Y').slice(0, 1).toUpperCase()}</div>
      <div class="comment-meta">
        <strong>@${comment.user}</strong>
        <p>${comment.text}</p>
      </div>
      <span class="comment-time">${comment.time}</span>
    </div>
  `).join('');
};

const openComments = (index) => {
  activeVideoIndex = index;
  drawerTitle.textContent = `@${videos[index].user}`;
  renderComments();
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  commentInput.focus();
};

const closeComments = () => {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  commentForm.reset();
};

closeDrawerButton.addEventListener('click', closeComments);

drawer.addEventListener('click', (event) => {
  if (event.target === drawer) closeComments();
});

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = commentInput.value.trim();
  if (!value) return;

  const currentVideo = videos[activeVideoIndex];
  currentVideo.commentsList.unshift({
    user: 'you',
    text: value,
    time: 'now'
  });
  currentVideo.comments += 1;
  renderComments();
  syncCommentCount(activeVideoIndex);
  commentInput.value = '';
  showToast('Comment posted');
});

const formatCount = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
};

const renderCard = (item, index) => {
  const card = document.createElement('article');
  card.className = 'video-card';
  card.id = `video-${item.id}`;

  const progressWrap = document.createElement('div');
  progressWrap.className = 'video-progress';
  for (let i = 0; i < 3; i += 1) {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    const fill = document.createElement('span');
    if (i === 0) fill.style.width = '100%';
    bar.append(fill);
    progressWrap.append(bar);
  }

  const surface = document.createElement('div');
  surface.className = 'video-surface';

  const video = document.createElement('video');
  video.src = item.src;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.setAttribute('playsinline', 'true');
  video.setAttribute('webkit-playsinline', 'true');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.7 });

  observer.observe(card);

  video.addEventListener('canplay', () => {
    video.play().catch(() => {});
  });

  surface.append(video);

  const side = document.createElement('div');
  side.className = 'video-content';

  const info = document.createElement('div');
  info.className = 'meta-column';

  const userRow = document.createElement('div');
  userRow.className = 'user-line';

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.style.background = item.accent;
  avatar.textContent = item.avatar;

  const username = document.createElement('span');
  username.className = 'username';
  username.textContent = item.user;

  const follow = document.createElement('button');
  follow.className = `follow-btn ${item.isFollowing ? 'following' : ''}`;
  follow.type = 'button';
  follow.textContent = item.isFollowing ? 'Following' : 'Follow';
  follow.addEventListener('click', () => {
    item.isFollowing = !item.isFollowing;
    follow.classList.toggle('following', item.isFollowing);
    follow.textContent = item.isFollowing ? 'Following' : 'Follow';
    showToast(item.isFollowing ? 'Followed' : 'Unfollowed');
  });

  userRow.append(avatar, username, follow);

  const caption = document.createElement('p');
  caption.className = 'caption';
  caption.textContent = item.caption;

  const tags = document.createElement('p');
  tags.className = 'tagline';
  tags.textContent = item.tag;

  const musicRow = document.createElement('div');
  musicRow.className = 'music-row';

  const musicVisual = document.createElement('span');
  musicVisual.className = 'music-visual';

  const musicText = document.createElement('span');
  musicText.textContent = 'Original Audio';

  musicRow.append(musicVisual, musicText);

  info.append(userRow, caption, tags, musicRow);

  const sidePanel = document.createElement('div');
  sidePanel.className = 'side-panel';

  const profileBubble = document.createElement('div');
  profileBubble.className = 'profile-bubble';
  profileBubble.style.background = item.accent;
  profileBubble.textContent = item.initials;

  const addActionButton = (type, icon, count, liked = false) => {
    const group = document.createElement('div');
    group.className = 'action-group';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `action-btn ${liked ? 'liked' : ''}`;
    btn.innerHTML = icon;

    const label = document.createElement('span');
    label.className = 'action-count';
    label.dataset.value = String(count);
    label.textContent = formatCount(count);

    if (type === 'like') {
      btn.addEventListener('click', () => {
        item.isLiked = !item.isLiked;
        btn.classList.toggle('liked', item.isLiked);
        const value = Number(label.dataset.value || count);
        const nextValue = Math.max(0, value + (item.isLiked ? 1 : -1));
        item.likes = nextValue;
        label.dataset.value = String(nextValue);
        label.textContent = formatCount(nextValue);
        showToast(item.isLiked ? 'Liked' : 'Removed like');
      });
    }

    if (type === 'comment') {
      btn.addEventListener('click', () => openComments(index));
      label.addEventListener('click', () => openComments(index));
    }

    if (type === 'share') {
      btn.addEventListener('click', async () => {
        item.shares += 1;
        label.dataset.value = String(item.shares);
        label.textContent = formatCount(item.shares);
        showToast('Link shared');
        if (navigator.clipboard) {
          try {
            await navigator.clipboard.writeText(`${location.origin}#video-${item.id}`);
          } catch (error) {
            // no-op for unsupported clipboard access
          }
        }
      });
    }

    group.append(btn, label);
    return group;
  };

  const likeBtn = addActionButton('like', '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.02 6.02 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>', item.likes, item.isLiked);
  const commentBtn = addActionButton('comment', '<svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4v-4H4a2 2 0 01-2-2V6a2 2 0 012-2zm2 4v2h12V8H6zm0 4v2h8v-2H6z"/></svg>', item.comments);
  const shareBtn = addActionButton('share', '<svg viewBox="0 0 24 24"><path d="M18 16a3 3 0 00-2.22 1L8.97 13.9A3.06 3.06 0 008.88 14a3 3 0 00-.06-.8L15.7 8.1A3 3 0 1015 5a3.06 3.06 0 00.09.8L8.3 11.9A3 3 0 109 19a3.06 3.06 0 00-.09-.8L15.7 15.9A3 3 0 0018 16z"/></svg>', item.shares);

  sidePanel.append(profileBubble, likeBtn, commentBtn, shareBtn);
  side.append(info, sidePanel);
  card.append(progressWrap, surface, side);
  feed.append(card);
};

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer.classList.contains('open')) {
    closeComments();
  }
});

videos.forEach(renderCard);

renderComments();
