// ========== STATE ==========
const state = {
    age: null,
    skill: null,
    topic: null,
    side: null,
    round: 0,
    maxRounds: 3,
    roundTypes: [],
    userArgs: [],
    aiArgs: [],
    scores: { clarity: 0, evidence: 0, persuasion: 0, rebuttal: 0 },
    timerInterval: null,
    timerSeconds: 0,
    isRecording: false,
    recognition: null,
    currentSpeech: null,
    usedArgs: [],
    aiPrevPoints: []
};

// ========== SETTINGS (persisted) ==========
const defaults = { theme: 'dark', animations: true, sound: false, defaultDifficulty: '', timer: false };
let settings = { ...defaults, ...loadJSON('dp_settings') };
let history = loadJSON('dp_history') || [];
let stats = loadJSON('dp_stats') || { wins: 0, losses: 0, ties: 0, total: 0 };

function loadJSON(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
}
function saveSettings() { localStorage.setItem('dp_settings', JSON.stringify(settings)); }
function saveHistory() { localStorage.setItem('dp_history', JSON.stringify(history)); }
function saveStats() { localStorage.setItem('dp_stats', JSON.stringify(stats)); }
let profile = loadJSON('dp_profile') || null;
function saveProfile() { localStorage.setItem('dp_profile', JSON.stringify(profile)); }
let drafts = loadJSON('dp_drafts') || [];
function saveDrafts() { localStorage.setItem('dp_drafts', JSON.stringify(drafts)); }
let currentDraftId = null;

// ========== TAGLINES ==========
const taglines = [
    "Argue smarter.",
    "Win the debate.",
    "Your AI opponent.",
    "Sharpen your mind.",
    "Think faster.",
    "Prove your point.",
    "Logic wins.",
    "Always ready.",
    "Debate anyone. Anytime.",
    "Never lose an argument.",
    "Human mind. AI opponent.",
    "Where humans challenge machines.",
    "Your AI debate partner.",
    "Brain vs. algorithm.",
    "The smartest opponent is artificial.",
    "Trained on truth. Ready for you.",
    "AI that argues back.",
    "Machine logic. Human wit.",
    "Debate the future.",
    "Your personal AI adversary.",
    "Built to challenge you.",
    "More than code. It's contention.",
    "Intelligence. Artificial. Argumentative.",
    "The ultimate AI sparring partner.",
    "Powered by logic. Driven by debate.",
    "Train your mind. Test your mettle.",
    "Become unstoppable in argument.",
    "Sharpen your rhetoric.",
    "Practice makes persuasive.",
    "Master the art of argument.",
    "Think on your feet.",
    "Level up your logic.",
    "From novice to debater.",
    "Hone your reasoning.",
    "Speak with confidence. Argue with proof.",
    "Every debate makes you sharper.",
    "Build stronger arguments.",
    "Train like a pro.",
    "Your daily brain workout.",
    "Stronger arguments start here.",
    "Step into the arena.",
    "Face your match.",
    "Ready to rumble?",
    "Challenge accepted.",
    "Test your thesis.",
    "Prove you're right.",
    "Defend your position.",
    "No judge. Just victory.",
    "Outthink the machine.",
    "Can you win?",
    "The ultimate intellectual sparring match.",
    "Bring your best argument.",
    "Think you're right? Prove it.",
    "Challenge everything.",
    "No opponent is perfect. This one's close.",
    "Fight fire with logic.",
    "The comeback starts here.",
    "Crush weak arguments.",
    "Be undefeated.",
    "Your move, human.",
    "Where ideas compete.",
    "Logic. Rhetoric. Victory.",
    "The art of persuasion, perfected.",
    "Serious debate for serious minds.",
    "Elevate your discourse.",
    "Reason meets response.",
    "Precision in persuasion.",
    "Arguments tested. Truth revealed.",
    "Civil discourse. Intelligent opposition.",
    "For the sharp-minded.",
    "Debate at a higher level.",
    "Where logic lives.",
    "Intellectual rigor, on demand.",
    "The standard in debate practice.",
    "Professional grade argumentation.",
    "Argue with authority.",
    "Debate decoded.",
    "Turn the tables. Turn the phrase.",
    "Word. Meet sword.",
    "Find your flaw.",
    "Think twice. Argue once.",
    "Point. Counterpoint. Pro point.",
    "The proof is in the pro.",
    "For argument's sake.",
    "Speak easy. Argue hard.",
    "Logic in, victory out.",
    "Your point. Proved.",
    "The opposition you deserve.",
    "Argue better, not louder.",
    "Mind over chatter.",
    "Don't just debate. Dominate.",
    "Speak. Prove. Conquer.",
    "Unlock your persuasive power.",
    "Find your voice. Win your argument.",
    "Be the smartest person in the room.",
    "Your ideas deserve a champion.",
    "Stand your ground. Win the argument.",
    "No argument is too tough.",
    "Persuasion is power. Claim it.",
    "The truth is waiting. Argue for it.",
    "Hit your mark. Every time."
];

function setRandomTagline() {
    const el = document.getElementById('hero-tagline');
    if (el) el.textContent = taglines[Math.floor(Math.random() * taglines.length)];
}

// ========== LOGIN / PROFILE ==========
const ranks = [
    { name: 'Novice', min: 0 },
    { name: 'Apprentice', min: 3 },
    { name: 'Contender', min: 8 },
    { name: 'Debater', min: 15 },
    { name: 'Arguer', min: 25 },
    { name: 'Orator', min: 40 },
    { name: 'Rhetorician', min: 60 },
    { name: 'Master', min: 85 },
    { name: 'Grand Master', min: 120 },
    { name: 'Legend', min: 200 }
];

function getRank(totalDebates) {
    let rank = ranks[0];
    for (const r of ranks) {
        if (totalDebates >= r.min) rank = r;
    }
    return rank.name;
}

function getStreak() {
    if (!profile) return 0;
    const today = new Date().toDateString();
    const lastVisit = profile.lastVisit ? new Date(profile.lastVisit).toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastVisit === today) return profile.streak || 1;
    if (lastVisit === yesterday) return (profile.streak || 0) + 1;
    return 1;
}

function updateStreak() {
    if (!profile) return;
    const today = new Date().toDateString();
    const lastVisit = profile.lastVisit ? new Date(profile.lastVisit).toDateString() : null;

    if (lastVisit !== today) {
        profile.streak = getStreak();
        profile.lastVisit = new Date().toISOString();
        saveProfile();
    }
}

function getTimeGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
}

function pickAvatar(btn) {
    document.querySelectorAll('.avatar-pick').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function completeLogin() {
    const name = document.getElementById('login-name').value.trim();
    if (!name) {
        showToast('Please enter your name!');
        document.getElementById('login-name').focus();
        return;
    }
    const avatarBtn = document.querySelector('.avatar-pick.selected');
    const avatar = avatarBtn ? avatarBtn.dataset.avatar : '\u{1F9D1}';
    profile = { name, avatar, createdAt: new Date().toISOString(), lastVisit: new Date().toISOString(), streak: 1 };
    saveProfile();
    document.getElementById('login-overlay').classList.add('hidden');
    updateProfileUI();
    showToast(`Welcome, ${name}! Let's debate.`);
}

function showWelcomeBack() {
    if (!profile) return;
    updateStreak();

    document.getElementById('login-new').classList.add('hidden');
    document.getElementById('login-welcome').classList.remove('hidden');
    document.getElementById('wb-avatar').textContent = profile.avatar;
    document.getElementById('wb-greeting').textContent = `${getTimeGreeting()}, ${profile.name}`;

    const streak = profile.streak || 1;
    const rank = getRank(stats.total);
    const winRate = stats.total > 0 ? Math.round((stats.wins / stats.total) * 100) : 0;

    let subText;
    if (stats.total === 0) {
        subText = 'Ready for your first debate?';
    } else if (streak >= 7) {
        subText = `${streak}-day streak! You're on fire.`;
    } else if (winRate >= 70) {
        subText = `${winRate}% win rate. Dominant.`;
    } else {
        subText = `${rank} rank. Keep climbing.`;
    }
    document.getElementById('wb-sub').textContent = subText;

    document.getElementById('wb-wins').textContent = stats.wins;
    document.getElementById('wb-total').textContent = stats.total;
    document.getElementById('wb-streak').textContent = streak;
    document.getElementById('wb-rank').textContent = rank;
}

function dismissWelcome() {
    document.getElementById('login-overlay').classList.add('hidden');
    updateProfileUI();
}

function switchProfile() {
    profile = null;
    localStorage.removeItem('dp_profile');
    document.getElementById('login-welcome').classList.add('hidden');
    document.getElementById('login-new').classList.remove('hidden');
}

function updateProfileUI() {
    if (!profile) return;
    document.getElementById('nav-avatar').textContent = profile.avatar;
    document.getElementById('nav-username').textContent = profile.name;
}

// ========== ADMIN ==========
let adminTapCount = 0;
let adminTapTimer = null;

function adminTap() {
    adminTapCount++;
    clearTimeout(adminTapTimer);
    adminTapTimer = setTimeout(() => { adminTapCount = 0; }, 1500);

    if (adminTapCount >= 5) {
        adminTapCount = 0;
        const panel = document.getElementById('admin-panel');
        if (panel.classList.contains('hidden')) {
            panel.classList.remove('hidden');
            renderAdminFeedback();
            showToast('Admin panel unlocked');
        } else {
            panel.classList.add('hidden');
        }
    }
}

function renderAdminFeedback() {
    const all = loadJSON('dp_feedback') || [];
    const list = document.getElementById('admin-list');
    const empty = document.getElementById('admin-empty');
    const statsEl = document.getElementById('admin-stats');

    if (all.length === 0) {
        list.innerHTML = '';
        empty.classList.remove('hidden');
        statsEl.innerHTML = '';
        return;
    }
    empty.classList.add('hidden');

    const suggestions = all.filter(f => f.type === 'suggestion').length;
    const bugs = all.filter(f => f.type === 'bug').length;
    const praise = all.filter(f => f.type === 'praise').length;
    statsEl.innerHTML = `
        <div class="admin-stat"><strong>${all.length}</strong> total</div>
        <div class="admin-stat"><strong>${suggestions}</strong> suggestions</div>
        <div class="admin-stat"><strong>${bugs}</strong> bugs</div>
        <div class="admin-stat"><strong>${praise}</strong> praise</div>
    `;

    list.innerHTML = all.slice().reverse().map(f => {
        const d = new Date(f.date);
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `<div class="admin-item">
            <div class="admin-item-header">
                <span class="admin-type ${f.type}">${f.type}</span>
                <span class="admin-meta">${f.profile || 'anon'} &middot; ${dateStr}</span>
            </div>
            <div class="admin-text">${escapeHtml(f.text)}</div>
        </div>`;
    }).join('');
}

function clearFeedback() {
    showConfirm('Clear all feedback?', 'This permanently deletes all user feedback.', () => {
        localStorage.removeItem('dp_feedback');
        renderAdminFeedback();
        showToast('Feedback cleared');
    });
}

// ========== ABOUT FEEDBACK ==========
function pickFeedbackType(btn) {
    document.querySelectorAll('.feedback-type-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function submitAboutFeedback() {
    const text = document.getElementById('about-feedback-text').value.trim();
    if (!text) {
        showToast('Write something before sending!');
        return;
    }
    const type = document.querySelector('.feedback-type-btn.selected')?.dataset.type || 'suggestion';

    // Save to localStorage
    const allFeedback = loadJSON('dp_feedback') || [];
    allFeedback.push({
        type,
        text,
        date: new Date().toISOString(),
        profile: profile ? profile.name : 'anonymous'
    });
    localStorage.setItem('dp_feedback', JSON.stringify(allFeedback));

    // Show thank you
    document.querySelector('.about-feedback-form').classList.add('hidden');
    document.getElementById('about-feedback-sent').classList.remove('hidden');
    showToast('Feedback sent!');
}

document.getElementById('about-feedback-text')?.addEventListener('input', function() {
    document.getElementById('about-feedback-count').textContent = this.value.length;
});

function scrollToGuide(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== DRAFTS ==========
function createDraft() {
    currentDraftId = null;
    document.getElementById('draft-title').value = '';
    document.getElementById('draft-opening').value = '';
    document.getElementById('draft-evidence').value = '';
    document.getElementById('draft-opponent').value = '';
    document.getElementById('draft-closing').value = '';
    document.getElementById('draft-editor-overlay').classList.remove('hidden');
}

function openDraft(id) {
    const draft = drafts.find(d => d.id === id);
    if (!draft) return;
    currentDraftId = id;
    document.getElementById('draft-title').value = draft.title || '';
    document.getElementById('draft-opening').value = draft.opening || '';
    document.getElementById('draft-evidence').value = draft.evidence || '';
    document.getElementById('draft-opponent').value = draft.opponent || '';
    document.getElementById('draft-closing').value = draft.closing || '';
    document.getElementById('draft-editor-overlay').classList.remove('hidden');
}

function closeDraftEditor() {
    document.getElementById('draft-editor-overlay').classList.add('hidden');
    currentDraftId = null;
}

function saveDraft() {
    const title = document.getElementById('draft-title').value.trim() || 'Untitled Draft';
    const data = {
        title,
        opening: document.getElementById('draft-opening').value,
        evidence: document.getElementById('draft-evidence').value,
        opponent: document.getElementById('draft-opponent').value,
        closing: document.getElementById('draft-closing').value,
        updatedAt: new Date().toISOString()
    };
    if (currentDraftId) {
        const idx = drafts.findIndex(d => d.id === currentDraftId);
        if (idx >= 0) drafts[idx] = { ...drafts[idx], ...data };
    } else {
        data.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        data.createdAt = data.updatedAt;
        drafts.unshift(data);
    }
    saveDrafts();
    closeDraftEditor();
    renderDrafts();
    showToast('Draft saved!');
}

function deleteDraft() {
    if (!currentDraftId) { closeDraftEditor(); return; }
    showConfirm('Delete Draft?', 'This draft will be permanently deleted.', () => {
        drafts = drafts.filter(d => d.id !== currentDraftId);
        saveDrafts();
        closeDraftEditor();
        renderDrafts();
        showToast('Draft deleted');
    });
}

function renderDrafts() {
    const list = document.getElementById('drafts-list');
    const empty = document.getElementById('drafts-empty');
    if (drafts.length === 0) {
        list.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    list.style.display = 'flex';
    list.innerHTML = drafts.map(d => {
        const date = new Date(d.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const sections = [d.opening, d.evidence, d.opponent, d.closing].filter(s => s && s.trim()).length;
        return `<div class="draft-item" onclick="openDraft('${d.id}')">
            <span class="draft-icon">&#x1F4DD;</span>
            <div class="draft-info">
                <div class="draft-name">${escapeHtml(d.title)}</div>
                <div class="draft-meta">${sections}/4 sections filled &middot; ${date}</div>
            </div>
        </div>`;
    }).join('');
}

// ========== INIT ==========
(function init() {
    setRandomTagline();
    applyTheme(settings.theme);

    // Check login — returning user gets welcome back, new user gets signup
    if (profile) {
        showWelcomeBack();
        updateProfileUI();
    }
    document.getElementById('toggle-animations').checked = settings.animations;
    document.getElementById('toggle-sound').checked = settings.sound;
    document.getElementById('toggle-timer').checked = settings.timer;
    document.getElementById('default-difficulty').value = settings.defaultDifficulty;
    if (!settings.animations) document.body.classList.add('no-animations');
    updateNavStats();
    updateStatsSummary();

    // Speech recognition setup
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        state.recognition = new SpeechRecognition();
        state.recognition.continuous = true;
        state.recognition.interimResults = true;
        state.recognition.lang = 'en-US';
        state.recognition.onresult = function(e) {
            let finalText = '';
            let interimText = '';
            for (let i = 0; i < e.results.length; i++) {
                if (e.results[i].isFinal) {
                    finalText += e.results[i][0].transcript;
                } else {
                    interimText += e.results[i][0].transcript;
                }
            }
            const input = document.getElementById('debate-input');
            const base = state.textBeforeVoice || '';
            const sep = base && !base.endsWith(' ') ? ' ' : '';
            input.value = base + sep + finalText + interimText;
            document.getElementById('char-count').textContent = input.value.length;
        };
        state.recognition.onend = function() {
            if (state.isRecording) {
                // Save current text as base before restarting (old results are lost on restart)
                state.textBeforeVoice = document.getElementById('debate-input').value;
                try { state.recognition.start(); } catch(e) {}
                return;
            }
            const btn = document.getElementById('voice-btn');
            if (btn) btn.classList.remove('recording');
        };
        state.recognition.onerror = function(e) {
            // Don't stop on no-speech, just keep going
            if (e.error === 'no-speech') return;
            state.isRecording = false;
            const btn = document.getElementById('voice-btn');
            if (btn) btn.classList.remove('recording');
        };
    }
})();

// ========== SETTINGS FUNCTIONS ==========
function toggleSettings() {
    document.getElementById('settings-panel').classList.toggle('open');
    document.getElementById('settings-overlay').classList.toggle('open');
}

function toggleTheme() {
    settings.theme = settings.theme === 'dark' ? 'light' : 'dark';
    applyTheme(settings.theme);
    saveSettings();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleAnimations() {
    settings.animations = document.getElementById('toggle-animations').checked;
    document.body.classList.toggle('no-animations', !settings.animations);
    saveSettings();
}

function toggleSound() {
    settings.sound = document.getElementById('toggle-sound').checked;
    saveSettings();
}

function setDefaultDifficulty(val) {
    settings.defaultDifficulty = val;
    saveSettings();
}

function toggleTimer() {
    settings.timer = document.getElementById('toggle-timer').checked;
    saveSettings();
}

function clearAllData() {
    showConfirm('Clear All Data?', 'This will permanently delete your stats and debate history.', () => {
        history = [];
        stats = { wins: 0, losses: 0, ties: 0, total: 0 };
        saveHistory();
        saveStats();
        updateNavStats();
        updateStatsSummary();
        showToast('All data cleared');
    });
}

function updateNavStats() {
    document.getElementById('stat-wins').textContent = stats.wins;
    document.getElementById('stat-total').textContent = stats.total;
}

function updateStatsSummary() {
    document.getElementById('stats-summary').textContent = `${stats.total} debates, ${stats.wins} wins`;
}

// ========== NAVIGATION ==========
function navigateTo(page) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const link = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (link) link.classList.add('active');

    if (page === 'home') {
        document.getElementById('setup').classList.add('active');
    } else if (page === 'games') {
        document.getElementById('games').classList.add('active');
    } else if (page === 'live') {
        document.getElementById('live').classList.add('active');
        // Reset live lobby view
        document.getElementById('live-lobby').classList.remove('hidden');
        document.getElementById('live-waiting').classList.add('hidden');
        document.getElementById('live-ready').classList.add('hidden');
        document.getElementById('live-debate-area').classList.add('hidden');
    } else if (page === 'learn') {
        document.getElementById('learn').classList.add('active');
    } else if (page === 'drafts') {
        renderDrafts();
        document.getElementById('drafts').classList.add('active');
    } else if (page === 'history') {
        renderHistory();
        document.getElementById('history').classList.add('active');
    } else if (page === 'about') {
        document.getElementById('about').classList.add('active');
    }

    closeMobileNav();
    window.scrollTo(0, 0);
}

function goHome() {
    setRandomTagline();
    navigateTo('home');
    showStep('step-age');
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (id === 'setup') {
        const link = document.querySelector('.nav-link[data-page="home"]');
        if (link) link.classList.add('active');
    }
}

function showStep(id) {
    document.querySelectorAll('.setup-step').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function toggleMobileNav() {
    document.getElementById('nav-links').classList.toggle('mobile-open');
}
function closeMobileNav() {
    document.getElementById('nav-links').classList.remove('mobile-open');
}

// ========== CONFIRM DIALOG ==========
function showConfirm(title, msg, onOk) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-msg').textContent = msg;
    document.getElementById('confirm-overlay').classList.remove('hidden');
    const okBtn = document.getElementById('confirm-ok');
    okBtn.onclick = () => { closeConfirm(); onOk(); };
}
function closeConfirm() {
    document.getElementById('confirm-overlay').classList.add('hidden');
}

function confirmLeaveDebate() {
    showConfirm('Leave Debate?', 'Your progress in this debate will be lost.', () => {
        stopTimer();
        navigateTo('home');
        showStep('step-age');
    });
}

// ========== TOAST ==========
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2500);
}

// ========== LIVE DEBATE (WebSocket) ==========
let liveWs = null;
let liveMyId = null;
let liveMySide = null;
let liveTimerInterval = null;
let liveTimerSeconds = 0;
let liveIsMyTurn = false;

function getWsUrl() {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${proto}//${location.host}/ws/debate`;
}

function liveConnect(onOpen) {
    if (liveWs && liveWs.readyState === WebSocket.OPEN) { onOpen(); return; }
    liveWs = new WebSocket(getWsUrl());
    liveWs.onopen = onOpen;
    liveWs.onmessage = (e) => liveHandleMsg(JSON.parse(e.data));
    liveWs.onclose = () => { showToast('Disconnected from server.'); };
    liveWs.onerror = () => { showToast('Could not connect to debate server.'); };
}

function liveSend(obj) {
    if (liveWs && liveWs.readyState === WebSocket.OPEN) liveWs.send(JSON.stringify(obj));
}

function liveCreate() {
    const topic = document.getElementById('live-topic').value.trim();
    if (!topic || topic.split(/\s+/).length < 4) {
        showToast('Enter a real debate topic (at least 4 words).');
        return;
    }
    const name = profile ? profile.name : 'Player 1';
    liveConnect(() => {
        liveSend({ action: 'create', topic, name });
    });
}

function liveJoin() {
    const code = document.getElementById('live-code').value.trim().toUpperCase();
    if (code.length < 4) { showToast('Enter the 6-letter room code.'); return; }
    const name = profile ? profile.name : 'Player 2';
    liveConnect(() => {
        liveSend({ action: 'join', code, name });
    });
}

function liveReady() {
    liveSend({ action: 'ready' });
    document.getElementById('live-ready-btn').disabled = true;
    document.getElementById('live-ready-btn').textContent = 'Waiting for opponent...';
}

function liveSendArg() {
    const input = document.getElementById('live-input');
    const text = input.value.trim();
    if (!text || !liveIsMyTurn) return;
    liveSend({ action: 'argument', text });
    input.value = '';
    liveIsMyTurn = false;
    document.getElementById('live-send').disabled = true;
    document.getElementById('live-input').disabled = true;
    document.getElementById('live-input-area').classList.add('hidden');
    document.getElementById('live-disabled-msg').classList.remove('hidden');
}

function liveHandleMsg(msg) {
    const t = msg.type;

    if (t === 'error') {
        showToast(msg.msg);
    }
    else if (t === 'room_created') {
        document.getElementById('live-lobby').classList.add('hidden');
        document.getElementById('live-waiting').classList.remove('hidden');
        document.getElementById('live-room-code').textContent = msg.code;
        document.getElementById('live-topic-display').textContent = msg.topic;
    }
    else if (t === 'player_joined') {
        document.getElementById('live-lobby').classList.add('hidden');
        document.getElementById('live-waiting').classList.remove('hidden');
        document.getElementById('live-topic-display').textContent = msg.topic;
        document.getElementById('live-room-code').textContent = msg.code;
        const playersEl = document.getElementById('live-players');
        playersEl.innerHTML = msg.players.map(n => `<span class="debater-tag you-tag">${escapeHtml(n)}</span>`).join('');
    }
    else if (t === 'side_assigned') {
        liveMySide = msg.side;
        document.getElementById('live-waiting').classList.add('hidden');
        document.getElementById('live-ready').classList.remove('hidden');
        document.getElementById('live-ready-topic').textContent = document.getElementById('live-topic-display').textContent;
        const badge = document.getElementById('live-my-side');
        badge.textContent = msg.side.toUpperCase();
        badge.className = `live-side-badge ${msg.side}`;
    }
    else if (t === 'ready_check') {
        // Already handled by side_assigned transition
    }
    else if (t === 'player_ready') {
        document.getElementById('live-ready-status').textContent = `${msg.name} is ready!`;
    }
    else if (t === 'debate_start') {
        document.getElementById('live-ready').classList.add('hidden');
        document.getElementById('live-debate-area').classList.remove('hidden');
        document.getElementById('live-debate-topic').textContent = msg.topic;
        document.getElementById('live-round').textContent = msg.round;
        document.getElementById('live-max-round').textContent = msg.max_rounds;

        // Set player labels
        const p1 = msg.players[0], p2 = msg.players[1];
        document.getElementById('live-p1-name').textContent = p1.name;
        document.getElementById('live-p1-side').textContent = p1.side.toUpperCase();
        document.getElementById('live-p2-name').textContent = p2.name;
        document.getElementById('live-p2-side').textContent = p2.side.toUpperCase();

        document.getElementById('live-chat').innerHTML = '';
        addLiveSystemMsg(`Debate started! Round 1: ${msg.round_type}. ${msg.first_name} goes first.`);
    }
    else if (t === 'turn') {
        const isMe = msg.player_name === (profile ? profile.name : '');
        liveIsMyTurn = isMe;
        const banner = document.getElementById('live-turn-banner');
        if (isMe) {
            banner.textContent = "Your turn — make your argument!";
            banner.className = 'live-turn-banner my-turn';
            document.getElementById('live-input-area').classList.remove('hidden');
            document.getElementById('live-disabled-msg').classList.add('hidden');
            document.getElementById('live-send').disabled = false;
            document.getElementById('live-input').disabled = false;
            document.getElementById('live-input').focus();
        } else {
            banner.textContent = `${msg.player_name}'s turn...`;
            banner.className = 'live-turn-banner their-turn';
            document.getElementById('live-input-area').classList.add('hidden');
            document.getElementById('live-disabled-msg').classList.remove('hidden');
        }
    }
    else if (t === 'timer_start') {
        liveTimerSeconds = msg.seconds;
        clearInterval(liveTimerInterval);
        updateLiveTimer();
        liveTimerInterval = setInterval(() => {
            liveTimerSeconds--;
            updateLiveTimer();
            if (liveTimerSeconds <= 15) document.getElementById('live-timer').classList.add('warning');
            if (liveTimerSeconds <= 0) clearInterval(liveTimerInterval);
        }, 1000);
        document.getElementById('live-timer').classList.remove('warning');
    }
    else if (t === 'time_up') {
        addLiveSystemMsg(`Time's up! ${msg.player} ran out of time.`);
    }
    else if (t === 'argument') {
        const isMe = msg.name === (profile ? profile.name : '');
        addLiveBubble(msg.text, msg.name, msg.side, isMe);
    }
    else if (t === 'new_round') {
        document.getElementById('live-round').textContent = msg.round;
        addLiveSystemMsg(`Round ${msg.round}: ${msg.round_type}`);
    }
    else if (t === 'debate_end') {
        clearInterval(liveTimerInterval);
        document.getElementById('live-turn-banner').textContent = 'Debate over!';
        document.getElementById('live-turn-banner').className = 'live-turn-banner their-turn';
        document.getElementById('live-input-area').classList.add('hidden');
        document.getElementById('live-disabled-msg').classList.add('hidden');
        document.getElementById('live-timer').style.display = 'none';
        addLiveSystemMsg('The debate is over! Great job to both debaters.');
    }
    else if (t === 'player_left') {
        showToast(`${msg.name} left the debate.`);
        addLiveSystemMsg(`${msg.name} disconnected.`);
    }
}

function updateLiveTimer() {
    const m = Math.floor(liveTimerSeconds / 60);
    const s = liveTimerSeconds % 60;
    document.getElementById('live-timer-text').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

function addLiveSystemMsg(text) {
    const chat = document.getElementById('live-chat');
    const div = document.createElement('div');
    div.className = 'system-msg';
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function addLiveBubble(text, name, side, isMe) {
    const chat = document.getElementById('live-chat');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isMe ? 'user' : 'ai'}`;
    bubble.innerHTML = `<span class="bubble-label">${escapeHtml(name)} (${side.toUpperCase()})</span><span class="bubble-text">${escapeHtml(text)}</span>`;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}

// Handle Enter key in live input
document.getElementById('live-input')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); liveSendArg(); }
});

// ========== GAME MODES ==========
const allImpromptuTopics = [
    'Zoos should be banned', 'Homework does more harm than good', 'Social media should have age limits',
    'School should start later in the morning', 'Fast food should be taxed', 'Space exploration is a waste of money',
    'Students should grade their teachers', 'Video games are a sport', 'Everyone should learn to code',
    'Robots will take our jobs', 'Beauty pageants should be banned', 'School lunches should be free for everyone',
    'The internet does more good than harm', 'Kids should be allowed to vote', 'Cursive writing should still be taught',
    'College athletes should be paid', 'Self-driving cars are too dangerous', 'Plastic should be completely banned',
    'Public transport should be free', 'Testing on animals should be illegal'
];

function getRandomTopic() {
    return allImpromptuTopics[Math.floor(Math.random() * allImpromptuTopics.length)];
}

function launchGame(topic, side, skill, maxRounds, rounds, charLimit, timerOn, msg) {
    state.age = state.age || '14-17';
    state.skill = skill;
    state.maxRounds = maxRounds;
    state.topic = topic;
    state.side = side;
    if (timerOn) settings.timer = true;

    document.getElementById('debate-topic-text').textContent = topic;
    document.getElementById('your-side-label').textContent = side.toUpperCase();
    document.getElementById('ai-side-label').textContent = (side === 'for' ? 'AGAINST' : 'FOR');
    document.getElementById('total-rounds').textContent = String(maxRounds);
    document.getElementById('debate-input').maxLength = charLimit;
    document.getElementById('char-limit-display').textContent = String(charLimit);
    state.roundTypes = rounds;

    showToast(msg);
    startDebate();
}

function startImpromptu() {
    const t = getRandomTopic(), s = Math.random() < 0.5 ? 'for' : 'against';
    launchGame(t, s, 'intermediate', 2, [
        { type: 'constructive', label: 'Impromptu Opening', desc: '60 seconds. Make your case — no prep!' },
        { type: 'rebuttal', label: 'Impromptu Rebuttal', desc: '60 seconds. Respond and close.' }
    ], 1000, true, `Impromptu: ${s.toUpperCase()} "${t}"`);
}

function startSpeedRound() {
    const t = getRandomTopic(), s = Math.random() < 0.5 ? 'for' : 'against';
    launchGame(t, s, 'intermediate', 4, [
        { type: 'constructive', label: 'Speed 1', desc: '30 seconds. GO!' },
        { type: 'constructive', label: 'Speed 2', desc: '30 seconds. Clash!' },
        { type: 'constructive', label: 'Speed 3', desc: '30 seconds. Push!' },
        { type: 'rebuttal', label: 'Speed Close', desc: '30 seconds. Final shot!' }
    ], 500, true, `Speed: ${s.toUpperCase()} "${t}" — 30s per round!`);
}

function startRebuttalDrill() {
    const t = getRandomTopic();
    launchGame(t, 'against', 'intermediate', 3, [
        { type: 'rebuttal', label: 'Rebuttal 1', desc: 'AI argues. Tear it apart.' },
        { type: 'rebuttal', label: 'Rebuttal 2', desc: 'AI responds. Counter again.' },
        { type: 'rebuttal', label: 'Final Rebuttal', desc: 'Destroy their case.' }
    ], 1000, false, `Rebuttal Drill: Refute everything on "${t}"`);
}

function startDevilsAdvocate() {
    const t = getRandomTopic(), s = Math.random() < 0.5 ? 'for' : 'against';
    launchGame(t, s, 'intermediate', 3, [
        { type: 'constructive', label: "Devil's Opening", desc: `Argue ${s.toUpperCase()} — even if you disagree.` },
        { type: 'constructive', label: "Devil's Clash", desc: 'Defend your assigned side.' },
        { type: 'rebuttal', label: "Devil's Close", desc: 'Close the case.' }
    ], 1000, false, `Devil's Advocate: You MUST argue ${s.toUpperCase()} "${t}"`);
}

function startPOEBuilder() {
    const t = getRandomTopic(), s = Math.random() < 0.5 ? 'for' : 'against';
    launchGame(t, s, 'beginner', 1, [
        { type: 'constructive', label: 'POE Challenge', desc: '90 seconds. Best Point-Observation-Evidence you can.' }
    ], 1000, true, `POE Builder: 90s to argue ${s.toUpperCase()} "${t}"`);
}

function startCrossfire() {
    const t = getRandomTopic(), s = Math.random() < 0.5 ? 'for' : 'against';
    const rounds = [];
    for (let i = 1; i <= 6; i++) rounds.push({ type: 'constructive', label: `Exchange ${i}`, desc: 'One sentence. Make it count.' });
    launchGame(t, s, 'intermediate', 6, rounds, 200, false, `Crossfire: Quick jabs. ${s.toUpperCase()} "${t}"`);
}

// ========== TOPICS BY AGE ==========
const topicsByAge = {
    '8-10': [
        { emoji: '\u{1F3EB}', title: 'School should be 4 days a week' },
        { emoji: '\u{1F36B}', title: 'Candy should be free for kids' },
        { emoji: '\u{1F431}', title: 'Cats are better pets than dogs' },
        { emoji: '\u{1F3AE}', title: 'Video games are good for you' },
        { emoji: '\u{1F4DA}', title: 'Homework should be banned' },
        { emoji: '\u{1F382}', title: 'Birthdays should be a holiday' },
        { emoji: '\u{1F9B8}', title: 'Superheroes are real role models' },
        { emoji: '\u{1F354}', title: 'Pizza is the best food ever' },
    ],
    '11-13': [
        { emoji: '\u{1F4F1}', title: 'Kids should have smartphones' },
        { emoji: '\u{1F3EB}', title: 'School uniforms should be required' },
        { emoji: '\u{1F3AE}', title: 'E-sports are real sports' },
        { emoji: '\u{1F30D}', title: 'Kids can help fix climate change' },
        { emoji: '\u{1F4DA}', title: 'Books are better than movies' },
        { emoji: '\u{1F4B0}', title: 'Kids should get an allowance' },
        { emoji: '\u{1F3C6}', title: 'Everyone should get a participation trophy' },
        { emoji: '\u{1F916}', title: 'AI will help students learn better' },
    ],
    '14-17': [
        { emoji: '\u{1F4F1}', title: 'Social media does more harm than good' },
        { emoji: '\u{1F393}', title: 'College is not worth the cost' },
        { emoji: '\u{1F5F3}', title: 'Voting age should be lowered to 16' },
        { emoji: '\u{1F916}', title: 'AI will replace most jobs' },
        { emoji: '\u{1F3EB}', title: 'Standardized tests are unfair' },
        { emoji: '\u{1F30D}', title: 'Individual action can solve climate change' },
        { emoji: '\u{1F4B0}', title: 'A universal basic income is a good idea' },
        { emoji: '\u{1F3AE}', title: 'Video game violence affects behavior' },
    ],
    '18+': [
        { emoji: '\u{1F916}', title: 'AI development should be paused' },
        { emoji: '\u{1F30D}', title: 'Economic growth vs environmental protection' },
        { emoji: '\u{1F4F1}', title: 'Privacy is more important than security' },
        { emoji: '\u{1F3E5}', title: 'Healthcare should be universal' },
        { emoji: '\u{1F5F3}', title: 'Democracy is the best form of government' },
        { emoji: '\u{1F4DA}', title: 'Liberal arts degrees are still valuable' },
        { emoji: '\u{1F680}', title: 'Space exploration is worth the investment' },
        { emoji: '\u{1F4B0}', title: 'Billionaires should not exist' },
    ]
};

// ========== TOPIC ARGUMENT BANKS ==========
const topicArgs = {
    'School should be 4 days a week': {
        for: ['Students in 4-day districts show equal or better test scores due to being more rested.', 'Families save on childcare and transportation costs with a 3-day weekend.', 'Teachers report less burnout and higher job satisfaction in 4-day systems.', 'Colorado rural districts switching to 4-day weeks saw attendance improve by 5%.'],
        against: ['Working parents struggle to find childcare for the extra day off.', 'Low-income students lose access to school meals on the fifth day.', 'Longer school days (to make up hours) exhaust younger students.', 'Research from RAND Corporation found no consistent academic benefit.']
    },
    'Homework should be banned': {
        for: ['Finland assigns minimal homework and ranks among the top education systems worldwide.', 'Studies show homework has almost no academic benefit for elementary students.', 'Excessive homework causes stress, sleep deprivation, and family conflict.', 'Students need unstructured time for creativity, play, and social development.'],
        against: ['Homework builds self-discipline, time management, and independent study habits.', 'Practice is essential for mastering skills in math, reading, and writing.', 'Without homework, students from less-educated households fall further behind.', 'Teachers use homework to identify gaps in understanding before exams.']
    },
    'Video games are good for you': {
        for: ['Problem-solving games improve spatial reasoning and strategic thinking.', 'Multiplayer games develop teamwork, communication, and social skills.', 'Studies from Oxford found moderate gaming linked to higher well-being.', 'Games like Minecraft are used in classrooms to teach coding and engineering.'],
        against: ['Excessive gaming is linked to obesity, poor sleep, and social isolation.', 'Violent games may desensitize children to aggression according to APA studies.', 'Gaming addiction is recognized by the WHO as a legitimate mental health disorder.', 'Screen time displaces physical activity, reading, and face-to-face socializing.']
    },
    'Kids should have smartphones': {
        for: ['Smartphones provide safety — kids can contact parents in emergencies.', 'Educational apps and resources support learning outside the classroom.', 'Digital literacy is essential for the modern workforce.', 'GPS tracking gives parents peace of mind about their child\'s location.'],
        against: ['Smartphones expose children to cyberbullying, which affects 37% of young users.', 'Screen addiction disrupts sleep, attention span, and academic performance.', 'Social media on phones contributes to anxiety and depression in adolescents.', 'Children lack the maturity to handle online predators and inappropriate content.']
    },
    'Social media does more harm than good': {
        for: ['Instagram\'s own internal research showed it worsens body image in 1 in 3 teen girls.', 'Social media algorithms create echo chambers that radicalize political views.', 'Average teens spend 7+ hours daily on screens, displacing sleep and exercise.', 'Misinformation spreads 6x faster than factual news on social platforms (MIT study).'],
        against: ['Social media connects isolated people and provides mental health support communities.', 'Platforms enable global movements for social justice and political change.', 'Small businesses and creators earn livelihoods through social media.', 'Educational content on YouTube and TikTok reaches millions of learners for free.']
    },
    'AI will replace most jobs': {
        for: ['McKinsey estimates 30% of work hours could be automated by 2030.', 'AI already outperforms humans in radiology, legal research, and customer service.', 'Self-driving technology threatens 3.5 million trucking jobs in the US alone.', 'Companies choosing AI over human workers save 40-60% on labor costs.'],
        against: ['Every industrial revolution created more jobs than it destroyed.', 'AI lacks creativity, empathy, and judgment needed for most human roles.', 'New industries we can\'t imagine yet will emerge, just as the internet created millions of jobs.', 'AI is a tool that augments workers, not replaces them — like how ATMs didn\'t eliminate bank tellers.']
    },
    'School uniforms should be required': {
        for: ['Uniforms reduce bullying based on clothing and visible economic differences.', 'The Long Beach school district saw a 28% drop in suspensions after requiring uniforms.', 'Students spend less morning time choosing outfits, reducing family stress.', 'Uniforms create a sense of belonging and school identity.'],
        against: ['Uniforms suppress self-expression, which is important for adolescent development.', 'The cost of specific uniforms can actually burden low-income families more.', 'Studies from the University of Nevada found no measurable impact on behavior or attendance.', 'Forcing conformity doesn\'t address the root causes of bullying or inequality.']
    },
    'E-sports are real sports': {
        for: ['E-sports require intense training, strategy, reflexes, and teamwork — just like traditional sports.', 'Professional gamers train 8-12 hours daily and face career-ending injuries like carpal tunnel.', 'The e-sports industry is worth over $1.8 billion and has millions of fans worldwide.', 'The International Olympic Committee has discussed adding e-sports to the Olympics.'],
        against: ['Traditional sports require physical fitness and athleticism that e-sports do not.', 'Sitting at a computer for hours promotes sedentary lifestyles and health problems.', 'The definition of "sport" has always included physical exertion as a core component.', 'E-sports lack the character-building aspects of physical team sports like discipline through fitness.']
    },
    'Cats are better pets than dogs': {
        for: ['Cats are independent and require less daily attention, ideal for busy owners.', 'Cat ownership costs average $800/year less than dogs due to food and vet costs.', 'Cats are quieter and better suited for apartments and close neighbors.', 'A Purdue University study found cat purring frequencies promote bone healing.'],
        against: ['Dogs provide loyal companionship and emotional support that reduces depression.', 'Dogs encourage exercise — owners walk an average of 30 more minutes per day.', 'Dogs can be trained for service work, therapy, search and rescue, and security.', 'Dogs are more social and help owners meet new people and build community.']
    },
    'College is not worth the cost': {
        for: ['Average US student loan debt is $37,000, taking 20 years to repay.', 'Many high-paying trades (electrician, plumber) require no degree and have labor shortages.', 'Tech companies like Google and Apple no longer require degrees for many roles.', '41% of recent graduates work in jobs that don\'t require a degree.'],
        against: ['College graduates earn $1.2 million more over a lifetime than non-graduates.', 'University develops critical thinking, research skills, and intellectual maturity.', 'The unemployment rate for degree holders is consistently half that of non-graduates.', 'College provides networking, mentorship, and opportunities unavailable elsewhere.']
    },
    'Privacy is more important than security': {
        for: ['Mass surveillance chills free speech — people self-censor when watched.', 'Government surveillance programs have repeatedly been abused (NSA, COINTELPRO).', 'Benjamin Franklin: "Those who give up liberty for safety deserve neither."', 'Strong encryption protects journalists, activists, and dissidents in authoritarian regimes.'],
        against: ['Intelligence agencies have prevented thousands of terrorist attacks through surveillance.', 'Law enforcement needs data access to fight child exploitation and organized crime.', 'Most people willingly share personal data with corporations daily — privacy is already traded.', 'Without security, privacy is meaningless — you can\'t have rights if you\'re not safe.']
    },
    'Healthcare should be universal': {
        for: ['32 of 33 developed nations have universal healthcare — the US is the exception.', 'The US spends 17% of GDP on healthcare yet ranks 37th in outcomes (WHO).', 'Medical bankruptcy is the #1 cause of bankruptcy in America — 530,000 families per year.', 'Preventive care under universal systems reduces long-term costs significantly.'],
        against: ['Universal healthcare leads to longer wait times — Canada averages 25 weeks for specialists.', 'Government-run programs are inefficient and bureaucratic.', 'Innovation in medicine is driven by profit incentives that universal care reduces.', 'Taxpayers would face massive tax increases to fund universal coverage.']
    }
};

function findTopicBank(topic, side) {
    if (topicArgs[topic] && topicArgs[topic][side]) return topicArgs[topic][side];
    const topicLower = topic.toLowerCase();
    for (const [key, val] of Object.entries(topicArgs)) {
        const keyWords = key.toLowerCase().split(/\s+/);
        const matches = keyWords.filter(w => w.length > 3 && topicLower.includes(w));
        if (matches.length >= 2 && val[side]) return val[side];
    }
    return null;
}

function getNextArg(topic, side) {
    const bank = findTopicBank(topic, side);
    if (!bank) return null;
    const unused = bank.filter(a => !state.usedArgs.includes(a));
    if (unused.length === 0) return null;
    const picked = unused[0];
    state.usedArgs.push(picked);
    return picked;
}

function getNextArgs(topic, side, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const arg = getNextArg(topic, side);
        if (arg) result.push(arg);
    }
    return result;
}

// ========== AI RESPONSE ENGINE ==========
const aiStrategies = {
    beginner: {
        complexity: 'simple', hints: true, maxRounds: 3,
        rounds: [
            { type: 'constructive', label: 'Opening Argument', desc: 'State your case using POE: Point, Observation, Evidence.' },
            { type: 'constructive', label: 'Second Argument', desc: 'Respond to the AI and add a new POE argument.' },
            { type: 'rebuttal', label: 'Closing Rebuttal', desc: 'Respond to the AI\'s points. NO new arguments - only rebut and summarize.' }
        ]
    },
    intermediate: {
        complexity: 'moderate', hints: true, maxRounds: 4,
        rounds: [
            { type: 'constructive', label: 'Constructive Speech', desc: 'Present your case with Point, Explanation, Evidence, and Impact.' },
            { type: 'constructive', label: 'Clash & Extend', desc: 'Directly address the AI\'s arguments, then extend your own case.' },
            { type: 'constructive', label: 'Weighing', desc: 'Explain why YOUR impacts matter more than the AI\'s. Compare both sides.' },
            { type: 'rebuttal', label: 'Crystallization', desc: 'Summarize the key clash points. NO new arguments. Tell the judge why you win.' }
        ]
    },
    advanced: {
        complexity: 'complex', hints: false, maxRounds: 5,
        rounds: [
            { type: 'constructive', label: '1st Constructive', desc: 'Present your full case: on-case arguments with evidence and framing.' },
            { type: 'constructive', label: '2nd Constructive', desc: 'Respond to AI\'s case. Run off-case arguments or disadvantages.' },
            { type: 'constructive', label: 'Clash & Weighing', desc: 'Line-by-line refutation. Weigh impacts. Challenge evidence quality.' },
            { type: 'rebuttal', label: 'Rebuttal', desc: 'Collapse to your strongest arguments. Explain why they outweigh. No new args.' },
            { type: 'rebuttal', label: 'Final Focus', desc: 'Crystallize the debate. Frame the key voter issues for the judge.' }
        ]
    }
};

function getAIResponse(topic, aiSide, round, userArg, skill) {
    const config = aiStrategies[skill];
    const roundInfo = config.rounds[round - 1];
    if (round === 1) return buildOpener(config.complexity, aiSide, topic);
    if (roundInfo && roundInfo.type === 'rebuttal') return buildClosing(config.complexity, aiSide, topic, userArg);
    return buildRebuttal(config.complexity, aiSide, topic, userArg, round);
}

function extractKeyPoints(text) {
    if (!text) return [];
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
    return sentences.slice(0, 3);
}

function pickKeywords(text) {
    if (!text) return [];
    const stopWords = new Set(['the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','need','dare','ought','used','to','of','in','for','on','with','at','by','from','as','into','through','during','before','after','above','below','between','out','off','over','under','again','further','then','once','here','there','when','where','why','how','all','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','just','because','but','and','or','if','while','that','this','it','i','you','he','she','we','they','my','your','his','her','its','our','their','what','which','who','whom','me','him','us','them','think','believe','say','said','also','really','about','like','get','make','know','people','thing','things','many','much','way','even','well','back','still','going','right','wrong','good','bad']);
    const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
    const freq = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => e[0]);
}

function buildOpener(complexity, side, topic) {
    const pos = side === 'for' ? 'in favor of' : 'against';
    const args = getNextArgs(topic, side, 2);
    const a1 = args[0];
    const a2 = args[1];

    // Track what the AI said so it can reference its own points later
    if (a1) state.aiPrevPoints.push(a1);
    if (a2) state.aiPrevPoints.push(a2);

    // With topic-specific arguments
    if (a1 && a2) {
        if (complexity === 'simple') {
            return `I'm arguing ${pos} "${topic}." Here are my two points.\n\nFirst: ${a1}\n\nSecond: ${a2}\n\nThose are facts, not opinions. Now argue against them.`;
        }
        if (complexity === 'moderate') {
            return `Arguing ${pos} "${topic}."\n\nContention 1: ${a1} This alone makes a strong case for my side.\n\nContention 2: ${a2}\n\nBoth of these are documented, real-world outcomes. They affect real people. To beat my case, you need to defeat both contentions — not just one.`;
        }
        return `${pos.charAt(0).toUpperCase() + pos.slice(1)} the resolution: "${topic}."\n\nFramework: Weigh this on net harm — who suffers more under which side.\n\nContention 1: ${a1}\n\nContention 2: ${a2}\n\nThese are independent. Even if you answer one, the other stands. I need you to engage with both.`;
    }

    // Without topic bank — build from topic words
    const topicAction = topic.replace(/should be |should |must be |must |is |are /i, '').trim();
    const subject = pickKeywords(topic)[0] || topicAction;
    const p1 = `People who deal with ${subject} every day report that ${side === 'for' ? 'it works' : 'it fails'} — not in theory, in their actual lives.`;
    const p2 = `Places that have ${side === 'for' ? 'adopted' : 'rejected'} ${topicAction} have seen measurable results: ${side === 'for' ? 'better' : 'worse'} outcomes for the people most affected.`;
    state.aiPrevPoints.push(p1, p2);

    if (complexity === 'simple') {
        return `I'm arguing ${pos} "${topic}."\n\nFirst: ${p1}\n\nSecond: ${p2}\n\nThose are my two arguments. Your turn — tell me why I'm wrong.`;
    }
    if (complexity === 'moderate') {
        return `Arguing ${pos} "${topic}."\n\nContention 1: ${p1}\n\nContention 2: ${p2}\n\nThe impact is tangible — ${subject} touches students, families, and communities directly. You need to address both points to win.`;
    }
    return `${pos.charAt(0).toUpperCase() + pos.slice(1)} "${topic}."\n\nFramework: Net real-world impact.\n\nContention 1: ${p1}\n\nContention 2: ${p2}\n\nThese contentions are independent. Defeating one doesn't defeat the other. Engage with both.`;
}

function rateUserArg(text) {
    let score = 0;
    const words = text.trim().split(/\s+/).length;
    const hasEvidence = /for example|for instance|study|studies|research|according to|data|statistics|percent|%|\d{2,}/i.test(text);
    const hasExamples = /such as|like when|in \w+ (country|state|district|city)|finland|japan|canada|europe|america/i.test(text);
    const hasLogic = /because|therefore|this means|this leads to|as a result|consequently|the reason/i.test(text);
    const hasClash = /you (said|argued|claimed)|however|but your|the AI|opponent/i.test(text);
    const hasImpact = /affects|impact|consequence|significant|serious|millions|thousands|lives|families/i.test(text);

    if (hasEvidence) score += 2;
    if (hasExamples) score += 2;
    if (hasLogic) score += 1;
    if (hasClash) score += 1;
    if (hasImpact) score += 1;
    if (words > 40) score += 1;
    if (words > 80) score += 1;

    return score; // 0-9: 0-2=weak, 3-5=decent, 6+=strong
}

function buildRebuttal(complexity, side, topic, userArg, round) {
    const userSentences = extractKeyPoints(userArg);
    const userKw = pickKeywords(userArg);
    const strength = rateUserArg(userArg);

    // Get the user's actual strongest sentence to quote
    const bestQuote = userSentences.reduce((a, b) => b.length > a.length ? b : a, userSentences[0] || userArg.substring(0, 100));

    // Get a fresh argument the AI hasn't used yet
    const newArg = getNextArg(topic, side);
    const topicAction = topic.replace(/should be |should |must be |must |is |are /i, '').trim();
    const subject = pickKeywords(topic)[0] || topicAction;

    // What did the AI say before that the user might have attacked?
    const myPrevPoint = state.aiPrevPoints[state.aiPrevPoints.length - 1] || `my earlier arguments about ${subject}`;

    // Track new argument
    if (newArg) state.aiPrevPoints.push(newArg);

    // === PART 1: NEW CONTENTION (extend own case with fresh evidence) ===
    let extend;
    if (newArg) {
        extend = `New argument: ${newArg}`;
    } else {
        extend = `Extending my case: the pattern on ${subject} continues to hold. Every angle we examine — economic, social, practical — points the same direction for "${topic}."`;
    }

    // === PART 2: REFUTATION (respond to what user actually said) ===
    let refute;
    const userMainPoint = userKw[0] || subject;

    if (strength >= 6) {
        // User gave strong evidence — concede partially, pivot
        refute = `On your argument — you said: "${bestQuote}." That's a legitimate point about ${userMainPoint}. I won't dismiss it. But it doesn't defeat my case. ${newArg ? 'My new evidence above stands independently.' : `My earlier point still holds: ${myPrevPoint}`} Your argument is true in a narrow sense, but the bigger picture on "${topic}" still favors me.`;
    } else if (strength >= 3) {
        // Decent — push back on specifics
        refute = `You argued: "${bestQuote}." I see the logic, but there's a gap. You haven't proven this with hard evidence — where's the data? Where are the examples? ${newArg ? `Meanwhile, I just showed you: ${newArg}` : `My evidence about ${myPrevPoint} remains uncontested.`} Reasoning without proof isn't enough to win this point on "${topic}."`;
    } else {
        // Weak — call it out
        refute = `You said: "${bestQuote}." That's an opinion, not an argument. You didn't cite a single study, example, or fact about ${userMainPoint}. In a debate on "${topic}," claims need evidence. ${newArg ? `Compare that to what I just presented: ${newArg}` : `My evidence still stands: ${myPrevPoint}`} The evidence gap between our sides is clear.`;
    }

    // === PART 3: FRONTLINE (defend own arguments) ===
    let frontline;
    const userAttacked = /you (said|argued|claimed)|your (point|argument|evidence|case|contention)|the AI|opponent|earlier|first point|second point/i.test(userArg);

    if (userAttacked) {
        frontline = `On your attack against my case — you tried to challenge "${myPrevPoint.substring(0, 60)}..." but you didn't disprove it. You disagreed, but disagreeing isn't refuting. My evidence stands because you haven't provided counter-evidence of equal weight.`;
    } else {
        frontline = `I also notice you didn't respond to my point that "${myPrevPoint.substring(0, 60)}..." Dropping an argument means conceding it. That point still stands in my favor.`;
    }

    // Combine all three parts
    if (complexity === 'simple') {
        return `${extend}\n\n${refute}`;
    }
    return `${extend}\n\n${refute}\n\n${frontline}`;
}

function buildClosing(complexity, side, topic, userArg) {
    const pos = side === 'for' ? 'in favor of' : 'against';
    const userKw = pickKeywords(userArg);
    const bestUserQuote = extractKeyPoints(userArg)[0] || userArg.substring(0, 80);

    // Reference ALL the AI's own points from the debate
    const myPoints = state.aiPrevPoints.slice(0, 3);
    const pointsList = myPoints.map((p, i) => `${i + 1}. ${p}`).join('\n');

    if (complexity === 'simple') {
        return `Closing ${pos} "${topic}."\n\nMy case had real evidence:\n${pointsList}\n\nYou argued: "${bestUserQuote}." But ${userKw[0] ? `your points about ${userKw[0]}` : 'your arguments'} didn't overcome the facts I presented. My side wins on evidence.`;
    }
    if (complexity === 'moderate') {
        return `Crystallization ${pos} "${topic}":\n\nThe key clash: my evidence-backed contentions vs. your arguments about ${userKw[0] || 'the opposition'}.\n\nMy case:\n${pointsList}\n\nYour strongest point was "${bestUserQuote}" — but even granting that, my impacts outweigh yours in scope and severity. The balance of this debate clearly favors my side.`;
    }
    return `Final focus ${pos} "${topic}."\n\nVoter 1 — Evidence: My contentions were grounded in documented outcomes:\n${pointsList}\n\nVoter 2 — Clash: Your strongest argument was "${bestUserQuote}" about ${userKw[0] || 'the issue'}. I engaged with it directly and showed why it doesn't outweigh my case.\n\nVoter 3 — Dropped arguments: Multiple points I raised went uncontested. In debate, dropped arguments are conceded. The ballot goes ${pos} the resolution.`;
}

function shorten(text) {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= 12 ? text : words.slice(0, 12).join(' ') + '...';
}

function getHint(round, skill, side) {
    if (skill === 'advanced') return null;
    const config = aiStrategies[skill];
    const roundInfo = config.rounds[round - 1];
    if (!roundInfo) return null;

    const beginner = {
        constructive: [
            `Use POE structure!\n• POINT: "My argument is that..."\n• OBSERVATION: "This is because..."\n• EVIDENCE: "For example..."`,
            `State ONE clear point, explain WHY it's true, then give a real example or fact to prove it.`,
            `Remember: Point first, then explain it, then back it up with evidence. That's POE!`
        ],
        rebuttal: [
            `NO new arguments! Only respond to what the AI said. Try: "The AI argued X, but this is wrong because..."`,
            `Summarize your strongest points from earlier. Tell the judge: "For these reasons, my side wins."`,
            `Pick the AI's weakest argument and explain exactly why it fails. Then remind the judge of YOUR best point.`
        ]
    };

    const intermediate = {
        constructive: round === 1 ? [
            `Use extended POE: Point → Explanation → Evidence → IMPACT.\nEnd with WHY this matters: "This is significant because..."`,
            `Structure: State your argument, explain the logic, cite evidence, then explain the real-world impact on people's lives.`
        ] : round === 3 ? [
            `WEIGHING round! Compare both sides: "Even if the AI is right about X, my argument about Y matters more because..."`,
            `Don't just repeat your points. Explain why your IMPACTS are bigger than theirs. Who is affected? How seriously?`
        ] : [
            `CLASH is required! You MUST address what the AI just said before making your own points.`,
            `Start with: "The AI argued [X], but this fails because [Y]." Then extend your own case with new evidence.`
        ],
        rebuttal: [
            `CRYSTALLIZATION: No new arguments! Identify the 2-3 key issues in the debate and explain why you win each one.`,
            `Tell the judge: "This debate came down to [X] and [Y]. On both counts, my side wins because..."`,
            `Compare the strongest argument from each side. Explain why yours outweighs theirs in scope, severity, or probability.`
        ]
    };

    const hints = skill === 'beginner' ? beginner : intermediate;
    const pool = hints[roundInfo.type] || hints.constructive;
    return pool[Math.floor(Math.random() * pool.length)];
}

// ========== SCORING (FAIR JUDGE) ==========
function scoreDebate() {
    const { userArgs } = state;
    let clarity = 0, evidence = 0, persuasion = 0, rebuttal = 0;

    userArgs.forEach((arg, i) => {
        const words = arg.trim().split(/\s+/).length;
        const sentences = arg.split(/[.!?]+/).filter(s => s.trim().length > 3).length;
        const lower = arg.toLowerCase();

        // --- CLARITY (max ~6 per round) ---
        // Length
        if (words >= 30) clarity += 2;
        else if (words >= 15) clarity += 1;
        // Sentences
        if (sentences >= 3) clarity += 2;
        else if (sentences >= 2) clarity += 1;
        // Structure markers (POE or logical flow)
        if (/my (point|argument|contention|claim|position|case)|i (believe|argue|think) that/i.test(arg)) clarity += 1;
        if (/because|this is because|the reason|this means|which means|which leads to|as a result/i.test(arg)) clarity += 1;

        // --- EVIDENCE (max ~5 per round) ---
        // Direct evidence language
        if (/for example|for instance|such as|like when|one example/i.test(arg)) evidence += 2;
        if (/stud(y|ies)|research|according to|data|statistic|survey|report|found that|percent|%/i.test(arg)) evidence += 2;
        if (/\d{2,}/.test(arg)) evidence += 1; // contains numbers
        // Named sources / places
        if (/[A-Z][a-z]+ (university|institute|school|district|foundation)|finland|japan|canada|europe|america|australia|WHO|UNESCO|UNICEF|RAND|harvard|stanford|oxford|MIT/i.test(arg)) evidence += 2;
        // General reasoning (weaker but still counts)
        if (evidence === 0 && /shows|proves|demonstrates|causes|leads to|results in/i.test(arg)) evidence += 1;
        if (evidence === 0 && words >= 40) evidence += 1;

        // --- PERSUASION (max ~5 per round) ---
        // Strong language
        if (/therefore|consequently|clearly|undeniably|crucially|fundamentally/i.test(arg)) persuasion += 2;
        if (/must|should|need to|have to|essential|critical|vital|urgent/i.test(arg)) persuasion += 1;
        // Impact language
        if (/significant|serious|devastating|harmful|beneficial|massive|widespread|affects (millions|thousands|everyone|families|students|people)/i.test(arg)) persuasion += 2;
        if (/matters because|the impact|the consequence|this is important because|at stake/i.test(arg)) persuasion += 1;
        // Weighing
        if (/more important|outweigh|even if|compared to|bigger than|worse than|matters more|greater than|less significant/i.test(arg)) persuasion += 2;

        // --- REBUTTAL (max ~5 per round, only after round 1) ---
        if (i > 0) {
            // Direct engagement
            if (/you (said|argued|claimed|mentioned|stated|brought up)|the (AI|opponent|opposition|other side)|your (point|argument|evidence|case|claim|contention|position)/i.test(arg)) rebuttal += 3;
            // Indirect engagement
            else if (/however|but |although|while |on the other hand|that's (wrong|incorrect|false|not true)|i disagree|actually|in reality|the problem with/i.test(arg)) rebuttal += 2;
            // Any counter-language
            else if (/not true|doesn't (work|hold|apply)|fails|flaw|weak|wrong|counter|instead|rather/i.test(arg)) rebuttal += 1;
            // Length bonus for engagement
            if (words >= 30) rebuttal += 1;
        }
    });

    // Fairer normalization — based on actual maximum achievable per round
    const rounds = state.maxRounds;
    const normClarity = Math.min(10, Math.round((clarity / (rounds * 5)) * 10));
    const normEvidence = Math.min(10, Math.round((evidence / (rounds * 4)) * 10));
    const normPersuasion = Math.min(10, Math.round((persuasion / (rounds * 4)) * 10));
    const normRebuttal = Math.min(10, Math.round((rebuttal / (Math.max(1, rounds - 1) * 4)) * 10));

    state.scores = { clarity: normClarity, evidence: normEvidence, persuasion: normPersuasion, rebuttal: normRebuttal };
    return state.scores;
}

function getFeedback(scores) {
    const feedback = [];
    const total = scores.clarity + scores.evidence + scores.persuasion + scores.rebuttal;

    // Structure feedback based on skill level
    if (state.skill === 'beginner') {
        feedback.push(scores.clarity >= 7 ? 'Great POE structure! Your points were clear and well-organized.' :
            scores.clarity >= 4 ? 'Work on your POE structure. Every argument needs: a clear Point, an Observation/Explanation of why, and Evidence to back it up.' :
            'Focus on structure: state your POINT first, EXPLAIN why it\'s true, then give EVIDENCE. Practice this formula!');
    } else if (state.skill === 'intermediate') {
        feedback.push(scores.clarity >= 7 ? 'Well-structured arguments with clear impacts.' :
            scores.clarity >= 4 ? 'Remember to include the IMPACT — explain why your point matters in the big picture.' :
            'Structure needs work. Use: Point, Explanation, Evidence, then IMPACT (why it matters).');
    } else {
        feedback.push(scores.clarity >= 7 ? 'Sophisticated argumentation with strong framing.' :
            'Work on framing your arguments. Tell the judge HOW to evaluate the debate, not just what to think.');
    }

    feedback.push(scores.evidence >= 7 ? 'Strong use of evidence and examples to support your claims.' :
        scores.evidence >= 4 ? 'Add more concrete evidence. Use "for example," "studies show," or "according to" to strengthen your case.' :
        'Your arguments lacked evidence. Every claim needs proof — a fact, statistic, example, or expert opinion.');

    feedback.push(scores.persuasion >= 7 ? 'Persuasive language and strong impact analysis.' :
        scores.persuasion >= 4 ? 'Try to explain WHY your impacts matter. Use "this is significant because" and "the consequences are" to be more persuasive.' :
        'Be bolder! State why your argument MATTERS. Use impact language: "this affects," "the consequence is," "this is crucial because."');

    feedback.push(scores.rebuttal >= 5 ? 'Excellent clash — you engaged directly with the AI\'s arguments.' :
        scores.rebuttal >= 2 ? 'You partially engaged with the AI\'s case. Try to quote or reference specific things they said, then explain why they\'re wrong.' :
        'You need more clash! Don\'t just make your own points — directly attack what the AI said. Start with "You argued X, but..."');

    feedback.push(total >= 30 ? 'Outstanding debate performance! You\'re ready to move up a level.' :
        total >= 20 ? 'Solid effort. Focus on the areas above to get even sharper.' :
        total >= 10 ? 'Good start. Practice the structure and engage more with your opponent\'s arguments.' :
        'Keep practicing. Focus on POE structure and responding to what the AI actually says.');

    return feedback;
}

// ========== SETUP FLOW ==========
function pickAge(btn) {
    document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.age = btn.dataset.age;

    // If default difficulty is set, skip skill step
    if (settings.defaultDifficulty) {
        state.skill = settings.defaultDifficulty;
        state.maxRounds = aiStrategies[state.skill].maxRounds;
        setTimeout(() => { populateTopics(); showStep('step-topic'); }, 300);
    } else {
        setTimeout(() => showStep('step-skill'), 300);
    }
}

function pickSkill(btn) {
    document.querySelectorAll('.skill-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.skill = btn.dataset.skill;
    state.maxRounds = aiStrategies[state.skill].maxRounds;
    setTimeout(() => { populateTopics(); showStep('step-topic'); }, 300);
}

function populateTopics() {
    const grid = document.getElementById('topic-grid');
    const topics = topicsByAge[state.age] || topicsByAge['18+'];
    grid.innerHTML = '';
    topics.forEach(t => {
        const card = document.createElement('button');
        card.className = 'topic-card';
        card.innerHTML = `<span class="topic-emoji">${t.emoji}</span><span class="topic-title">${t.title}</span>`;
        card.onclick = () => selectTopic(t.title, card);
        grid.appendChild(card);
    });
}

function selectTopic(title, card) {
    document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('selected'));
    if (card) card.classList.add('selected');
    state.topic = title;
    setTimeout(() => {
        document.getElementById('side-topic-title').textContent = `"${title}"`;
        showStep('step-side');
    }, 300);
}

function useCustomTopic() {
    const input = document.getElementById('custom-topic');
    const val = input.value.trim();
    const words = val.split(/\s+/).filter(w => w.length > 0);
    const substantiveWords = words.filter(w => w.length > 3);

    if (!val || words.length < 5) {
        input.classList.add('error');
        input.focus();
        showToast('Too short! A debate topic needs at least 5 words. Example: "Homework should be banned in schools"');
        setTimeout(() => input.classList.remove('error'), 2000);
        return;
    }

    if (substantiveWords.length < 3) {
        input.classList.add('error');
        input.focus();
        showToast('That\'s too vague. Use a real topic like "Social media does more harm than good"');
        setTimeout(() => input.classList.remove('error'), 2000);
        return;
    }

    const hasOpinion = /should|must|better|worse|need|ban|allow|important|fair|unfair|best|worst|required|necessary|harmful|beneficial|illegal|legal|free|mandatory|optional|replaced|abolished/i.test(val);
    const hasSubject = /school|education|student|kid|child|teen|social media|phone|game|video|internet|government|health|money|work|job|sport|food|animal|environment|climate|technology|college|university|homework|uniform|vote|age|ai |artificial|science|space|privacy|security|law|crime|test|exam/i.test(val);

    if (!hasOpinion && !hasSubject) {
        input.classList.add('error');
        input.focus();
        showToast('That doesn\'t look like a real debate topic. It should be a statement people can disagree on, like "Video games are good for kids"');
        setTimeout(() => input.classList.remove('error'), 2000);
        return;
    }

    if (!hasOpinion) {
        input.classList.add('error');
        input.focus();
        showToast('Add an opinion! Try "X should be..." or "X is better than..." or "X is harmful"');
        setTimeout(() => input.classList.remove('error'), 2000);
        return;
    }

    state.topic = val;
    document.getElementById('side-topic-title').textContent = `"${val}"`;
    showStep('step-side');
}

function getCharLimit() {
    if (state.skill === 'advanced') return 2000;
    if (state.skill === 'intermediate') return 1000;
    return 500;
}

function pickSide(side) {
    state.side = side;
    const aiSide = side === 'for' ? 'against' : 'for';

    document.getElementById('debate-topic-text').textContent = state.topic;
    document.getElementById('your-side-label').textContent = side.toUpperCase();
    document.getElementById('ai-side-label').textContent = aiSide.toUpperCase();
    document.getElementById('total-rounds').textContent = state.maxRounds;

    const limit = getCharLimit();
    const input = document.getElementById('debate-input');
    input.maxLength = limit;
    document.getElementById('char-limit-display').textContent = limit;

    startDebate();
}

// ========== TIMER ==========
function startTimer() {
    if (!settings.timer) return;
    const display = document.getElementById('timer-display');
    display.classList.remove('hidden', 'warning');
    state.timerSeconds = 120;
    updateTimerText();
    state.timerInterval = setInterval(() => {
        state.timerSeconds--;
        updateTimerText();
        if (state.timerSeconds <= 30) display.classList.add('warning');
        if (state.timerSeconds <= 0) {
            stopTimer();
            submitArgument();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    const display = document.getElementById('timer-display');
    display.classList.add('hidden');
    display.classList.remove('warning');
}

function updateTimerText() {
    const m = Math.floor(state.timerSeconds / 60);
    const s = state.timerSeconds % 60;
    document.getElementById('timer-text').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ========== SPEECH ==========
function toggleVoiceInput() {
    if (!state.recognition) {
        showToast('Speech recognition not supported in this browser');
        return;
    }
    const btn = document.getElementById('voice-btn');
    if (state.isRecording) {
        state.recognition.stop();
        state.isRecording = false;
        btn.classList.remove('recording');
    } else {
        state.textBeforeVoice = document.getElementById('debate-input').value;
        state.recognition.start();
        state.isRecording = true;
        btn.classList.add('recording');
    }
}

function speakText(text, btn) {
    if (state.currentSpeech) {
        window.speechSynthesis.cancel();
        state.currentSpeech = null;
        document.querySelectorAll('.bubble-listen-btn.speaking').forEach(b => b.classList.remove('speaking'));
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    state.currentSpeech = utterance;
    if (btn) btn.classList.add('speaking');
    utterance.onend = () => {
        state.currentSpeech = null;
        if (btn) btn.classList.remove('speaking');
    };
    window.speechSynthesis.speak(utterance);
}

// ========== DEBATE LOGIC ==========
function startDebate() {
    state.round = 1;
    state.userArgs = [];
    state.aiArgs = [];
    state.usedArgs = [];
    state.aiPrevPoints = [];
    state.roundTypes = aiStrategies[state.skill].rounds;

    const chat = document.getElementById('debate-chat');
    chat.innerHTML = '';

    showScreen('debate');

    const roundInfo = state.roundTypes[0];
    const pName = profile ? profile.name : 'You';
    addSystemMsg(`${pName} vs AI — ${state.side.toUpperCase()} "${state.topic}". The debate begins.`);
    addSystemMsg(`Round 1: ${roundInfo.label} — ${roundInfo.desc}`);
    updateRoundDisplay();
    showHint();
    startTimer();

    const input = document.getElementById('debate-input');
    input.disabled = false;
    input.value = '';
    document.getElementById('send-btn').disabled = false;
    document.getElementById('char-count').textContent = '0';
    input.focus();
}

function addSystemMsg(text) {
    const chat = document.getElementById('debate-chat');
    const div = document.createElement('div');
    div.className = 'system-msg';
    div.textContent = text;
    chat.appendChild(div);
    scrollChat();
}

function addBubble(text, who) {
    const chat = document.getElementById('debate-chat');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${who}`;
    const label = who === 'user' ? (profile ? profile.name : 'You') : 'AI';
    const listenBtn = `<button class="bubble-listen-btn" onclick="speakText(this.closest('.chat-bubble').querySelector('.bubble-text').textContent, this)" title="Listen">&#x1F50A;</button>`;
    bubble.innerHTML = `<span class="bubble-label">${label} ${listenBtn}</span><span class="bubble-text">${escapeHtml(text)}</span>`;
    chat.appendChild(bubble);
    scrollChat();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showTyping() {
    const chat = document.getElementById('debate-chat');
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typing';
    typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chat.appendChild(typing);
    scrollChat();
}

function removeTyping() {
    const el = document.getElementById('typing');
    if (el) el.remove();
}

function scrollChat() {
    const chat = document.getElementById('debate-chat');
    setTimeout(() => chat.scrollTop = chat.scrollHeight, 50);
}

function updateRoundDisplay() {
    document.getElementById('round-num').textContent = state.round;
}

function showHint() {
    const hint = getHint(state.round, state.skill, state.side);
    const bar = document.getElementById('hint-bar');
    if (hint) {
        bar.className = 'hint-bar visible';
        bar.innerHTML = `<span class="hint-label">Hint: </span>${hint}`;
    } else {
        bar.className = 'hint-bar';
        bar.innerHTML = '';
    }
}

function validateArgument(text) {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 3);
    const realWords = words.filter(w => /^[a-zA-Z]{2,}$/.test(w));

    // Basic quality checks
    if (words.length < 8) return { msg: 'Your argument is too short.', fixes: [
        { label: '+ Add a point', text: 'I believe that ' },
        { label: '+ Add reasoning', text: 'This is because ' },
        { label: '+ Add evidence', text: 'For example, ' }
    ]};
    if (sentences.length < 2) return { msg: 'You need at least 2 complete sentences. Add a period and write another sentence.', fixes: [
        { label: '+ Add period & continue', text: '. Furthermore, ' },
        { label: '+ Add second point', text: '. This matters because ' }
    ]};
    if (realWords.length < 5) return { msg: 'Use real words and make a clear argument.', fixes: [
        { label: 'Start with a point', text: 'I argue that ' },
        { label: 'Start with evidence', text: 'Research shows that ' }
    ]};

    const gibberish = /^(.)\1{3,}|^[^aeiou\s]{6,}/i;
    const gibberishWords = words.filter(w => gibberish.test(w) || (w.length > 1 && !/[aeiou]/i.test(w)));
    if (gibberishWords.length > words.length / 2) return { msg: 'That doesn\'t look like a real argument.', fixes: [
        { label: 'Clear & start fresh', text: '', replace: true }
    ]};

    const roundInfo = state.roundTypes[state.round - 1];
    if (!roundInfo) return null;

    // POE check for beginners
    if (state.skill === 'beginner') {
        const hasPoint = /my (point|argument|position|case|claim) is|i (think|believe|argue) that|should|must/i.test(text);
        const hasExplanation = /because|this is (because|due to|since)|the reason|this means|this matters/i.test(text);
        const hasEvidence = /for example|for instance|such as|studies show|research|according to|evidence|a study|data shows|in fact/i.test(text);
        const missing = [];
        if (!hasPoint) missing.push({ label: '+ Point', text: ' I believe that ' });
        if (!hasExplanation) missing.push({ label: '+ Explanation', text: ' This is because ' });
        if (!hasEvidence) missing.push({ label: '+ Evidence', text: ' For example, ' });
        if (missing.length >= 2) return { msg: 'Your argument is missing POE structure. Add the missing parts:', fixes: missing };
    }

    // Clash check for intermediate
    if (state.skill === 'intermediate' && state.round > 1) {
        const hasClash = /you (said|argued|claimed|mentioned)|the (opponent|other side|AI|opposition) (said|argued)|while (you|they)|however|but (your|the|that) (argument|point|claim)|i disagree with|responding to|in response/i.test(text);
        if (!hasClash && roundInfo.type === 'constructive') return { msg: 'You need to engage with the AI\'s arguments first.', fixes: [
            { label: '+ Respond to AI', text: ' The AI argued that, however ' },
            { label: '+ Counter their point', text: ' While they claimed this, I disagree because ' },
            { label: '+ Address their evidence', text: ' Their evidence fails because ' }
        ]};

        if (state.round === 3) {
            const hasWeighing = /more important|outweigh|matters more|bigger impact|even if|compared to|worse than|better than|greater harm|significant because/i.test(text);
            if (!hasWeighing) return { msg: 'This is the weighing round. Compare impacts.', fixes: [
                { label: '+ Weigh impacts', text: ' Even if they are right, my argument matters more because ' },
                { label: '+ Compare scope', text: ' My argument affects more people because ' },
                { label: '+ Compare severity', text: ' The consequences of their position are worse because ' }
            ]};
        }
    }

    // Rebuttal check
    if (roundInfo.type === 'rebuttal') {
        const hasNewArg = /my (new|next|another|additional) (point|argument)|a new reason|another reason|i also want to add|additionally.*my point/i.test(text);
        if (hasNewArg) return { msg: 'No new arguments in rebuttal rounds. Respond and summarize instead.', fixes: [
            { label: '+ Summarize your case', text: ' For all these reasons, my side wins because ' },
            { label: '+ Respond to their point', text: ' The AI claimed, but this fails because ' }
        ]};
    }

    return null;
}

function showFixSuggestions(result, currentText) {
    const bar = document.getElementById('fix-bar');
    let chipsHtml = result.fixes.map(f =>
        `<button class="fix-chip" onclick="applyFix(${f.replace ? 'true' : 'false'}, '${f.text.replace(/'/g, "\\'")}')">${f.label}</button>`
    ).join('');

    bar.innerHTML = `<div class="fix-bar-title">Fix needed</div><div class="fix-bar-msg">${result.msg}</div><div class="fix-suggestions">${chipsHtml}</div>`;
    bar.classList.remove('hidden');
}

function applyFix(replace, text) {
    const input = document.getElementById('debate-input');
    if (replace) {
        input.value = text;
    } else {
        input.value = input.value.trimEnd() + text;
    }
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    document.getElementById('char-count').textContent = input.value.length;
    hideFixBar();
}

function hideFixBar() {
    document.getElementById('fix-bar').classList.add('hidden');
}

function submitArgument() {
    const input = document.getElementById('debate-input');
    const text = input.value.trim();
    if (!text) return;

    const validationResult = validateArgument(text);
    if (validationResult) {
        showFixSuggestions(validationResult, text);
        input.focus();
        return;
    }
    hideFixBar();

    // Stop recording if active
    if (state.isRecording && state.recognition) {
        state.recognition.stop();
        state.isRecording = false;
        const voiceBtn = document.getElementById('voice-btn');
        if (voiceBtn) voiceBtn.classList.remove('recording');
    }

    stopTimer();
    input.disabled = true;
    document.getElementById('send-btn').disabled = true;

    addBubble(text, 'user');
    state.userArgs.push(text);
    input.value = '';
    document.getElementById('char-count').textContent = '0';

    document.getElementById('hint-bar').className = 'hint-bar';
    document.getElementById('hint-bar').innerHTML = '';

    showTyping();
    const delay = 1000 + Math.random() * 1500;

    setTimeout(() => {
        removeTyping();
        const aiSide = state.side === 'for' ? 'against' : 'for';
        const aiResponse = getAIResponse(state.topic, aiSide, state.round, text, state.skill);
        addBubble(aiResponse, 'ai');
        state.aiArgs.push(aiResponse);

        state.round++;

        if (state.round > state.maxRounds) {
            setTimeout(() => {
                addSystemMsg('The debate is over! Let\'s see how you did...');
                setTimeout(() => showResults(), 1500);
            }, 500);
        } else {
            const nextRound = state.roundTypes[state.round - 1];
            if (nextRound) {
                addSystemMsg(`Round ${state.round}: ${nextRound.label} — ${nextRound.desc}`);
            }
            updateRoundDisplay();
            showHint();
            startTimer();
            input.disabled = false;
            document.getElementById('send-btn').disabled = false;
            input.focus();
        }
    }, delay);
}

// ========== RESULTS ==========
function showResults() {
    stopTimer();
    const scores = scoreDebate();
    const total = scores.clarity + scores.evidence + scores.persuasion + scores.rebuttal;
    const maxTotal = 40;
    const pct = Math.round((total / maxTotal) * 100);

    // Determine strongest and weakest areas
    const scoreEntries = [
        { name: 'Clarity', val: scores.clarity },
        { name: 'Evidence', val: scores.evidence },
        { name: 'Persuasion', val: scores.persuasion },
        { name: 'Rebuttal', val: scores.rebuttal }
    ];
    const strongest = scoreEntries.reduce((a, b) => b.val > a.val ? b : a);
    const weakest = scoreEntries.reduce((a, b) => b.val < a.val ? b : a);

    const pName = profile ? profile.name : 'You';
    const newRank = getRank(stats.total + 1);
    const oldRank = getRank(stats.total);
    const rankUp = newRank !== oldRank;

    let result, winnerEmoji, winnerText, verdict;
    if (pct >= 70) {
        result = 'win';
        winnerEmoji = '\u{1F3C6}';
        winnerText = `${pName} wins!`;
        verdict = `${pName} won because the arguments were well-structured and backed by evidence. Strongest area: ${strongest.name.toLowerCase()} (${strongest.val}/10). The AI couldn't overcome the strength of the case on "${state.topic}."`;
    } else if (pct >= 45) {
        result = 'tie';
        winnerEmoji = '\u{1F91D}';
        winnerText = 'Too close to call!';
        verdict = `Close debate on "${state.topic}." ${pName}'s ${strongest.name.toLowerCase()} was solid (${strongest.val}/10), but ${weakest.name.toLowerCase()} (${weakest.val}/10) let the AI stay competitive. Focus on ${weakest.name.toLowerCase()} next time.`;
    } else {
        result = 'loss';
        winnerEmoji = '\u{1F916}';
        winnerText = 'The AI wins this round.';
        verdict = `The AI won because ${pName}'s arguments on "${state.topic}" lacked ${weakest.val <= 3 ? weakest.name.toLowerCase() : 'overall strength'}. ${weakest.name} scored only ${weakest.val}/10 — ${weakest.name === 'Evidence' ? 'more facts, statistics, and examples needed' : weakest.name === 'Rebuttal' ? 'not enough engagement with the AI\'s arguments' : weakest.name === 'Persuasion' ? 'language needed more conviction and impact' : 'arguments needed better structure'}. The AI had stronger evidence.`;
    }
    if (rankUp) verdict += `\n\nRank up! ${pName} is now a ${newRank}.`;

    // Update stats
    if (result === 'win') stats.wins++;
    else if (result === 'loss') stats.losses++;
    else stats.ties++;
    stats.total++;
    saveStats();
    updateNavStats();
    updateStatsSummary();

    // Save to history
    history.unshift({
        topic: state.topic,
        side: state.side,
        skill: state.skill,
        age: state.age,
        result: result,
        pct: pct,
        scores: { ...scores },
        date: new Date().toISOString()
    });
    if (history.length > 50) history.pop();
    saveHistory();

    // Render results
    const card = document.getElementById('results-card');
    card.innerHTML = `<span class="winner-emoji">${winnerEmoji}</span><div class="winner-text">${winnerText}</div><div class="score-summary">Your score: ${total}/${maxTotal} (${pct}%)</div><div class="verdict">${verdict}</div>`;

    const breakdown = document.getElementById('score-breakdown');
    function scoreClass(s) { return s >= 7 ? 'good' : s >= 4 ? 'ok' : 'needs-work'; }
    function scoreBar(label, value) {
        const cls = scoreClass(value);
        return `<div class="score-row"><span class="score-label">${label}</span><div class="score-bar-wrap"><div class="score-bar-fill ${cls}" style="width:${value * 10}%"></div></div><span class="score-value ${cls}">${value}/10</span></div>`;
    }
    breakdown.innerHTML = `<h3>Score Breakdown</h3>${scoreBar('Clarity', scores.clarity)}${scoreBar('Evidence & Examples', scores.evidence)}${scoreBar('Persuasiveness', scores.persuasion)}${scoreBar('Rebuttal', scores.rebuttal)}`;

    const feedback = getFeedback(scores);
    document.getElementById('feedback-section').innerHTML = `<h3>Coach's Feedback</h3>` + feedback.map(f => `<div class="feedback-item">${f}</div>`).join('');

    // Reset feedback widget
    document.getElementById('feedback-faces').style.display = 'flex';
    document.getElementById('feedback-thankyou').classList.add('hidden');
    document.querySelectorAll('.face-btn').forEach(b => {
        b.classList.remove('selected', 'faded');
    });

    showScreen('results');
}

// ========== FEEDBACK ==========
function submitFeedback(rating, btn) {
    // Highlight selected, fade others
    document.querySelectorAll('.face-btn').forEach(b => {
        b.classList.remove('selected', 'faded');
        if (b === btn) {
            b.classList.add('selected');
        } else {
            b.classList.add('faded');
        }
    });

    // Save to last history entry
    if (history.length > 0) {
        history[0].feedback = rating;
        saveHistory();
    }

    // Show thank you after a moment
    setTimeout(() => {
        document.getElementById('feedback-faces').style.display = 'none';
        document.getElementById('feedback-thankyou').classList.remove('hidden');
    }, 800);

    showToast('Thanks for your feedback!');
}

function rematch() {
    state.round = 0;
    state.userArgs = [];
    state.aiArgs = [];
    state.scores = { clarity: 0, evidence: 0, persuasion: 0, rebuttal: 0 };
    pickSide(state.side);
}

function newDebate() {
    state.round = 0;
    state.userArgs = [];
    state.aiArgs = [];
    state.scores = { clarity: 0, evidence: 0, persuasion: 0, rebuttal: 0 };
    state.topic = null;
    state.side = null;
    setRandomTagline();
    navigateTo('home');
    showStep('step-age');
}

// ========== HISTORY PAGE ==========
function renderHistory() {
    const list = document.getElementById('history-list');
    const empty = document.getElementById('history-empty');
    const statsRow = document.getElementById('history-stats-row');

    if (history.length === 0) {
        list.style.display = 'none';
        statsRow.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    list.style.display = 'flex';
    statsRow.style.display = 'grid';

    const winRate = stats.total > 0 ? Math.round((stats.wins / stats.total) * 100) : 0;
    const avgScore = history.length > 0 ? Math.round(history.reduce((a, h) => a + h.pct, 0) / history.length) : 0;

    statsRow.innerHTML = `
        <div class="history-stat-card"><span class="history-stat-num" style="color:var(--neon-cyan)">${stats.wins}</span><span class="history-stat-label">Wins</span></div>
        <div class="history-stat-card"><span class="history-stat-num" style="color:var(--neon-pink)">${stats.losses}</span><span class="history-stat-label">Losses</span></div>
        <div class="history-stat-card"><span class="history-stat-num" style="color:var(--neon-yellow)">${winRate}%</span><span class="history-stat-label">Win Rate</span></div>
        <div class="history-stat-card"><span class="history-stat-num" style="color:var(--primary)">${avgScore}%</span><span class="history-stat-label">Avg Score</span></div>
    `;

    list.innerHTML = history.map(h => {
        const emoji = h.result === 'win' ? '\u{1F3C6}' : h.result === 'loss' ? '\u{1F916}' : '\u{1F91D}';
        const d = new Date(h.date);
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `<div class="history-item">
            <div class="history-result-badge ${h.result}">${emoji}</div>
            <div class="history-details">
                <div class="history-topic">${escapeHtml(h.topic)}</div>
                <div class="history-meta">${h.side.toUpperCase()} &middot; ${h.skill} &middot; ${dateStr}</div>
            </div>
            <div class="history-score-col">
                <div class="history-pct ${h.result}">${h.pct}%</div>
            </div>
        </div>`;
    }).join('');
}

// ========== INPUT EVENTS ==========
document.getElementById('debate-input').addEventListener('input', function() {
    document.getElementById('char-count').textContent = this.value.length;
});

document.getElementById('debate-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitArgument();
    }
});

// ========== PARTICLES ==========
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const CONNECT_DIST = 140;
    const colors = ['#7C3AED', '#06D6A0', '#FF006E', '#FB5607', '#FFBE0B'];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.8,
            dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${(1 - dist / CONNECT_DIST) * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha * 0.1; ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
})();
