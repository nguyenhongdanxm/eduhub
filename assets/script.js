// EduHub Multi-page v11 - Muc luc TV1 KNTT day du
const firebaseConfig={apiKey:"YOUR_API_KEY",authDomain:"YOUR_PROJECT.firebaseapp.com",projectId:"YOUR_PROJECT_ID",storageBucket:"YOUR_PROJECT.appspot.com",messagingSenderId:"YOUR_SENDER_ID",appId:"YOUR_APP_ID"};
let auth=null;try{if(firebaseConfig.apiKey!=="YOUR_API_KEY"){firebase.initializeApp(firebaseConfig);auth=firebase.auth();}}catch(e){}
const KEYS={subjects:'eduhub_subjects',videos:'eduhub_videos',vanBan:'eduhub_vanban',faq:'eduhub_faq',apps:'eduhub_apps',keHoach:'eduhub_kehoach',bieuMau:'eduhub_bieumau',deThi:'eduhub_dethi',sangKien:'eduhub_sangkien',resources:'eduhub_resources',baiHoc:'eduhub_baihoc',users:'eduhub_users',currentUser:'eduhub_currentUser'};
const DATA_VERSION=10;
const defaultSubjects=[{id:1,name:'Tiếng Việt',desc:'Giáo án theo lớp 1–5 · Sách Kết nối tri thức',icon:'fa-book-open',color:'rose'},{id:2,name:'Toán',desc:'Giáo án theo lớp 1–5',icon:'fa-calculator',color:'sky'},{id:3,name:'Tự nhiên và Xã hội',desc:'Khám phá thế giới quanh ta',icon:'fa-leaf',color:'emerald'},{id:4,name:'Đạo đức',desc:'Phẩm chất, kỹ năng sống',icon:'fa-heart',color:'amber'},{id:5,name:'Tiếng Anh',desc:'Ngoại ngữ tiểu học',icon:'fa-language',color:'violet'},{id:6,name:'Tin học',desc:'Công nghệ & máy tính',icon:'fa-laptop',color:'cyan'},{id:7,name:'Mỹ thuật',desc:'Vẽ, thủ công',icon:'fa-palette',color:'pink'},{id:8,name:'Âm nhạc',desc:'Hát, nhạc cụ',icon:'fa-music',color:'indigo'},{id:9,name:'GD Thể chất',desc:'Vận động, sức khỏe',icon:'fa-running',color:'orange'},{id:10,name:'HĐ Trải nghiệm',desc:'STEM, ngoại khóa',icon:'fa-hands-helping',color:'teal'}];

/* ===== Mục lục Tiếng Việt 1 – Kết nối tri thức với cuộc sống ===== */
const defaultBaiHocTV1=[
  /* --- Tập 1 --- */
  {stt:0,title:'Chào em vào lớp 1',content:'Tiếng Việt 1 tập 1 · Kết nối tri thức với cuộc sống. Làm quen trường lớp, bạn bè, đồ dùng học tập.'},
  {stt:5,title:'Bài 5: Búp bê và dế mèn',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:10,title:'Bài 10: Đàn kiến con ngoan ngoãn',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:15,title:'Bài 15: Con quạ thông minh',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:20,title:'Bài 20: Cô chủ không biết quý tình bạn',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:25,title:'Bài 25: Chó sói và cừu non',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:30,title:'Bài 30: Kiến và dế mèn',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:35,title:'Bài 35: Gà nâu và vịt xám',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:40,title:'Bài 40: Hai người bạn và con gấu',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:45,title:'Bài 45: Sự tích hoa cúc trắng',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:50,title:'Bài 50: Bài học đầu tiên của thỏ con',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:55,title:'Bài 55: Mật ong của gấu con',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:60,title:'Bài 60: Quạ và đàn bồ câu',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:65,title:'Bài 65: Lửa, mưa và con hổ hung hăng',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:70,title:'Bài 70: Chuột nhà và chuột đồng',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:75,title:'Bài 75: Chuyện của mây',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:80,title:'Bài 80: Sừng và chân',content:'Tập 1 · Bài đọc / kể chuyện'},
  {stt:81,title:'Bài 81: Ôn tập',content:'Tập 1 · Ôn tập'},
  {stt:82,title:'Bài 82: Ôn tập',content:'Tập 1 · Ôn tập'},
  {stt:83,title:'Bài 83: Ôn tập',content:'Tập 1 · Ôn tập'},
  {stt:84,title:'Đánh giá cuối học kì',content:'Tập 1 · Đánh giá cuối học kì 1'},

  /* --- Tập 2 · Chủ đề 1: Tôi và các bạn --- */
  {stt:101,title:'Bài 1: Tôi là học sinh lớp 1',content:'Tập 2 · Chủ đề 1: Tôi và các bạn'},
  {stt:102,title:'Bài 2: Đôi tai xấu xí',content:'Tập 2 · Chủ đề 1: Tôi và các bạn'},
  {stt:103,title:'Bài 3: Bạn của gió',content:'Tập 2 · Chủ đề 1: Tôi và các bạn'},
  {stt:104,title:'Bài 4: Giải thưởng tình bạn',content:'Tập 2 · Chủ đề 1: Tôi và các bạn'},
  {stt:105,title:'Bài 5: Sinh nhật của voi con',content:'Tập 2 · Chủ đề 1: Tôi và các bạn'},
  {stt:106,title:'Ôn tập (Chủ đề 1)',content:'Tập 2 · Chủ đề 1: Tôi và các bạn · Ôn tập'},

  /* --- Chủ đề 2: Mái ấm gia đình --- */
  {stt:111,title:'Bài 1: Nụ hôn trên bàn tay',content:'Tập 2 · Chủ đề 2: Mái ấm gia đình'},
  {stt:112,title:'Bài 2: Làm anh',content:'Tập 2 · Chủ đề 2: Mái ấm gia đình'},
  {stt:113,title:'Bài 3: Cả nhà đi chơi núi',content:'Tập 2 · Chủ đề 2: Mái ấm gia đình'},
  {stt:114,title:'Bài 4: Quạt cho bà ngủ',content:'Tập 2 · Chủ đề 2: Mái ấm gia đình'},
  {stt:115,title:'Bài 5: Bữa cơm gia đình',content:'Tập 2 · Chủ đề 2: Mái ấm gia đình'},
  {stt:116,title:'Bài 6: Ngôi nhà',content:'Tập 2 · Chủ đề 2: Mái ấm gia đình'},
  {stt:117,title:'Ôn tập (Chủ đề 2)',content:'Tập 2 · Chủ đề 2: Mái ấm gia đình · Ôn tập'},

  /* --- Chủ đề 3: Mái trường mến yêu --- */
  {stt:121,title:'Bài 1: Tôi đi học',content:'Tập 2 · Chủ đề 3: Mái trường mến yêu'},
  {stt:122,title:'Bài 2: Đi học',content:'Tập 2 · Chủ đề 3: Mái trường mến yêu'},
  {stt:123,title:'Bài 3: Hoa yêu thương',content:'Tập 2 · Chủ đề 3: Mái trường mến yêu'},
  {stt:124,title:'Bài 4: Cây bàng và lớp học',content:'Tập 2 · Chủ đề 3: Mái trường mến yêu'},
  {stt:125,title:'Bài 5: Bác trống trường',content:'Tập 2 · Chủ đề 3: Mái trường mến yêu'},
  {stt:126,title:'Bài 6: Giờ ra chơi',content:'Tập 2 · Chủ đề 3: Mái trường mến yêu'},
  {stt:127,title:'Ôn tập (Chủ đề 3)',content:'Tập 2 · Chủ đề 3: Mái trường mến yêu · Ôn tập'},

  /* --- Chủ đề 4: Điều em cần biết --- */
  {stt:131,title:'Bài 1: Rửa tay trước khi ăn',content:'Tập 2 · Chủ đề 4: Điều em cần biết'},
  {stt:132,title:'Bài 2: Lời chào đi trước',content:'Tập 2 · Chủ đề 4: Điều em cần biết'},
  {stt:133,title:'Bài 3: Khi mẹ vắng nhà',content:'Tập 2 · Chủ đề 4: Điều em cần biết'},
  {stt:134,title:'Bài 4: Nếu không may bị lạc',content:'Tập 2 · Chủ đề 4: Điều em cần biết'},
  {stt:135,title:'Bài 5: Đèn giao thông',content:'Tập 2 · Chủ đề 4: Điều em cần biết'},
  {stt:136,title:'Ôn tập (Chủ đề 4)',content:'Tập 2 · Chủ đề 4: Điều em cần biết · Ôn tập'},

  /* --- Chủ đề 5: Bài học từ cuộc sống --- */
  {stt:141,title:'Bài 1: Kiến và chim bồ câu',content:'Tập 2 · Chủ đề 5: Bài học từ cuộc sống'},
  {stt:142,title:'Bài 2: Câu chuyện của rễ',content:'Tập 2 · Chủ đề 5: Bài học từ cuộc sống'},
  {stt:143,title:'Bài 3: Câu hỏi của sói',content:'Tập 2 · Chủ đề 5: Bài học từ cuộc sống'},
  {stt:144,title:'Bài 4: Chú bé chăn cừu',content:'Tập 2 · Chủ đề 5: Bài học từ cuộc sống'},
  {stt:145,title:'Bài 5: Tiếng vọng của núi',content:'Tập 2 · Chủ đề 5: Bài học từ cuộc sống'},
  {stt:146,title:'Ôn tập (Chủ đề 5)',content:'Tập 2 · Chủ đề 5: Bài học từ cuộc sống · Ôn tập'},

  /* --- Chủ đề 6: Thiên nhiên kì thú --- */
  {stt:151,title:'Bài 1: Loài chim của biển cả',content:'Tập 2 · Chủ đề 6: Thiên nhiên kì thú'},
  {stt:152,title:'Bài 2: Bảy sắc cầu vồng',content:'Tập 2 · Chủ đề 6: Thiên nhiên kì thú'},
  {stt:153,title:'Bài 3: Chúa tể rừng xanh',content:'Tập 2 · Chủ đề 6: Thiên nhiên kì thú'},
  {stt:154,title:'Bài 4: Cuộc thi tài năng rừng xanh',content:'Tập 2 · Chủ đề 6: Thiên nhiên kì thú'},
  {stt:155,title:'Bài 5: Cây liễu dẻo dai',content:'Tập 2 · Chủ đề 6: Thiên nhiên kì thú'},
  {stt:156,title:'Ôn tập (Chủ đề 6)',content:'Tập 2 · Chủ đề 6: Thiên nhiên kì thú · Ôn tập'},

  /* --- Chủ đề 7: Thế giới trong mắt em --- */
  {stt:161,title:'Bài 1: Tia nắng đi đâu?',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em'},
  {stt:162,title:'Bài 2: Trong giấc mơ buổi sáng',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em'},
  {stt:163,title:'Bài 3: Ngày mới bắt đầu',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em'},
  {stt:164,title:'Bài 4: Hỏi mẹ',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em'},
  {stt:165,title:'Bài 5: Những cánh cò',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em'},
  {stt:166,title:'Bài 6: Buổi trưa hè',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em'},
  {stt:167,title:'Bài 7: Hoa phượng',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em'},
  {stt:168,title:'Ôn tập (Chủ đề 7)',content:'Tập 2 · Chủ đề 7: Thế giới trong mắt em · Ôn tập'},

  /* --- Chủ đề 8: Đất nước và con người --- */
  {stt:171,title:'Bài 1: Cậu bé thông minh',content:'Tập 2 · Chủ đề 8: Đất nước và con người'},
  {stt:172,title:'Bài 2: Lính cứu hỏa',content:'Tập 2 · Chủ đề 8: Đất nước và con người'},
  {stt:173,title:'Bài 3: Lớn lên bạn làm gì?',content:'Tập 2 · Chủ đề 8: Đất nước và con người'},
  {stt:174,title:'Bài 4: Ruộng bậc thang ở Sa Pa',content:'Tập 2 · Chủ đề 8: Đất nước và con người'},
  {stt:175,title:'Bài 5: Nhớ ơn',content:'Tập 2 · Chủ đề 8: Đất nước và con người'},
  {stt:176,title:'Bài 6: Du lịch biển Việt Nam',content:'Tập 2 · Chủ đề 8: Đất nước và con người'},
  {stt:177,title:'Ôn tập (Chủ đề 8)',content:'Tập 2 · Chủ đề 8: Đất nước và con người · Ôn tập'},

  /* --- Ôn tập và đánh giá cuối năm --- */
  {stt:181,title:'Bài 1: Ôn tập',content:'Tập 2 · Ôn tập và đánh giá cuối năm học'},
  {stt:182,title:'Bài 2: Ôn tập',content:'Tập 2 · Ôn tập và đánh giá cuối năm học'},
  {stt:183,title:'Bài 3: Ôn tập',content:'Tập 2 · Ôn tập và đánh giá cuối năm học'},
  {stt:184,title:'Đánh giá cuối năm học',content:'Tập 2 · Đánh giá cuối năm học'}
];

const defaultBaiHoc=defaultBaiHocTV1.map(function(b,i){
  return {id:i+1,subjectId:1,lop:1,stt:b.stt,title:b.title,content:b.content};
}).concat([
  {id:200,subjectId:1,lop:2,stt:1,title:'Bài 1. Tôi là học sinh lớp 2',content:'Đọc hiểu: Tôi là học sinh lớp 2.'},
  {id:300,subjectId:2,lop:1,stt:1,title:'Bài 1. Các số từ 0 đến 10',content:'Nhận biết, đếm, viết số 0–10.'}
]);

const defaultResources=[{id:1,subjectId:1,lop:1,baiId:2,type:'Giáo án',title:'Giáo án TV lớp 1 - Bài 5: Búp bê và dế mèn',format:'Word',desc:'Kế hoạch bài dạy theo KNTT.'}];
const defaultVideos=[{id:1,title:'Bài đọc: Chuột nhà và chuột đồng',youtubeId:'8_hhplvTTpM',duration:'2:33',subjectId:1,lop:1},{id:2,title:'Bài đọc: Kiến và dế mèn',youtubeId:'aa_9p3gRT8Y',duration:'2:18',subjectId:1,lop:1},{id:3,title:'Bài hát: Lời chào đi trước',youtubeId:'OEtFE6GzT74',duration:'3:24',subjectId:1,lop:1}];
const defaultVanBan=[{id:1,title:'Công văn 3898/BGDĐT-GDTH nhiệm vụ GD tiểu học 2024-2025',type:'Công văn',year:'2024',content:'Hướng dẫn nhiệm vụ năm học.'},{id:2,title:'Thông tư 27/2020 đánh giá HS tiểu học',type:'Thông tư',year:'2020',content:'Đánh giá bằng nhận xét.'}];
const defaultFaq=[{id:1,q:'Định mức tiết dạy GV tiểu học?',a:'TT 05/2025: 23 tiết/tuần (tiểu học).'},{id:2,q:'Giáo án bắt buộc theo mẫu cố định?',a:'Không. Linh hoạt phù hợp HS.'}];
const defaultApps=[{id:1,name:'Canva',desc:'Thiết kế slide, phiếu',icon:'fa-palette',url:'https://canva.com',detail:'Slide, phiếu học tập.'},{id:2,name:'Wordwall',desc:'Trò chơi học tập',icon:'fa-gamepad',url:'https://wordwall.net',detail:'Đố chữ, vòng quay.'}];
const defaultKeHoach=[{id:1,title:'Kế hoạch giáo dục nhà trường 2025-2026',type:'Năm học',content:'Mục tiêu, lịch kiểm tra.'}];
const defaultBieuMau=[{id:1,title:'Mẫu sổ đầu bài tiểu học',type:'Sổ sách',content:'Ngày, tiết, môn, nhận xét.'}];
const defaultDeThi=[{id:1,title:'Đề KT giữa kỳ 1 TV lớp 1',mon:'Tiếng Việt',lop:'1',content:'Đọc, viết, luyện từ.'}];
const defaultSangKien=[{id:1,title:'Rèn đọc lớp 1 qua trò chơi',mon:'Tiếng Việt',content:'Ghép vần, Đọc nhóm.'}];
function getData(k){const d=localStorage.getItem(k);return d?JSON.parse(d):null}
function setData(k,v){localStorage.setItem(k,JSON.stringify(v))}
function initData(){
  if(getData('eduhub_data_version')!==DATA_VERSION){
    Object.values(KEYS).forEach(function(k){if(k!==KEYS.currentUser&&k!==KEYS.users)localStorage.removeItem(k)});
    setData('eduhub_data_version',DATA_VERSION);
  }
  if(!getData(KEYS.subjects))setData(KEYS.subjects,defaultSubjects);
  if(!getData(KEYS.baiHoc))setData(KEYS.baiHoc,defaultBaiHoc);
  if(!getData(KEYS.resources))setData(KEYS.resources,defaultResources);
  if(!getData(KEYS.videos))setData(KEYS.videos,defaultVideos);
  if(!getData(KEYS.vanBan))setData(KEYS.vanBan,defaultVanBan);
  if(!getData(KEYS.faq))setData(KEYS.faq,defaultFaq);
  if(!getData(KEYS.apps))setData(KEYS.apps,defaultApps);
  if(!getData(KEYS.keHoach))setData(KEYS.keHoach,defaultKeHoach);
  if(!getData(KEYS.bieuMau))setData(KEYS.bieuMau,defaultBieuMau);
  if(!getData(KEYS.deThi))setData(KEYS.deThi,defaultDeThi);
  if(!getData(KEYS.sangKien))setData(KEYS.sangKien,defaultSangKien);
  if(!getData(KEYS.users))setData(KEYS.users,[]);

  // Force-merge mục lục TV lớp 1 (không xóa lớp/môn khác)
  if(getData('eduhub_baihoc_tv1_v2')!==2){
    var all=getData(KEYS.baiHoc)||[];
    all=all.filter(function(b){return !(b.subjectId==1&&b.lop==1);});
    var next=all.length?Math.max.apply(null,all.map(function(b){return b.id;}))+1:1;
    defaultBaiHocTV1.forEach(function(b){
      all.push({id:next++,subjectId:1,lop:1,stt:b.stt,title:b.title,content:b.content});
    });
    setData(KEYS.baiHoc,all);
    setData('eduhub_baihoc_tv1_v2',2);
  }
}
function getSubjectName(id){const s=(getData(KEYS.subjects)||[]).find(x=>x.id==id);return s?s.name:''}
function qs(name){return new URLSearchParams(location.search).get(name)}
let _monState={subjectId:null,grade:null,baiId:null};
function renderMonPage(){initData();const id=Number(qs('id'));const s=(getData(KEYS.subjects)||[]).find(x=>x.id===id);if(!s){document.getElementById('pageTitle').textContent='Không tìm thấy môn';return}_monState.subjectId=id;document.getElementById('bcSubject').textContent=s.name;document.getElementById('pageTitle').textContent=s.name;document.getElementById('pageDesc').textContent=s.desc;document.title=s.name+' – EduHub';showGradesView()}
function hideAllViews(){['viewGrades','viewLessons','viewBai'].forEach(id=>{const e=document.getElementById(id);if(e)e.classList.add('hidden')})}
function showGradesView(){_monState.grade=null;_monState.baiId=null;hideAllViews();document.getElementById('viewGrades').classList.remove('hidden');const bai=(getData(KEYS.baiHoc)||[]).filter(b=>b.subjectId==_monState.subjectId);document.getElementById('gradesList').innerHTML=[1,2,3,4,5].map(g=>{const count=bai.filter(b=>b.lop==g).length;return '<a href="javascript:void(0)" onclick="openGrade('+g+')" class="bg-white border rounded-2xl p-6 card-hover text-center block"><div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-extrabold mb-3">'+g+'</div><div class="font-bold">Lớp '+g+'</div><div class="text-xs text-slate-500 mt-1">'+count+' bài</div></a>'}).join('')}
function openGrade(g){_monState.grade=g;_monState.baiId=null;hideAllViews();document.getElementById('viewLessons').classList.remove('hidden');document.getElementById('lessonsGradeLabel').textContent=g;const list=(getData(KEYS.baiHoc)||[]).filter(b=>b.subjectId==_monState.subjectId&&b.lop==g).sort((a,b)=>a.stt-b.stt);const el=document.getElementById('lessonsList');if(!list.length){el.innerHTML='<div class="bg-white border rounded-xl p-6 text-slate-400">Chưa có mục lục bài cho lớp này.</div>';return}el.innerHTML=list.map(b=>'<a href="javascript:void(0)" onclick="openBai('+b.id+')" class="bg-white border rounded-xl p-4 flex items-center gap-3 card-hover block hover:border-indigo-300"><div class="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">'+(b.stt===0?'★':b.stt)+'</div><div class="flex-1 min-w-0"><div class="font-semibold text-sm">'+b.title+'</div><div class="text-xs text-slate-400 truncate">'+(b.content||'').slice(0,80)+'</div></div><i class="fas fa-chevron-right text-slate-300"></i></a>').join('')}
function openBai(baiId){_monState.baiId=baiId;hideAllViews();document.getElementById('viewBai').classList.remove('hidden');const b=(getData(KEYS.baiHoc)||[]).find(x=>x.id==baiId);if(!b){document.getElementById('baiDetail').innerHTML='<p>Không tìm thấy bài.</p>';return}const res=(getData(KEYS.resources)||[]).filter(r=>r.baiId==baiId);let html='<div class="text-xs text-indigo-600 font-semibold mb-1">Lớp '+b.lop+' · Sách Kết nối tri thức</div>';html+='<h2 class="text-xl font-extrabold mb-4">'+b.title+'</h2>';html+='<div class="text-sm text-slate-700 leading-relaxed mb-6">'+b.content+'</div>';html+='<div class="border-t pt-4"><div class="text-xs font-semibold text-slate-400 mb-3 uppercase">Tài nguyên đính kèm</div>';if(!res.length){html+='<p class="text-slate-400 text-sm">Chưa có giáo án/slide đính kèm.</p>'}else{html+=res.map(r=>'<div class="border rounded-xl p-3 mb-2 flex gap-3 items-start"><div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><i class="fas fa-file-alt"></i></div><div class="flex-1"><div class="text-xs text-indigo-600 font-semibold">'+r.type+' · '+(r.format||'')+'</div><div class="font-medium text-sm">'+r.title+'</div><p class="text-xs text-slate-500 mt-1">'+(r.desc||'')+'</p></div></div>').join('')}html+='</div>';document.getElementById('baiDetail').innerHTML=html}
function goBackToGrades(){showGradesView()}
function goBackToLessons(){if(_monState.grade)openGrade(_monState.grade)}

/* ===== VIDEO: thumbnail + click to play ===== */
function ytThumb(id){return 'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'}
function playVideo(el,ytId){el.innerHTML='<iframe class="w-full h-full" src="https://www.youtube.com/embed/'+ytId+'?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}
function videoCard(v){
  var id=v.youtubeId;
  return '<div class="bg-white rounded-2xl overflow-hidden border shadow-sm">'
    +'<div class="aspect-video bg-slate-900 relative cursor-pointer group" onclick="playVideo(this,\''+id+'\')">'
    +'<img src="'+ytThumb(id)+'" alt="" class="w-full h-full object-cover" loading="lazy" onerror="this.src=\'https://i.ytimg.com/vi/'+id+'/mqdefault.jpg\'">'
    +'<div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">'
    +'<div class="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition"><i class="fas fa-play text-lg ml-1"></i></div>'
    +'</div>'
    +(v.duration?'<span class="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">'+v.duration+'</span>':'')
    +'</div>'
    +'<div class="p-4"><div class="text-xs text-indigo-600 font-semibold mb-1">Lớp '+(v.lop||'?')+(v.subjectId?' · '+getSubjectName(v.subjectId):'')+'</div>'
    +'<h3 class="font-bold text-sm leading-snug">'+v.title+'</h3></div></div>';
}
function renderVideoPage(lop){initData();switchVideoTab(lop||0)}
function switchVideoTab(lop){
  for(var i=0;i<=5;i++){var b=document.getElementById('vtab-'+i);if(!b)continue;b.className=i===lop?'px-4 py-2 rounded-full text-sm font-semibold bg-indigo-600 text-white':'px-4 py-2 rounded-full text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200'}
  var videos=getData(KEYS.videos)||[];
  if(lop>0)videos=videos.filter(function(v){return v.lop==lop});
  var el=document.getElementById('videoPageList');if(!el)return;
  if(!videos.length){el.innerHTML='<p class="text-slate-400 col-span-full">Chưa có video lớp này.</p>';return}
  el.innerHTML=videos.map(videoCard).join('');
}

function renderHomepage(){
  var subjects=getData(KEYS.subjects)||[];
  var colorMap={rose:'bg-rose-50 text-rose-600',sky:'bg-sky-50 text-sky-600',emerald:'bg-emerald-50 text-emerald-600',amber:'bg-amber-50 text-amber-600',violet:'bg-violet-50 text-violet-600',cyan:'bg-cyan-50 text-cyan-600',pink:'bg-pink-50 text-pink-600',indigo:'bg-indigo-50 text-indigo-600',orange:'bg-orange-50 text-orange-600',teal:'bg-teal-50 text-teal-600'};
  var el=document.getElementById('subjectsList');
  if(el){el.innerHTML=subjects.map(function(s){return '<a href="mon.html?id='+s.id+'" class="bg-white border rounded-2xl p-5 card-hover block '+(colorMap[s.color]||'bg-slate-50')+'"><div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-3 bg-white/80"><i class="fas '+s.icon+'"></i></div><h3 class="font-bold text-slate-900">'+s.name+'</h3><p class="text-xs text-slate-500 mt-1">'+s.desc+'</p><p class="text-xs text-indigo-500 mt-2 font-semibold">Mở trang môn →</p></a>'}).join('')}
  var videos=(getData(KEYS.videos)||[]).slice(0,3);
  var vEl=document.getElementById('videosList');
  if(vEl){vEl.innerHTML=videos.map(videoCard).join('')+'<div class="md:col-span-3 text-center mt-4"><a href="video.html" class="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold">Xem tất cả video theo lớp <i class="fas fa-arrow-right"></i></a></div>'}
  var vb=getData(KEYS.vanBan)||[];var vbEl=document.getElementById('vanBanList');
  if(vbEl){vbEl.innerHTML=vb.map(function(v){return '<div onclick="showVanBan('+v.id+')" class="bg-white border rounded-xl p-4 flex gap-3 card-hover cursor-pointer"><div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><i class="fas fa-file-alt"></i></div><div><div class="text-xs text-amber-600 font-semibold">'+v.type+' · '+v.year+'</div><div class="font-medium text-sm">'+v.title+'</div></div></div>'}).join('')}
  var faq=getData(KEYS.faq)||[];var faqEl=document.getElementById('faqList');
  if(faqEl){faqEl.innerHTML=faq.map(function(f){return '<details class="bg-white border rounded-xl p-4 group"><summary class="font-semibold text-sm cursor-pointer list-none flex gap-2"><i class="fas fa-chevron-right text-indigo-500 text-xs mt-1 group-open:rotate-90 transition"></i>'+f.q+'</summary><p class="text-sm text-slate-600 mt-3 pl-5">'+f.a+'</p></details>'}).join('')}
  var apps=getData(KEYS.apps)||[];var aEl=document.getElementById('appsList');
  if(aEl){aEl.innerHTML=apps.map(function(a){return '<div onclick="showApp('+a.id+')" class="bg-white border rounded-2xl p-5 card-hover cursor-pointer"><div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-3"><i class="fas '+a.icon+'"></i></div><h3 class="font-bold">'+a.name+'</h3><p class="text-xs text-slate-500 mt-1">'+a.desc+'</p></div>'}).join('')}
  var rcl=function(elId,items,key,color,icon){var e=document.getElementById(elId);if(!e)return;e.innerHTML=items.map(function(item){return '<div onclick="showItem(\''+key+'\','+item.id+')" class="bg-white border rounded-2xl p-5 card-hover cursor-pointer flex gap-3"><div class="w-10 h-10 rounded-xl bg-'+color+'-50 text-'+color+'-600 flex items-center justify-center"><i class="fas '+icon+'"></i></div><div><div class="text-xs text-slate-400">'+(item.type||(item.mon?item.mon+(item.lop?' · Lớp '+item.lop:''):''))+'</div><h3 class="font-bold text-sm">'+item.title+'</h3></div></div>'}).join('')};
  rcl('keHoachList',getData(KEYS.keHoach)||[],KEYS.keHoach,'sky','fa-calendar-alt');
  rcl('bieuMauList',getData(KEYS.bieuMau)||[],KEYS.bieuMau,'violet','fa-folder-open');
  rcl('deThiList',getData(KEYS.deThi)||[],KEYS.deThi,'orange','fa-file-lines');
  rcl('sangKienList',getData(KEYS.sangKien)||[],KEYS.sangKien,'pink','fa-lightbulb');
}
function openModal(title,bodyHtml){var m=document.getElementById('detailModal');if(!m){m=document.createElement('div');m.id='detailModal';m.className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50';m.innerHTML='<div class="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"><div class="sticky top-0 bg-white border-b px-5 py-4 flex justify-between"><h3 id="modalTitle" class="font-bold text-lg"></h3><button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><div id="modalBody" class="px-5 py-4 text-sm"></div></div>';m.onclick=function(e){if(e.target===m)closeModal()};document.body.appendChild(m)}document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=bodyHtml;m.classList.remove('hidden');document.body.style.overflow='hidden'}
function closeModal(){var m=document.getElementById('detailModal');if(m)m.classList.add('hidden');document.body.style.overflow=''}
function showVanBan(id){var v=(getData(KEYS.vanBan)||[]).find(function(x){return x.id==id});if(v)openModal(v.title,'<div class="text-xs text-amber-600 font-semibold mb-2">'+v.type+' · '+v.year+'</div><p>'+(v.content||'')+'</p>')}
function showApp(id){var a=(getData(KEYS.apps)||[]).find(function(x){return x.id==id});if(a)openModal(a.name,'<p class="mb-3">'+(a.detail||a.desc)+'</p><a href="'+a.url+'" target="_blank" class="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Mở ứng dụng</a>')}
function showItem(key,id){var item=(getData(key)||[]).find(function(x){return x.id==id});if(item)openModal(item.title,'<p>'+(item.content||item.desc||'')+'</p>')}
function loginWithGoogle(){if(!auth){var u={uid:'demo',displayName:'Giáo viên Demo',email:'gv@demo.com',photoURL:'https://ui-avatars.com/api/?name=GV&background=4f46e5&color=fff'};setData(KEYS.currentUser,u);updateUIAfterLogin(u);alert('Đăng nhập Demo!');return}auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(r){var u=r.user;setData(KEYS.currentUser,{uid:u.uid,displayName:u.displayName,email:u.email,photoURL:u.photoURL});updateUIAfterLogin(getData(KEYS.currentUser))}).catch(function(e){alert(e.message)})}
function logout(){if(auth)auth.signOut();localStorage.removeItem(KEYS.currentUser);location.reload()}
function updateUIAfterLogin(user){var btn=document.getElementById('btnLogin'),info=document.getElementById('userInfo');if(btn)btn.classList.add('hidden');if(info){info.classList.remove('hidden');info.classList.add('flex');var n=document.getElementById('userName');if(n)n.textContent=user.displayName||user.email;var a=document.getElementById('userAvatar');if(a)a.src=user.photoURL||''}}
function showTab(name){document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.add('hidden')});document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active')});var panel=document.getElementById('panel-'+name);var btn=document.getElementById('tab-'+name);if(panel)panel.classList.remove('hidden');if(btn)btn.classList.add('active')}
document.addEventListener('DOMContentLoaded',function(){initData();var c=getData(KEYS.currentUser);if(c)updateUIAfterLogin(c);if(document.getElementById('subjectsList'))renderHomepage()});
