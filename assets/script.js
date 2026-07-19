// EduHub Giao vien Tieu hoc - Full Script
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
} catch (e) { console.log("Firebase demo"); }

const KEYS = {
    subjects: 'eduhub_subjects',
    videos: 'eduhub_videos',
    vanBan: 'eduhub_vanban',
    faq: 'eduhub_faq',
    apps: 'eduhub_apps',
    keHoach: 'eduhub_kehoach',
    bieuMau: 'eduhub_bieumau',
    deThi: 'eduhub_dethi',
    sangKien: 'eduhub_sangkien',
    users: 'eduhub_users',
    currentUser: 'eduhub_currentUser',
    payment: 'eduhub_payment'
};

const DATA_VERSION = 5;

const defaultSubjects = [
    { id: 1, name: 'Tieng Viet', desc: 'Giao an, bai giang, de KT', icon: 'fa-book-open', color: 'rose' },
    { id: 2, name: 'Toan', desc: 'Giao an, phieu bai tap', icon: 'fa-calculator', color: 'sky' },
    { id: 3, name: 'Tu nhien va Xa hoi', desc: 'Kham pha the gioi quanh ta', icon: 'fa-leaf', color: 'emerald' },
    { id: 4, name: 'Dao duc', desc: 'Pham chat, ky nang song', icon: 'fa-heart', color: 'amber' },
    { id: 5, name: 'Tieng Anh', desc: 'Ngoai ngu tieu hoc', icon: 'fa-language', color: 'violet' },
    { id: 6, name: 'Tin hoc', desc: 'Cong nghe & may tinh', icon: 'fa-laptop', color: 'cyan' },
    { id: 7, name: 'My thuat', desc: 'Ve, thu cong, sang tao', icon: 'fa-palette', color: 'pink' },
    { id: 8, name: 'Am nhac', desc: 'Hat, nhac cu, nhip dieu', icon: 'fa-music', color: 'indigo' },
    { id: 9, name: 'GD The chat', desc: 'Van dong, suc khoe', icon: 'fa-running', color: 'orange' },
    { id: 10, name: 'HD Trai nghiem', desc: 'STEM, hoat dong ngoai khoa', icon: 'fa-hands-helping', color: 'teal' }
];

const defaultVideos = [
    { id: 1, title: 'Bai doc: Chuot nha va chuot dong - TV lop 1', youtubeId: '8_hhplvTTpM', duration: '2:33', subjectId: 1 },
    { id: 2, title: 'Bai doc: Kien va de men - TV lop 1', youtubeId: 'aa_9p3gRT8Y', duration: '2:18', subjectId: 1 },
    { id: 3, title: 'Bai hat: Loi chao di truoc - TV lop 1', youtubeId: 'OEtFE6GzT74', duration: '3:24', subjectId: 1 },
    { id: 4, title: 'Nhac tri nho: Cay bang va lop hoc', youtubeId: 'f2fIi95F50U', duration: '2:26', subjectId: 1 },
    { id: 5, title: 'Bai doc: Bai hoc dau tien cua tho con', youtubeId: 'X9GkCQ9tthY', duration: '2:08', subjectId: 1 },
    { id: 6, title: 'Nhac tri nho: Gio ra choi', youtubeId: '8IvTNBAJxXs', duration: '2:20', subjectId: 1 }
];

const defaultVanBan = [
    { id: 1, title: 'Cong van 3898/BGDDT-GDTH huong dan nhiem vu GD tieu hoc 2024-2025', type: 'Cong van', year: '2024' },
    { id: 2, title: 'Thong tu 27/2020/TT-BGDDT quy dinh danh gia hoc sinh tieu hoc', type: 'Thong tu', year: '2020' },
    { id: 3, title: 'Thong tu 05/2025/TT-BGDDT ve dinh muc tiet day giao vien', type: 'Thong tu', year: '2025' },
    { id: 4, title: 'Cong van 2345/BGDDT-GDTH huong dan xay dung ke hoach bai day', type: 'Cong van', year: '2021' },
    { id: 5, title: 'Thong tu 32/2018/TT-BGDDT Chuong trinh GDPT 2018', type: 'Thong tu', year: '2018' }
];

const defaultFaq = [
    { id: 1, q: 'Dinh muc tiet day cua giao vien tieu hoc hien nay la bao nhieu?', a: 'Theo Thong tu 05/2025/TT-BGDDT: Giao vien truong tieu hoc la 23 tiet/tuan. Giao vien truong PTDTBT tieu hoc va truong danh cho nguoi khuyet tat la 21 tiet/tuan.' },
    { id: 2, q: 'Giao an co bat buoc theo mau co dinh khong?', a: 'Khong. Theo huong dan cua Bo, giao vien chu dong, linh hoat xay dung ke hoach bai day phu hop voi hoc sinh va dieu kien thuc te, tranh khuon mau hinh thuc.' },
    { id: 3, q: 'Danh gia hoc sinh tieu hoc theo quy dinh nao?', a: 'Thuc hien theo Thong tu 27/2020/TT-BGDDT. Danh gia bang nhan xet, ket hop danh gia thuong xuyen va dinh ky, theo pham chat va nang luc.' },
    { id: 4, q: 'Long ghep giao duc quoc phong an ninh o tieu hoc nhu the nao?', a: 'Thuc hien theo Thong tu 08/2024/TT-BGDDT. Long ghep trong cac mon Tieng Viet, TNXH, Dao duc, Lich su-Dia li, Nghe thuat, HDTN. Noi dung ngan gon, phu hop lua tuoi.' }
];

const defaultApps = [
    { id: 1, name: 'Canva', desc: 'Thiet ke slide, phieu bai tap, poster dep', icon: 'fa-palette', url: 'https://canva.com' },
    { id: 2, name: 'Wordwall', desc: 'Tao tro choi hoc tap tuong tac nhanh', icon: 'fa-gamepad', url: 'https://wordwall.net' },
    { id: 3, name: 'Kahoot', desc: 'Quiz tuong tac, kiem tra vui nhon', icon: 'fa-question-circle', url: 'https://kahoot.com' },
    { id: 4, name: 'Quizizz', desc: 'Bai kiem tra online, giao bai ve nha', icon: 'fa-list-check', url: 'https://quizizz.com' },
    { id: 5, name: 'ChatGPT / Gemini', desc: 'Ho tro soan giao an, viet nhan xet', icon: 'fa-robot', url: '#' },
    { id: 6, name: 'Mentimeter', desc: 'Khao sat y kien hoc sinh thoi gian thuc', icon: 'fa-chart-bar', url: 'https://mentimeter.com' },
    { id: 7, name: 'Google Classroom', desc: 'Quan ly lop, giao bai, thu bai', icon: 'fa-chalkboard', url: 'https://classroom.google.com' },
    { id: 8, name: 'Padlet', desc: 'Bang tuong tac, chia se y tuong', icon: 'fa-table-cells', url: 'https://padlet.com' }
];

const defaultKeHoach = [
    { id: 1, title: 'Ke hoach giao duc nha truong nam hoc 2025-2026', type: 'Nam hoc' },
    { id: 2, title: 'Phan phoi chuong trinh Tieng Viet lop 1-5 (KNTT)', type: 'Phan phoi' },
    { id: 3, title: 'Ke hoach bai day mau theo Cong van 2345', type: 'Mau' }
];

const defaultBieuMau = [
    { id: 1, title: 'Mau so dau bai tieu hoc', type: 'So sach' },
    { id: 2, title: 'Mau nhan xet hoc sinh theo TT27', type: 'Nhan xet' },
    { id: 3, title: 'Mau bao cao chuyen mon cuoi hoc ky', type: 'Bao cao' },
    { id: 4, title: 'Mau ke hoach bai day (giao an)', type: 'Giao an' }
];

const defaultDeThi = [
    { id: 1, title: 'De kiem tra giua ky 1 Tieng Viet lop 1', mon: 'Tieng Viet', lop: '1' },
    { id: 2, title: 'De kiem tra cuoi ky 1 Toan lop 2', mon: 'Toan', lop: '2' },
    { id: 3, title: 'De kiem tra giua ky 2 Tieng Viet lop 3', mon: 'Tieng Viet', lop: '3' }
];

const defaultSangKien = [
    { id: 1, title: 'Ren ky nang doc cho hoc sinh lop 1 qua tro choi', mon: 'Tieng Viet' },
    { id: 2, title: 'Su dung Wordwall nang cao hung thu hoc Toan', mon: 'Toan' },
    { id: 3, title: 'To chuc hoat dong trai nghiem STEM o tieu hoc', mon: 'HDTN' }
];

function getData(key) {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : null;
}
function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function initData() {
    if (getData('eduhub_data_version') !== DATA_VERSION) {
        Object.values(KEYS).forEach(k => {
            if (k !== KEYS.currentUser && k !== KEYS.users) localStorage.removeItem(k);
        });
        setData('eduhub_data_version', DATA_VERSION);
    }
    if (!getData(KEYS.subjects)) setData(KEYS.subjects, defaultSubjects);
    if (!getData(KEYS.videos)) setData(KEYS.videos, defaultVideos);
    if (!getData(KEYS.vanBan)) setData(KEYS.vanBan, defaultVanBan);
    if (!getData(KEYS.faq)) setData(KEYS.faq, defaultFaq);
    if (!getData(KEYS.apps)) setData(KEYS.apps, defaultApps);
    if (!getData(KEYS.keHoach)) setData(KEYS.keHoach, defaultKeHoach);
    if (!getData(KEYS.bieuMau)) setData(KEYS.bieuMau, defaultBieuMau);
    if (!getData(KEYS.deThi)) setData(KEYS.deThi, defaultDeThi);
    if (!getData(KEYS.sangKien)) setData(KEYS.sangKien, defaultSangKien);
    if (!getData(KEYS.users)) setData(KEYS.users, []);
}

function getSubjectName(id) {
    const s = (getData(KEYS.subjects) || []).find(x => x.id == id);
    return s ? s.name : '';
}

function renderHomepage() {
    const subjects = getData(KEYS.subjects) || [];
    const colors = {
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
        sky: 'bg-sky-50 text-sky-600 border-sky-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        violet: 'bg-violet-50 text-violet-600 border-violet-100',
        cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
        pink: 'bg-pink-50 text-pink-600 border-pink-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        teal: 'bg-teal-50 text-teal-600 border-teal-100'
    };
    const el = document.getElementById('subjectsList');
    if (el) {
        el.innerHTML = subjects.map(s => `
            <div class="bg-white border rounded-2xl p-5 card-hover cursor-pointer ${colors[s.color] || 'bg-slate-50'} border">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-3 bg-white/80">
                    <i class="fas ${s.icon}"></i>
                </div>
                <h3 class="font-bold text-slate-900">${s.name}</h3>
                <p class="text-xs text-slate-500 mt-1">${s.desc}</p>
            </div>
        `).join('');
    }

    const vb = getData(KEYS.vanBan) || [];
    const vbEl = document.getElementById('vanBanList');
    if (vbEl) {
        vbEl.innerHTML = vb.map(v => `
            <div class="bg-white border border-slate-100 rounded-xl p-4 flex gap-3 card-hover">
                <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div>
                    <div class="text-xs text-amber-600 font-semibold">${v.type} · ${v.year}</div>
                    <div class="font-medium text-sm text-slate-800 leading-snug">${v.title}</div>
                </div>
            </div>
        `).join('');
    }

    const faq = getData(KEYS.faq) || [];
    const faqEl = document.getElementById('faqList');
    if (faqEl) {
        faqEl.innerHTML = faq.map(f => `
            <details class="bg-white border border-slate-100 rounded-xl p-4 group">
                <summary class="font-semibold text-sm cursor-pointer list-none flex items-start gap-2">
                    <i class="fas fa-chevron-right text-indigo-500 text-xs mt-1 group-open:rotate-90 transition"></i>
                    ${f.q}
                </summary>
                <p class="text-sm text-slate-600 mt-3 pl-5 leading-relaxed">${f.a}</p>
            </details>
        `).join('');
    }

    const videos = getData(KEYS.videos) || [];
    const vEl = document.getElementById('videosList');
    if (vEl) {
        vEl.innerHTML = videos.map(v => `
            <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm card-hover">
                <div class="aspect-video bg-black">
                    <iframe class="w-full h-full" src="https://www.youtube.com/embed/${v.youtubeId}" title="${v.title}" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="p-4">
                    <div class="text-xs text-indigo-600 font-semibold mb-1">${getSubjectName(v.subjectId)}</div>
                    <h3 class="font-bold text-sm leading-snug">${v.title}</h3>
                    <p class="text-xs text-slate-400 mt-1">${v.duration || ''}</p>
                </div>
            </div>
        `).join('');
    }

    const apps = getData(KEYS.apps) || [];
    const aEl = document.getElementById('appsList');
    if (aEl) {
        aEl.innerHTML = apps.map(a => `
            <a href="${a.url}" target="_blank" rel="noopener" class="bg-white border border-slate-100 rounded-2xl p-5 card-hover block">
                <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-3">
                    <i class="fas ${a.icon}"></i>
                </div>
                <h3 class="font-bold">${a.name}</h3>
                <p class="text-xs text-slate-500 mt-1">${a.desc}</p>
            </a>
        `).join('');
    }

    renderSimpleList('keHoachList', getData(KEYS.keHoach) || [], 'fa-calendar-alt', 'sky');
    renderSimpleList('bieuMauList', getData(KEYS.bieuMau) || [], 'fa-folder-open', 'violet');

    const deThi = getData(KEYS.deThi) || [];
    const dtEl = document.getElementById('deThiList');
    if (dtEl) {
        dtEl.innerHTML = deThi.map(d => `
            <div class="bg-white border border-slate-100 rounded-2xl p-5 card-hover">
                <div class="text-xs text-orange-600 font-semibold mb-1">${d.mon} · Lop ${d.lop}</div>
                <h3 class="font-bold text-sm">${d.title}</h3>
            </div>
        `).join('');
    }

    const sk = getData(KEYS.sangKien) || [];
    const skEl = document.getElementById('sangKienList');
    if (skEl) {
        skEl.innerHTML = sk.map(s => `
            <div class="bg-white border border-slate-100 rounded-2xl p-5 card-hover">
                <div class="text-xs text-pink-600 font-semibold mb-1">${s.mon}</div>
                <h3 class="font-bold text-sm">${s.title}</h3>
            </div>
        `).join('');
    }
}

function renderSimpleList(elId, items, icon, color) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = items.map(item => `
        <div class="bg-white border border-slate-100 rounded-2xl p-5 card-hover flex gap-3">
            <div class="w-10 h-10 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center flex-shrink-0">
                <i class="fas ${icon}"></i>
            </div>
            <div>
                <div class="text-xs text-slate-400 font-medium">${item.type || ''}</div>
                <h3 class="font-bold text-sm">${item.title}</h3>
            </div>
        </div>
    `).join('');
}

function loginWithGoogle() {
    if (!auth) {
        const demoUser = { uid: 'demo_' + Date.now(), displayName: 'Giao vien Demo', email: 'gv@demo.com', photoURL: 'https://ui-avatars.com/api/?name=GV+Demo&background=4f46e5&color=fff' };
        setData(KEYS.currentUser, demoUser);
        updateUIAfterLogin(demoUser);
        alert('Dang nhap Demo thanh cong!');
        return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        const u = result.user;
        const userData = { uid: u.uid, displayName: u.displayName, email: u.email, photoURL: u.photoURL };
        setData(KEYS.currentUser, userData);
        updateUIAfterLogin(userData);
    }).catch(e => alert('Loi: ' + e.message));
}
function logout() {
    if (auth) auth.signOut();
    localStorage.removeItem(KEYS.currentUser);
    location.reload();
}
function updateUIAfterLogin(user) {
    const btn = document.getElementById('btnLogin');
    const info = document.getElementById('userInfo');
    if (btn) btn.classList.add('hidden');
    if (info) {
        info.classList.remove('hidden');
        info.classList.add('flex');
        document.getElementById('userName').textContent = user.displayName || user.email;
        document.getElementById('userAvatar').src = user.photoURL || '';
    }
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
    const subjects = getData(KEYS.subjects) || [];
    const videos = getData(KEYS.videos) || [];
    if (document.getElementById('statTopics')) {
        document.getElementById('statTopics').textContent = subjects.length;
        document.getElementById('statVideos').textContent = videos.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initData();
    const current = getData(KEYS.currentUser);
    if (current) updateUIAfterLogin(current);
    if (document.getElementById('subjectsList')) renderHomepage();
    if (document.getElementById('statTopics')) loadAdminData();
});
