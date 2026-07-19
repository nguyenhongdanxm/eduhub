// Admin full v2 - search + edit. Load after assets/script.js
(function(){
  if(typeof KEYS==='undefined'){console.error('Load script.js first');return;}
  if(!KEYS.baiHoc)KEYS.baiHoc='eduhub_baihoc';
  function ensure(k,def){if(typeof getData==='function'&&!getData(k))setData(k,def||[]);}
  if(typeof getData==='function'){
    ensure(KEYS.baiHoc,typeof defaultBaiHoc!=='undefined'?defaultBaiHoc:[]);
    ensure(KEYS.keHoach,typeof defaultKeHoach!=='undefined'?defaultKeHoach:[]);
    ensure(KEYS.bieuMau,typeof defaultBieuMau!=='undefined'?defaultBieuMau:[]);
    ensure(KEYS.deThi,typeof defaultDeThi!=='undefined'?defaultDeThi:[]);
    ensure(KEYS.sangKien,typeof defaultSangKien!=='undefined'?defaultSangKien:[]);
  }
})();

window._editState={type:null,id:null};

function nextId(list){return list.length?Math.max(...list.map(x=>x.id))+1:1}
function norm(s){return(s||'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function matchQ(q,...fields){if(!q)return true;const n=norm(q);return fields.some(f=>norm(f).includes(n))}

function listRow(title,sub,type,id){
  return '<div class="bg-white rounded-xl p-4 border flex justify-between items-start gap-3">'
    +'<div class="min-w-0"><div class="font-medium text-sm">'+esc(title)+'</div>'
    +'<div class="text-xs text-gray-500 mt-0.5">'+esc(sub)+'</div></div>'
    +'<div class="flex gap-1 flex-shrink-0">'
    +'<button onclick="editItem(\''+type+'\','+id+')" class="text-indigo-600 px-2 py-1 rounded hover:bg-indigo-50" title="Sua"><i class="fas fa-pen text-sm"></i></button>'
    +'<button onclick="deleteItem(\''+type+'\','+id+')" class="text-red-500 px-2 py-1 rounded hover:bg-red-50" title="Xoa"><i class="fas fa-trash text-sm"></i></button>'
    +'</div></div>';
}
function esc(s){return String(s||'').replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>').replace(/"/g,'"')}

function adminSearchVal(){return document.getElementById('adminSearch')?.value||''}

function loadAdminData(){
  const q=adminSearchVal();
  const subjects=getData(KEYS.subjects)||[];
  const resources=getData(KEYS.resources)||[];
  const videos=getData(KEYS.videos)||[];
  const baiHoc=getData(KEYS.baiHoc)||[];
  if(document.getElementById('statTopics'))document.getElementById('statTopics').textContent=subjects.length;
  if(document.getElementById('statVideos'))document.getElementById('statVideos').textContent=videos.length;
  if(document.getElementById('statDocs'))document.getElementById('statDocs').textContent=resources.length;
  if(document.getElementById('statBai'))document.getElementById('statBai').textContent=baiHoc.length;

  const opts='<option value="">-- Chon mon --</option>'+subjects.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');
  ['resourceSubject','videoTopic','baiSubject','filterBaiSubject'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    const cur=el.value;
    if(id==='filterBaiSubject')el.innerHTML='<option value="">Tat ca mon</option>'+subjects.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');
    else el.innerHTML=opts;
    if(cur)el.value=cur;
  });

  const topicsEl=document.getElementById('adminTopicsList');
  if(topicsEl){
    const list=subjects.filter(s=>matchQ(q,s.name,s.desc));
    topicsEl.innerHTML=list.map(s=>listRow(s.name,s.desc||'','subjects',s.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  let baiFiltered=baiHoc.slice();
  const fSub=document.getElementById('filterBaiSubject')?.value;
  const fLop=document.getElementById('filterBaiLop')?.value;
  if(fSub)baiFiltered=baiFiltered.filter(b=>b.subjectId==fSub);
  if(fLop)baiFiltered=baiFiltered.filter(b=>b.lop==fLop);
  baiFiltered=baiFiltered.filter(b=>matchQ(q,b.title,b.content));
  baiFiltered.sort((a,b)=>(a.lop-b.lop)||(a.stt-b.stt));
  const baiEl=document.getElementById('adminBaiList');
  if(baiEl)baiEl.innerHTML=baiFiltered.map(b=>listRow(b.title,getSubjectName(b.subjectId)+' · Lop '+b.lop+' · STT '+b.stt,'baiHoc',b.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';

  const resEl=document.getElementById('adminResourcesList');
  if(resEl){
    const list=resources.filter(r=>matchQ(q,r.title,r.desc,r.content,r.type));
    resEl.innerHTML=list.map(r=>listRow(r.title,getSubjectName(r.subjectId)+' · Lop '+(r.lop||'?')+' · '+r.type+(r.link?' · co link':''),'resources',r.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const videosEl=document.getElementById('adminVideosList');
  if(videosEl){
    const list=videos.filter(v=>matchQ(q,v.title,v.youtubeId));
    videosEl.innerHTML=list.map(v=>listRow(v.title,'Lop '+(v.lop||'?')+' · '+v.youtubeId,'videos',v.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const vanBan=getData(KEYS.vanBan)||[];
  const vbEl=document.getElementById('adminVanBanList');
  if(vbEl){
    const list=vanBan.filter(v=>matchQ(q,v.title,v.content,v.type));
    vbEl.innerHTML=list.map(v=>listRow(v.title,v.type+' · '+v.year,'vanBan',v.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const faq=getData(KEYS.faq)||[];
  const faqEl=document.getElementById('adminFaqList');
  if(faqEl){
    const list=faq.filter(f=>matchQ(q,f.q,f.a));
    faqEl.innerHTML=list.map(f=>listRow(f.q,'','faq',f.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const apps=getData(KEYS.apps)||[];
  const appsEl=document.getElementById('adminAppsList');
  if(appsEl){
    const list=apps.filter(a=>matchQ(q,a.name,a.desc,a.detail));
    appsEl.innerHTML=list.map(a=>listRow(a.name,a.url||'','apps',a.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const kh=getData(KEYS.keHoach)||[];
  const khEl=document.getElementById('adminKeHoachList');
  if(khEl){
    const list=kh.filter(x=>matchQ(q,x.title,x.content,x.type));
    khEl.innerHTML=list.map(x=>listRow(x.title,x.type||'','keHoach',x.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const bm=getData(KEYS.bieuMau)||[];
  const bmEl=document.getElementById('adminBieuMauList');
  if(bmEl){
    const list=bm.filter(x=>matchQ(q,x.title,x.content,x.type));
    bmEl.innerHTML=list.map(x=>listRow(x.title,x.type||'','bieuMau',x.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const dt=getData(KEYS.deThi)||[];
  const dtEl=document.getElementById('adminDeThiList');
  if(dtEl){
    const list=dt.filter(x=>matchQ(q,x.title,x.content,x.mon));
    dtEl.innerHTML=list.map(x=>listRow(x.title,(x.mon||'')+' · Lop '+(x.lop||''),'deThi',x.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }

  const sk=getData(KEYS.sangKien)||[];
  const skEl=document.getElementById('adminSangKienList');
  if(skEl){
    const list=sk.filter(x=>matchQ(q,x.title,x.content,x.mon));
    skEl.innerHTML=list.map(x=>listRow(x.title,x.mon||'','sangKien',x.id)).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';
  }
  updateEditBadge();
}

function updateEditBadge(){
  const el=document.getElementById('editModeBadge');
  if(!el)return;
  if(_editState.id){el.classList.remove('hidden');el.querySelector('span').textContent='Dang sua #'+_editState.id+' ('+_editState.type+') – bam Luu de cap nhat';}
  else el.classList.add('hidden');
}
function clearEdit(){_editState={type:null,id:null};updateEditBadge()}

function setVal(id,v){const e=document.getElementById(id);if(e)e.value=v??''}

function editItem(type,id){
  const keyMap={subjects:KEYS.subjects,resources:KEYS.resources,videos:KEYS.videos,vanBan:KEYS.vanBan,faq:KEYS.faq,apps:KEYS.apps,baiHoc:KEYS.baiHoc,keHoach:KEYS.keHoach,bieuMau:KEYS.bieuMau,deThi:KEYS.deThi,sangKien:KEYS.sangKien};
  const key=keyMap[type];if(!key)return;
  const item=(getData(key)||[]).find(x=>x.id==id);if(!item)return alert('Khong tim thay');
  _editState={type,id:item.id};
  const tabMap={subjects:'mon',baiHoc:'bai',resources:'tn',videos:'video',vanBan:'vb',faq:'faq',apps:'app',keHoach:'kh',bieuMau:'bm',deThi:'dt',sangKien:'sk'};
  if(tabMap[type]&&typeof showTab==='function')showTab(tabMap[type]);

  if(type==='subjects'){setVal('topicName',item.name);setVal('topicDesc',item.desc);setVal('topicIcon',item.icon);}
  if(type==='baiHoc'){setVal('baiSubject',item.subjectId);setVal('baiLop',item.lop);setVal('baiStt',item.stt);setVal('baiTitle',item.title);setVal('baiContent',item.content);}
  if(type==='resources'){setVal('resourceTitle',item.title);setVal('resourceSubject',item.subjectId);setVal('resourceLop',item.lop);setVal('resourceType',item.type);setVal('resourceFormat',item.format);setVal('resourceLink',item.link);setVal('resourceDesc',item.desc);setVal('resourceContent',item.content);}
  if(type==='videos'){setVal('videoTitle',item.title);setVal('videoId',item.youtubeId);setVal('videoDuration',item.duration);setVal('videoTopic',item.subjectId);setVal('videoLop',item.lop);}
  if(type==='vanBan'){setVal('vbTitle',item.title);setVal('vbYear',item.year);setVal('vbType',item.type);setVal('vbLink',item.link);setVal('vbContent',item.content);}
  if(type==='faq'){setVal('faqQ',item.q);setVal('faqA',item.a);}
  if(type==='apps'){setVal('appName',item.name);setVal('appUrl',item.url);setVal('appDesc',item.desc);setVal('appIcon',item.icon);setVal('appDetail',item.detail);}
  if(type==='keHoach'){setVal('khTitle',item.title);setVal('khType',item.type);setVal('khLink',item.link);setVal('khContent',item.content);}
  if(type==='bieuMau'){setVal('bmTitle',item.title);setVal('bmType',item.type);setVal('bmLink',item.link);setVal('bmContent',item.content);}
  if(type==='deThi'){setVal('dtTitle',item.title);setVal('dtMon',item.mon);setVal('dtLop',item.lop);setVal('dtLink',item.link);setVal('dtContent',item.content);}
  if(type==='sangKien'){setVal('skTitle',item.title);setVal('skMon',item.mon);setVal('skLink',item.link);setVal('skContent',item.content);}
  updateEditBadge();
  window.scrollTo({top:0,behavior:'smooth'});
}

function upsert(key,obj,type){
  let list=getData(key)||[];
  if(_editState.type===type&&_editState.id){
    list=list.map(x=>x.id==_editState.id?Object.assign({},x,obj,{id:_editState.id}):x);
    clearEdit();
    setData(key,list);
    alert('Da cap nhat!');
  }else{
    list.push(Object.assign({},obj,{id:nextId(list)}));
    setData(key,list);
    alert('Da them!');
  }
  loadAdminData();
}

function saveSubject(){const name=document.getElementById('topicName')?.value.trim();const desc=document.getElementById('topicDesc')?.value.trim()||'';const icon=document.getElementById('topicIcon')?.value.trim()||'fa-folder';if(!name)return alert('Nhap ten mon');upsert(KEYS.subjects,{name,desc,icon,color:'indigo'},'subjects')}
function saveBaiHoc(){const title=document.getElementById('baiTitle')?.value.trim();const content=document.getElementById('baiContent')?.value.trim()||'';const subjectId=Number(document.getElementById('baiSubject')?.value);const lop=Number(document.getElementById('baiLop')?.value)||1;const stt=Number(document.getElementById('baiStt')?.value)||1;if(!title||!subjectId)return alert('Nhap ten bai va chon mon');upsert(KEYS.baiHoc,{subjectId,lop,stt,title,content},'baiHoc');setVal('baiTitle','');setVal('baiContent','')}
function saveResource(){const title=document.getElementById('resourceTitle')?.value.trim();const type=document.getElementById('resourceType')?.value||'Giao an';const format=document.getElementById('resourceFormat')?.value||'Word';const subjectId=document.getElementById('resourceSubject')?.value;const desc=document.getElementById('resourceDesc')?.value.trim()||'';const content=document.getElementById('resourceContent')?.value.trim()||'';const link=document.getElementById('resourceLink')?.value.trim()||'';const lop=Number(document.getElementById('resourceLop')?.value)||1;const fileInput=document.getElementById('resourceFile');const fileName=fileInput&&fileInput.files&&fileInput.files[0]?fileInput.files[0].name:'';if(!title||!subjectId)return alert('Nhap tieu de va chon mon');upsert(KEYS.resources,{title,type,format,subjectId:Number(subjectId),lop,desc,content,link,fileName},'resources')}
function saveVideo(){const title=document.getElementById('videoTitle')?.value.trim();let yt=document.getElementById('videoId')?.value.trim();const duration=document.getElementById('videoDuration')?.value.trim()||'';const subjectId=document.getElementById('videoTopic')?.value;const lop=Number(document.getElementById('videoLop')?.value)||1;if(!title||!yt)return alert('Nhap tieu de va YouTube');const m=yt.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);if(m)yt=m[1];upsert(KEYS.videos,{title,youtubeId:yt,duration,subjectId:subjectId?Number(subjectId):null,lop},'videos')}
function saveVanBan(){const title=document.getElementById('vbTitle')?.value.trim();const type=document.getElementById('vbType')?.value||'Cong van';const year=document.getElementById('vbYear')?.value||'';const content=document.getElementById('vbContent')?.value.trim()||'';const link=document.getElementById('vbLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.vanBan,{title,type,year,content,link},'vanBan')}
function saveFaq(){const q=document.getElementById('faqQ')?.value.trim();const a=document.getElementById('faqA')?.value.trim();if(!q||!a)return alert('Nhap du');upsert(KEYS.faq,{q,a},'faq')}
function saveApp(){const name=document.getElementById('appName')?.value.trim();const desc=document.getElementById('appDesc')?.value.trim()||'';const url=document.getElementById('appUrl')?.value.trim()||'#';const icon=document.getElementById('appIcon')?.value.trim()||'fa-link';const detail=document.getElementById('appDetail')?.value.trim()||desc;if(!name)return alert('Nhap ten');upsert(KEYS.apps,{name,desc,url,icon,detail},'apps')}
function saveKeHoach(){const title=document.getElementById('khTitle')?.value.trim();const type=document.getElementById('khType')?.value||'Nam hoc';const content=document.getElementById('khContent')?.value.trim()||'';const link=document.getElementById('khLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.keHoach,{title,type,content,link},'keHoach')}
function saveBieuMau(){const title=document.getElementById('bmTitle')?.value.trim();const type=document.getElementById('bmType')?.value||'So sach';const content=document.getElementById('bmContent')?.value.trim()||'';const link=document.getElementById('bmLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.bieuMau,{title,type,content,link},'bieuMau')}
function saveDeThi(){const title=document.getElementById('dtTitle')?.value.trim();const mon=document.getElementById('dtMon')?.value.trim()||'';const lop=document.getElementById('dtLop')?.value||'1';const content=document.getElementById('dtContent')?.value.trim()||'';const link=document.getElementById('dtLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.deThi,{title,mon,lop,content,link},'deThi')}
function saveSangKien(){const title=document.getElementById('skTitle')?.value.trim();const mon=document.getElementById('skMon')?.value.trim()||'';const content=document.getElementById('skContent')?.value.trim()||'';const link=document.getElementById('skLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.sangKien,{title,mon,content,link},'sangKien')}
function deleteItem(type,id){if(!confirm('Xoa muc nay?'))return;const keyMap={subjects:KEYS.subjects,resources:KEYS.resources,videos:KEYS.videos,vanBan:KEYS.vanBan,faq:KEYS.faq,apps:KEYS.apps,baiHoc:KEYS.baiHoc,keHoach:KEYS.keHoach,bieuMau:KEYS.bieuMau,deThi:KEYS.deThi,sangKien:KEYS.sangKien};const key=keyMap[type];if(!key)return;setData(key,(getData(key)||[]).filter(i=>i.id!=id));if(_editState.id==id)clearEdit();loadAdminData();if(document.getElementById('subjectsList'))renderHomepage()}
function saveTopic(){saveSubject()}
function saveDoc(){alert('Dung tab Tai nguyen')}
function cancelEditTopic(){clearEdit()}
function cancelEditVideo(){clearEdit()}
function cancelEditDoc(){clearEdit()}
function editTopic(){}
function editVideo(){}
function editDoc(){}
function savePayment(){alert('Da luu!')}

function siteSearch(q){
  q=(q||'').trim();
  const box=document.getElementById('searchResults');
  if(!box)return;
  if(!q){box.classList.add('hidden');box.innerHTML='';return;}
  initData();
  const results=[];
  (getData(KEYS.subjects)||[]).forEach(s=>{if(matchQ(q,s.name,s.desc))results.push({type:'Mon hoc',title:s.name,href:'mon.html?id='+s.id,sub:s.desc})});
  (getData(KEYS.baiHoc)||[]).forEach(b=>{if(matchQ(q,b.title,b.content))results.push({type:'Bai hoc L'+b.lop,title:b.title,href:'mon.html?id='+b.subjectId,sub:(b.content||'').slice(0,80)})});
  (getData(KEYS.resources)||[]).forEach(r=>{if(matchQ(q,r.title,r.desc,r.content))results.push({type:r.type||'Tai nguyen',title:r.title,href:'mon.html?id='+r.subjectId,sub:r.desc})});
  (getData(KEYS.videos)||[]).forEach(v=>{if(matchQ(q,v.title))results.push({type:'Video',title:v.title,href:'video.html',sub:'Lop '+(v.lop||'')})});
  (getData(KEYS.vanBan)||[]).forEach(v=>{if(matchQ(q,v.title,v.content))results.push({type:'Van ban',title:v.title,href:'#van-ban',sub:v.type})});
  (getData(KEYS.faq)||[]).forEach(f=>{if(matchQ(q,f.q,f.a))results.push({type:'Hoi dap',title:f.q,href:'#van-ban',sub:(f.a||'').slice(0,60)})});
  (getData(KEYS.deThi)||[]).forEach(d=>{if(matchQ(q,d.title,d.content,d.mon))results.push({type:'De thi',title:d.title,href:'#de-thi',sub:(d.mon||'')+' Lop '+(d.lop||'')})});
  (getData(KEYS.keHoach)||[]).forEach(k=>{if(matchQ(q,k.title,k.content))results.push({type:'Ke hoach',title:k.title,href:'#ke-hoach',sub:k.type})});
  (getData(KEYS.bieuMau)||[]).forEach(k=>{if(matchQ(q,k.title,k.content))results.push({type:'Bieu mau',title:k.title,href:'#bieu-mau',sub:k.type})});
  (getData(KEYS.apps)||[]).forEach(a=>{if(matchQ(q,a.name,a.desc))results.push({type:'Ung dung',title:a.name,href:'#ung-dung',sub:a.desc})});
  (getData(KEYS.sangKien)||[]).forEach(s=>{if(matchQ(q,s.title,s.content))results.push({type:'Sang kien',title:s.title,href:'#sang-kien',sub:s.mon})});

  box.classList.remove('hidden');
  if(!results.length){box.innerHTML='<div class="p-4 text-sm text-slate-500">Khong tim thay</div>';return}
  box.innerHTML='<div class="p-2 text-xs text-slate-400 font-semibold">'+results.length+' ket qua</div>'+results.slice(0,30).map(r=>
    '<a href="'+r.href+'" class="block px-4 py-3 hover:bg-indigo-50 border-t border-slate-100"><div class="text-[10px] font-bold text-indigo-500 uppercase">'+esc(r.type)+'</div><div class="font-semibold text-sm">'+esc(r.title)+'</div><div class="text-xs text-slate-500 truncate">'+esc(r.sub||'')+'</div></a>'
  ).join('');
}

function filterLessons(q){
  if(typeof openGrade!=='function'||!window._monState||!_monState.grade)return;
  const list=(getData(KEYS.baiHoc)||[]).filter(b=>b.subjectId==_monState.subjectId&&b.lop==_monState.grade).filter(b=>matchQ(q,b.title,b.content)).sort((a,b)=>a.stt-b.stt);
  const el=document.getElementById('lessonsList');if(!el)return;
  if(!list.length){el.innerHTML='<div class="bg-white border rounded-xl p-6 text-slate-400">Khong co bai khop.</div>';return}
  el.innerHTML=list.map(b=>'<a href="javascript:void(0)" onclick="openBai('+b.id+')" class="bg-white border rounded-xl p-4 flex items-center gap-3 card-hover block hover:border-indigo-300"><div class="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">'+(b.stt===0?'★':b.stt)+'</div><div class="flex-1 min-w-0"><div class="font-semibold text-sm">'+b.title+'</div><div class="text-xs text-slate-400 truncate">'+(b.content||'').slice(0,80)+'…</div></div><i class="fas fa-chevron-right text-slate-300"></i></a>').join('');
}

document.addEventListener('DOMContentLoaded',function(){
  if(typeof initData==='function')initData();
  if(document.getElementById('statTopics')||document.getElementById('adminTopicsList')||document.getElementById('adminBaiList')){
    if(typeof loadAdminData==='function')loadAdminData();
  }
  const as=document.getElementById('adminSearch');
  if(as)as.addEventListener('input',()=>loadAdminData());
  const ss=document.getElementById('siteSearchInput');
  if(ss){
    ss.addEventListener('input',()=>siteSearch(ss.value));
    ss.addEventListener('focus',()=>{if(ss.value)siteSearch(ss.value)});
    document.addEventListener('click',e=>{
      const box=document.getElementById('searchResults');
      if(box&&!box.contains(e.target)&&e.target!==ss)box.classList.add('hidden');
    });
  }
});
