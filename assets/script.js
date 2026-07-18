// EduHub - Script Tiểu học (Kết nối tri thức)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
let auth = null;
try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
    }
} catch (e) { console.log("Firebase demo mode"); }

const KEYS = {
    topics: 'eduhub_topics',
    videos: 'eduhub_videos',
    docs: 'eduhub_docs',
    users: 'eduhub_users',
    payment: 'eduhub_payment',
    currentUser: 'eduhub_currentUser'
};

const defaultTopics = [
    { id: 1, name: 'Tiếng Việt', desc: 'Đọc – Viết – Nghe – Nói (Kết nối tri thức)', icon: 'fa-book-open' },
    { id: 2, name: 'Toán', desc: 'Số học, hình học cơ bản lớp 1-5', icon: 'fa-calculator' },
    { id: 3, name: 'Tự nhiên và Xã hội', desc: 'Khám phá thế giới xung quanh', icon: 'fa-leaf' },
    { id: 4, name: 'Đạo đức', desc: 'Giáo dục phẩm chất, kỹ năng sống', icon: 'fa-heart' },
    { id: 5, name: 'Tiếng Anh', desc: 'Ngoại ngữ tiểu học', icon: 'fa-language' },
    { id: 6, name: 'Tin học', desc: 'Làm quen máy tính & công nghệ', icon: 'fa-laptop' },
    { id: 7, name: 'Mỹ thuật', desc: 'Vẽ, thủ công, sáng tạo', icon: 'fa-palette' },
    { id: 8, name: 'Âm nhạc', desc: 'Hát, nghe nhạc, nhịp điệu', icon: 'fa-music' }
];

const defaultVideos = [
    { id: 1, title: 'Học chữ cái Tiếng Việt lớp 1', youtubeId: 'dQw4w9wgxcq', duration: '12 phút', topicId: 1 },
    { id: 2, title: 'Đếm số và phép cộng lớp 1-2', youtubeId: '3JZ_D3ELwOQ', duration: '10 phút', topicId: 2 },
    { id: 3, title: 'Khám phá thiên nhiên quanh ta', youtubeId: 'kXYiU_JCYtU', duration: '15 phút', topicId: 3 }
];

const defaultDocs = [
    { id: 1, title: 'Bài tập Tiếng Việt lớp 1 - Kết nối tri thức', pages: '28 trang', code: 'TVLOP1', url: '', topicId: 1 },
    { id: 2, title: 'Toán lớp 2 - Phép cộng trừ trong phạm vi 100', pages: '32 trang', code: 'TOAN2', url: '', topicId: 2 },
    { id: 3, title: 'Tự nhiên và Xã hội lớp 3', pages: '24 trang', code: 'TNXH3', url: '', topicId: 3 }
];

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function initData() {
    const DATA_VERSION = 2;
    if (getData('eduhub_data_version') !== DATA_VERSION) {
        localStorage.removeItem(KEYS.topics);
        localStorage.removeItem(KEYS.videos);
        localStorage.removeItem(KEYS.docs);
        setData('eduhub_data_version', DATA_VERSION);
    }
    if (!getData(KEYS.topics)) setData(KEYS.topics, defaultTopics);
    if (!getData(KEYS.videos)) setData(KEYS.videos, defaultVideos);
    if (!getData(KEYS.docs)) setData(KEYS.docs, defaultDocs);
    if (!getData(KEYS.users)) setData(KEYS.users, []);
    if (!getData(KEYS.payment)) {
        setData(KEYS.payment, { bank: 'Vietcombank', account: '0123456789', name: 'EduHub', content: 'EDUHUB' });
    }
}
function extractYoutubeId(input) {
    if (!input) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = input.match(regExp);
    if (match && match[2].length === 11) return match[2];
    if (input.length === 11) return input;
    return input.trim();
}
function getTopicName(topicId) {
    const topics = getData(KEYS.topics) || [];
    const t = topics.find(x => x.id == topicId);
    return t ? t.name : 'Chưa phân loại';
}
function loginWithGoogle() {
    if (!auth) {
        const demoUser = { uid: 'demo_' + Date.now(), displayName: 'Học sinh Demo', email: 'demo@gmail.com', photoURL: 'https://ui-avatars.com/api/?name=HS+Demo&background=6366f1&color=fff' };
        setData(KEYS.currentUser, demoUser);
        let users = getData(KEYS.users) || [];
        if (!users.find(u => u.email === demoUser.email)) {
            users.push({ ...demoUser, loginAt: new Date().toISOString() });
            setData(KEYS.users, users);
        }
        updateUIAfterLogin(demoUser);
        alert('Đăng nhập Demo thành công!');
        return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        const userData = { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL };
        setData(KEYS.currentUser, userData);
        let users = getData(KEYS.users) || [];
        if (!users.find(u => u.uid === user.uid)) {
            users.push({ ...userData, loginAt: new Date().toISOString() });
            setData(KEYS.users, users);
        }
        updateUIAfterLogin(userData);
    }).catch((error) => alert('Lỗi: ' + error.message));
}
function logout() {
    if (auth) auth.signOut();
    localStorage.removeItem(KEYS.currentUser);
    location.reload();
}
function updateUIAfterLogin(user) {
    const btnLogin = document.getElementById('btnLogin');
    const userInfo = document.getElementById('userInfo');
    if (btnLogin) btnLogin.classList.add('hidden');
    if (userInfo) {
        userInfo.classList.remove('hidden');
        userInfo.classList.add('flex');
        document.getElementById('userName').textContent = user.displayName || user.email;
        document.getElementById('userAvatar').src = user.photoURL || 'https://ui-avatars.com/api/?name=User';
    }
}
function renderHomepage() {
    const topics = getData(KEYS.topics) || [];
    const topicsList = document.getElementById('topicsList');
    if (topicsList) {
        const colors = ['bg-rose-100 text-rose-600','bg-sky-100 text-sky-600','bg-emerald-100 text-emerald-600','bg-amber-100 text-amber-600','bg-violet-100 text-violet-600','bg-cyan-100 text-cyan-600','bg-pink-100 text-pink-600','bg-indigo-100 text-indigo-600'];
        topicsList.innerHTML = topics.map((t,i) => `
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover text-center">
                <div class="w-14 h-14 ${colors[i%colors.length]} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    <i class="fas ${t.icon || 'fa-folder'}"></i>
                </div>
                <h3 class="font-bold text-lg mb-1">${t.name}</h3>
                <p class="text-sm text-gray-500">${t.desc || ''}</p>
            </div>
        `).join('');
    }
    const videos = getData(KEYS.videos) || [];
    const videosList = document.getElementById('videosList');
    if (videosList) {
        videosList.innerHTML = videos.map(v => `
            <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover">
                <div class="aspect-video bg-black">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${v.youtubeId}" title="${v.title}" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="p-5">
                    <div class="text-xs text-indigo-600 font-semibold mb-1">${getTopicName(v.topicId)}</div>
                    <h3 class="font-bold text-lg mb-1">${v.title}</h3>
                    <p class="text-sm text-gray-500">${v.duration || ''}</p>
                </div>
            </div>
        `).join('');
    }
    const docs = getData(KEYS.docs) || [];
    const docsList = document.getElementById('docsList');
    if (docsList) {
        docsList.innerHTML = docs.map(d => `
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 card-hover">
                <div class="h-36 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl mb-5 flex items-center justify-center text-5xl">📘</div>
                <div class="text-xs text-indigo-600 font-semibold mb-1">${getTopicName(d.topicId)}</div>
                <h3 class="font-bold mb-1">${d.title}</h3>
                <p class="text-sm text-gray-500 mb-4">${d.pages || ''}</p>
                <input type="text" id="code-${d.id}" placeholder="Nhập mã tải (vd: ${d.code})" class="w-full border rounded-xl px-4 py-2.5 mb-3 text-sm">
                <button onclick="downloadDoc(${d.id}, '${d.code}')" class="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold transition">Tải về</button>
            </div>
        `).join('');
    }
}
function downloadDoc(id, correctCode) {
    const input = document.getElementById('code-' + id);
    if (input && input.value.trim().toUpperCase() === correctCode.toUpperCase()) {
        alert('✅ Mã đúng! Tài liệu đang được tải...');
    } else {
        alert('❌ Mã không đúng. Vui lòng nhập lại.');
    }
}
let snakeInterval = null;
function startSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const grid = 14;
    const tile = canvas.width / grid;
    let snake = [{x: 7, y: 7}], dx = 1, dy = 0, food = {x: 10, y: 10}, score = 0, gameOver = false;
    function draw() {
        ctx.fillStyle = '#111'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ef4444'; ctx.fillRect(food.x * tile, food.y * tile, tile - 2, tile - 2);
        ctx.fillStyle = '#22c55e'; snake.forEach(p => ctx.fillRect(p.x * tile, p.y * tile, tile - 2, tile - 2));
    }
    function update() {
        if (gameOver) return;
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        if (head.x < 0 || head.x >= grid || head.y < 0 || head.y >= grid || snake.some(p => p.x === head.x && p.y === head.y)) {
            gameOver = true; clearInterval(snakeInterval); alert('Game Over! Điểm: ' + score); return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) { score += 10; food = { x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid) }; }
        else snake.pop();
        draw();
    }
    document.onkeydown = (e) => {
        if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
        if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
        if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
        if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
    };
    if (snakeInterval) clearInterval(snakeInterval);
    snakeInterval = setInterval(update, 140);
    draw();
}
function showTab(name) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const panel = document.getElementById('panel-' + name);
    const btn = document.getElementById('tab-' + name);
    if (panel) panel.classList.remove('hidden');
    if (btn) btn.classList.add('active');
}
function loadAdminData() {
    const topics = getData(KEYS.topics) || [];
    const videos = getData(KEYS.videos) || [];
    const docs = getData(KEYS.docs) || [];
    const users = getData(KEYS.users) || [];
    if (document.getElementById('statTopics')) {
        document.getElementById('statTopics').textContent = topics.length;
        document.getElementById('statVideos').textContent = videos.length;
        document.getElementById('statDocs').textContent = docs.length;
        document.getElementById('statUsers').textContent = users.length;
    }
    const topicsEl = document.getElementById('adminTopicsList');
    if (topicsEl) {
        topicsEl.innerHTML = topics.length ? topics.map(t => `
            <div class="bg-white rounded-xl p-4 border flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center"><i class="fas ${t.icon || 'fa-folder'}"></i></div>
                    <div><div class="font-medium">${t.name}</div><div class="text-sm text-gray-500">${t.desc || ''}</div></div>
                </div>
                <div class="flex gap-2">
                    <button onclick="editTopic(${t.id})" class="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm"><i class="fas fa-edit"></i> Sửa</button>
                    <button onclick="deleteItem('topics', ${t.id})" class="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm"><i class="fas fa-trash"></i></button>
                </div>
            </div>`).join('') : '<p class="text-gray-500">Chưa có môn học.</p>';
    }
    const videoSelect = document.getElementById('videoTopic');
    const docSelect = document.getElementById('docTopic');
    const options = '<option value="">-- Chọn môn học --</option>' + topics.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    if (videoSelect) videoSelect.innerHTML = options;
    if (docSelect) docSelect.innerHTML = options;
    const videosEl = document.getElementById('adminVideosList');
    if (videosEl) {
        videosEl.innerHTML = videos.length ? videos.map(v => `
            <div class="bg-white rounded-xl p-4 border flex items-center justify-between">
                <div><div class="font-medium">${v.title}</div><div class="text-sm text-gray-500">${getTopicName(v.topicId)} • ${v.youtubeId}</div></div>
                <div class="flex gap-2">
                    <button onclick="editVideo(${v.id})" class="text-blue-600 px-3 py-1.5 rounded-lg text-sm">Sửa</button>
                    <button onclick="deleteItem('videos', ${v.id})" class="text-red-500 px-3 py-1.5 rounded-lg text-sm">Xóa</button>
                </div>
            </div>`).join('') : '<p class="text-gray-500">Chưa có video.</p>';
    }
    const docsEl = document.getElementById('adminDocsList');
    if (docsEl) {
        docsEl.innerHTML = docs.length ? docs.map(d => `
            <div class="bg-white rounded-xl p-4 border flex items-center justify-between">
                <div><div class="font-medium">${d.title}</div><div class="text-sm text-gray-500">Mã: <code>${d.code}</code></div></div>
                <div class="flex gap-2">
                    <button onclick="editDoc(${d.id})" class="text-blue-600 px-3 py-1.5 rounded-lg text-sm">Sửa</button>
                    <button onclick="deleteItem('docs', ${d.id})" class="text-red-500 px-3 py-1.5 rounded-lg text-sm">Xóa</button>
                </div>
            </div>`).join('') : '<p class="text-gray-500">Chưa có tài liệu.</p>';
    }
    const usersEl = document.getElementById('adminUsersList');
    if (usersEl) {
        usersEl.innerHTML = users.length ? users.map(u => `
            <div class="flex items-center gap-3 p-3 border rounded-xl">
                <img src="${u.photoURL || 'https://ui-avatars.com/api/?name=User'}" class="w-10 h-10 rounded-full">
                <div><div class="font-medium">${u.displayName || ''}</div><div class="text-sm text-gray-500">${u.email}</div></div>
            </div>`).join('') : '<p class="text-gray-500">Chưa có người dùng.</p>';
    }
    const pay = getData(KEYS.payment);
    if (pay) {
        ['payBank','payAccount','payName','payContent'].forEach((id,i) => {
            const el = document.getElementById(id);
            if (el) el.value = [pay.bank, pay.account, pay.name, pay.content][i] || '';
        });
    }
    const current = getData(KEYS.currentUser);
    if (current && document.getElementById('adminUser')) document.getElementById('adminUser').textContent = current.displayName || current.email;
}
function saveTopic() {
    const name = document.getElementById('topicName').value.trim();
    const desc = document.getElementById('topicDesc').value.trim();
    const icon = document.getElementById('topicIcon').value.trim() || 'fa-folder';
    const editId = document.getElementById('topicEditId').value;
    if (!name) return alert('Nhập tên môn học');
    let topics = getData(KEYS.topics) || [];
    if (editId) {
        const idx = topics.findIndex(t => t.id == editId);
        if (idx !== -1) { topics[idx] = { ...topics[idx], name, desc, icon }; setData(KEYS.topics, topics); alert('Đã cập nhật!'); }
    } else {
        const id = topics.length ? Math.max(...topics.map(t => t.id)) + 1 : 1;
        topics.push({ id, name, desc, icon }); setData(KEYS.topics, topics); alert('Đã thêm môn học!');
    }
    cancelEditTopic(); loadAdminData();
}
function editTopic(id) {
    const t = (getData(KEYS.topics) || []).find(x => x.id == id);
    if (!t) return;
    document.getElementById('topicEditId').value = t.id;
    document.getElementById('topicName').value = t.name;
    document.getElementById('topicDesc').value = t.desc || '';
    document.getElementById('topicIcon').value = t.icon || 'fa-folder';
    document.getElementById('topicFormTitle').textContent = 'Sửa môn học';
    document.getElementById('topicBtnText').textContent = 'Cập nhật';
    document.getElementById('btnCancelTopic').classList.remove('hidden');
}
function cancelEditTopic() {
    document.getElementById('topicEditId').value = '';
    document.getElementById('topicName').value = '';
    document.getElementById('topicDesc').value = '';
    document.getElementById('topicIcon').value = 'fa-folder';
    document.getElementById('topicFormTitle').textContent = 'Thêm môn học mới';
    document.getElementById('topicBtnText').textContent = 'Thêm môn học';
    document.getElementById('btnCancelTopic').classList.add('hidden');
}
function saveVideo() {
    const title = document.getElementById('videoTitle').value.trim();
    let youtubeInput = document.getElementById('videoId').value.trim();
    const duration = document.getElementById('videoDuration').value.trim();
    const topicId = document.getElementById('videoTopic').value || null;
    const editId = document.getElementById('videoEditId').value;
    if (!title || !youtubeInput) return alert('Nhập tiêu đề và YouTube ID');
    const youtubeId = extractYoutubeId(youtubeInput);
    let videos = getData(KEYS.videos) || [];
    if (editId) {
        const idx = videos.findIndex(v => v.id == editId);
        if (idx !== -1) { videos[idx] = { ...videos[idx], title, youtubeId, duration, topicId: topicId ? Number(topicId) : null }; setData(KEYS.videos, videos); alert('Đã cập nhật!'); }
    } else {
        const id = videos.length ? Math.max(...videos.map(v => v.id)) + 1 : 1;
        videos.push({ id, title, youtubeId, duration, topicId: topicId ? Number(topicId) : null }); setData(KEYS.videos, videos); alert('Đã thêm video!');
    }
    cancelEditVideo(); loadAdminData();
}
function editVideo(id) {
    const v = (getData(KEYS.videos) || []).find(x => x.id == id);
    if (!v) return;
    document.getElementById('videoEditId').value = v.id;
    document.getElementById('videoTitle').value = v.title;
    document.getElementById('videoId').value = v.youtubeId;
    document.getElementById('videoDuration').value = v.duration || '';
    document.getElementById('videoTopic').value = v.topicId || '';
    document.getElementById('videoFormTitle').textContent = 'Sửa video';
    document.getElementById('videoBtnText').textContent = 'Cập nhật';
    document.getElementById('btnCancelVideo').classList.remove('hidden');
}
function cancelEditVideo() {
    document.getElementById('videoEditId').value = '';
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoId').value = '';
    document.getElementById('videoDuration').value = '';
    document.getElementById('videoTopic').value = '';
    document.getElementById('videoFormTitle').textContent = 'Thêm video YouTube';
    document.getElementById('videoBtnText').textContent = 'Thêm Video';
    document.getElementById('btnCancelVideo').classList.add('hidden');
}
function saveDoc() {
    const title = document.getElementById('docTitle').value.trim();
    const pages = document.getElementById('docPages').value.trim();
    let code = document.getElementById('docCode').value.trim();
    const url = document.getElementById('docUrl').value.trim();
    const topicId = document.getElementById('docTopic').value || null;
    const editId = document.getElementById('docEditId').value;
    if (!title) return alert('Nhập tên tài liệu');
    if (!code) code = Math.random().toString(36).substring(2, 8).toUpperCase();
    let docs = getData(KEYS.docs) || [];
    if (editId) {
        const idx = docs.findIndex(d => d.id == editId);
        if (idx !== -1) { docs[idx] = { ...docs[idx], title, pages, code, url, topicId: topicId ? Number(topicId) : null }; setData(KEYS.docs, docs); alert('Đã cập nhật!'); }
    } else {
        const id = docs.length ? Math.max(...docs.map(d => d.id)) + 1 : 1;
        docs.push({ id, title, pages, code, url, topicId: topicId ? Number(topicId) : null }); setData(KEYS.docs, docs); alert('Đã thêm! Mã: ' + code);
    }
    cancelEditDoc(); loadAdminData();
}
function editDoc(id) {
    const d = (getData(KEYS.docs) || []).find(x => x.id == id);
    if (!d) return;
    document.getElementById('docEditId').value = d.id;
    document.getElementById('docTitle').value = d.title;
    document.getElementById('docPages').value = d.pages || '';
    document.getElementById('docCode').value = d.code || '';
    document.getElementById('docUrl').value = d.url || '';
    document.getElementById('docTopic').value = d.topicId || '';
    document.getElementById('docFormTitle').textContent = 'Sửa tài liệu';
    document.getElementById('docBtnText').textContent = 'Cập nhật';
    document.getElementById('btnCancelDoc').classList.remove('hidden');
}
function cancelEditDoc() {
    document.getElementById('docEditId').value = '';
    document.getElementById('docTitle').value = '';
    document.getElementById('docPages').value = '';
    document.getElementById('docCode').value = '';
    document.getElementById('docUrl').value = '';
    document.getElementById('docTopic').value = '';
    document.getElementById('docFormTitle').textContent = 'Thêm tài liệu';
    document.getElementById('docBtnText').textContent = 'Thêm Tài liệu';
    document.getElementById('btnCancelDoc').classList.add('hidden');
}
function deleteItem(type, id) {
    if (!confirm('Xóa mục này?')) return;
    let data = getData(KEYS[type]) || [];
    data = data.filter(item => item.id != id);
    setData(KEYS[type], data);
    loadAdminData();
}
function savePayment() {
    setData(KEYS.payment, {
        bank: document.getElementById('payBank').value,
        account: document.getElementById('payAccount').value,
        name: document.getElementById('payName').value,
        content: document.getElementById('payContent').value
    });
    alert('Đã lưu!');
}
document.addEventListener('DOMContentLoaded', () => {
    initData();
    const current = getData(KEYS.currentUser);
    if (current) updateUIAfterLogin(current);
    if (document.getElementById('topicsList')) renderHomepage();
});
