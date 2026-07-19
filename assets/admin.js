// Admin full - load after script.js
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
function loadAdminData(){
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
  const listRow=(title,sub,type,id)=>'<div class="bg-white rounded-xl p-4 border flex justify-between items-start gap-3"><div class="min-w-0"><div class="font-medium text-sm">'+title+'</div><div class="text-xs text-gray-500 mt-0.5">'+sub+'</div></div><button onclick="deleteItem(\''+type+'\','+id+')" class="text-red-500 px-2 flex-shrink-0"><i class="fas fa-trash"></i></button></div>';
  const topicsEl=document.getElementById('adminTopicsList');
  if(topicsEl)topicsEl.innerHTML=subjects.map(s=>listRow(s.name,s.desc||'','subjects',s.id)).join('')||'<p class="text-gray-500 text-sm">Chua co mon.</p>';
  let baiFiltered=baiHoc.slice();
  const fSub=document.getElementById('filterBaiSubject')?.value;
  const fLop=document.getElementById('filterBaiLop')?.value;
  if(fSub)baiFiltered=baiFiltered.filter(b=>b.subjectId==fSub);
  if(fLop)baiFiltered=baiFiltered.filter(b=>b.lop==fLop);
  baiFiltered.sort((a,b)=>(a.lop-b.lop)||(a.stt-b.stt));
  const baiEl=document.getElementById('adminBaiList');
  if(baiEl)baiEl.innerHTML=baiFiltered.map(b=>listRow(b.title,getSubjectName(b.subjectId)+' · Lop '+b.lop+' · STT '+b.stt,'baiHoc',b.id)).join('')||'<p class="text-gray-500 text-sm">Chua co bai hoc.</p>';
  const resEl=document.getElementById('adminResourcesList');
  if(resEl)resEl.innerHTML=resources.map(r=>listRow(r.title,getSubjectName(r.subjectId)+' · Lop '+(r.lop||'?')+' · '+r.type+(r.link?' · co link':''),'resources',r.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const videosEl=document.getElementById('adminVideosList');
  if(videosEl)videosEl.innerHTML=videos.map(v=>listRow(v.title,'Lop '+(v.lop||'?')+' · '+v.youtubeId,'videos',v.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const vanBan=getData(KEYS.vanBan)||[];
  const vbEl=document.getElementById('adminVanBanList');
  if(vbEl)vbEl.innerHTML=vanBan.map(v=>listRow(v.title,v.type+' · '+v.year,'vanBan',v.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const faq=getData(KEYS.faq)||[];
  const faqEl=document.getElementById('adminFaqList');
  if(faqEl)faqEl.innerHTML=faq.map(f=>listRow(f.q,'','faq',f.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const apps=getData(KEYS.apps)||[];
  const appsEl=document.getElementById('adminAppsList');
  if(appsEl)appsEl.innerHTML=apps.map(a=>listRow(a.name,a.url||'','apps',a.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const kh=getData(KEYS.keHoach)||[];
  const khEl=document.getElementById('adminKeHoachList');
  if(khEl)khEl.innerHTML=kh.map(x=>listRow(x.title,x.type||'','keHoach',x.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const bm=getData(KEYS.bieuMau)||[];
  const bmEl=document.getElementById('adminBieuMauList');
  if(bmEl)bmEl.innerHTML=bm.map(x=>listRow(x.title,x.type||'','bieuMau',x.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const dt=getData(KEYS.deThi)||[];
  const dtEl=document.getElementById('adminDeThiList');
  if(dtEl)dtEl.innerHTML=dt.map(x=>listRow(x.title,(x.mon||'')+' · Lop '+(x.lop||''),'deThi',x.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
  const sk=getData(KEYS.sangKien)||[];
  const skEl=document.getElementById('adminSangKienList');
  if(skEl)skEl.innerHTML=sk.map(x=>listRow(x.title,x.mon||'','sangKien',x.id)).join('')||'<p class="text-gray-500 text-sm">Chua co.</p>';
}
function nextId(list){return list.length?Math.max(...list.map(x=>x.id))+1:1}
function saveSubject(){const name=document.getElementById('topicName')?.value.trim();const desc=document.getElementById('topicDesc')?.value.trim()||'';const icon=document.getElementById('topicIcon')?.value.trim()||'fa-folder';if(!name)return alert('Nhap ten mon');let list=getData(KEYS.subjects)||[];list.push({id:nextId(list),name,desc,icon,color:'indigo'});setData(KEYS.subjects,list);alert('Da them mon!');loadAdminData()}
function saveBaiHoc(){const title=document.getElementById('baiTitle')?.value.trim();const content=document.getElementById('baiContent')?.value.trim()||'';const subjectId=Number(document.getElementById('baiSubject')?.value);const lop=Number(document.getElementById('baiLop')?.value)||1;const stt=Number(document.getElementById('baiStt')?.value)||1;if(!title||!subjectId)return alert('Nhap ten bai va chon mon');let list=getData(KEYS.baiHoc)||[];list.push({id:nextId(list),subjectId,lop,stt,title,content});setData(KEYS.baiHoc,list);alert('Da them bai hoc!');loadAdminData()}
function saveResource(){const title=document.getElementById('resourceTitle')?.value.trim();const type=document.getElementById('resourceType')?.value||'Giao an';const format=document.getElementById('resourceFormat')?.value||'Word';const subjectId=document.getElementById('resourceSubject')?.value;const desc=document.getElementById('resourceDesc')?.value.trim()||'';const content=document.getElementById('resourceContent')?.value.trim()||'';const link=document.getElementById('resourceLink')?.value.trim()||'';const lop=Number(document.getElementById('resourceLop')?.value)||1;const fileInput=document.getElementById('resourceFile');const fileName=fileInput&&fileInput.files&&fileInput.files[0]?fileInput.files[0].name:'';if(!title||!subjectId)return alert('Nhap tieu de va chon mon');let list=getData(KEYS.resources)||[];list.push({id:nextId(list),title,type,format,subjectId:Number(subjectId),lop,desc,content,link,fileName});setData(KEYS.resources,list);alert('Da them tai nguyen!');loadAdminData()}
function saveVideo(){const title=document.getElementById('videoTitle')?.value.trim();let yt=document.getElementById('videoId')?.value.trim();const duration=document.getElementById('videoDuration')?.value.trim()||'';const subjectId=document.getElementById('videoTopic')?.value;const lop=Number(document.getElementById('videoLop')?.value)||1;if(!title||!yt)return alert('Nhap tieu de va YouTube');const m=yt.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);if(m)yt=m[1];let list=getData(KEYS.videos)||[];list.push({id:nextId(list),title,youtubeId:yt,duration,subjectId:subjectId?Number(subjectId):null,lop});setData(KEYS.videos,list);alert('Da them video!');loadAdminData()}
function saveVanBan(){const title=document.getElementById('vbTitle')?.value.trim();const type=document.getElementById('vbType')?.value||'Cong van';const year=document.getElementById('vbYear')?.value||'';const content=document.getElementById('vbContent')?.value.trim()||'';const link=document.getElementById('vbLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');let list=getData(KEYS.vanBan)||[];list.push({id:nextId(list),title,type,year,content,link});setData(KEYS.vanBan,list);alert('Da them!');loadAdminData()}
function saveFaq(){const q=document.getElementById('faqQ')?.value.trim();const a=document.getElementById('faqA')?.value.trim();if(!q||!a)return alert('Nhap du');let list=getData(KEYS.faq)||[];list.push({id:nextId(list),q,a});setData(KEYS.faq,list);alert('Da them!');loadAdminData()}
function saveApp(){const name=document.getElementById('appName')?.value.trim();const desc=document.getElementById('appDesc')?.value.trim()||'';const url=document.getElementById('appUrl')?.value.trim()||'#';const icon=document.getElementById('appIcon')?.value.trim()||'fa-link';const detail=document.getElementById('appDetail')?.value.trim()||desc;if(!name)return alert('Nhap ten');let list=getData(KEYS.apps)||[];list.push({id:nextId(list),name,desc,url,icon,detail});setData(KEYS.apps,list);alert('Da them!');loadAdminData()}
function saveKeHoach(){const title=document.getElementById('khTitle')?.value.trim();const type=document.getElementById('khType')?.value||'Nam hoc';const content=document.getElementById('khContent')?.value.trim()||'';const link=document.getElementById('khLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');let list=getData(KEYS.keHoach)||[];list.push({id:nextId(list),title,type,content,link});setData(KEYS.keHoach,list);alert('Da them!');loadAdminData()}
function saveBieuMau(){const title=document.getElementById('bmTitle')?.value.trim();const type=document.getElementById('bmType')?.value||'So sach';const content=document.getElementById('bmContent')?.value.trim()||'';const link=document.getElementById('bmLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');let list=getData(KEYS.bieuMau)||[];list.push({id:nextId(list),title,type,content,link});setData(KEYS.bieuMau,list);alert('Da them!');loadAdminData()}
function saveDeThi(){const title=document.getElementById('dtTitle')?.value.trim();const mon=document.getElementById('dtMon')?.value.trim()||'';const lop=document.getElementById('dtLop')?.value||'1';const content=document.getElementById('dtContent')?.value.trim()||'';const link=document.getElementById('dtLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');let list=getData(KEYS.deThi)||[];list.push({id:nextId(list),title,mon,lop,content,link});setData(KEYS.deThi,list);alert('Da them!');loadAdminData()}
function saveSangKien(){const title=document.getElementById('skTitle')?.value.trim();const mon=document.getElementById('skMon')?.value.trim()||'';const content=document.getElementById('skContent')?.value.trim()||'';const link=document.getElementById('skLink')?.value.trim()||'';if(!title)return alert('Nhap tieu de');let list=getData(KEYS.sangKien)||[];list.push({id:nextId(list),title,mon,content,link});setData(KEYS.sangKien,list);alert('Da them!');loadAdminData()}
function deleteItem(type,id){if(!confirm('Xoa?'))return;const keyMap={subjects:KEYS.subjects,resources:KEYS.resources,videos:KEYS.videos,vanBan:KEYS.vanBan,faq:KEYS.faq,apps:KEYS.apps,baiHoc:KEYS.baiHoc,keHoach:KEYS.keHoach,bieuMau:KEYS.bieuMau,deThi:KEYS.deThi,sangKien:KEYS.sangKien};const key=keyMap[type];if(!key)return;setData(key,(getData(key)||[]).filter(i=>i.id!=id));loadAdminData();if(document.getElementById('subjectsList'))renderHomepage()}
function saveTopic(){saveSubject()}
function saveDoc(){alert('Dung tab Tai nguyen')}
function cancelEditTopic(){}
function cancelEditVideo(){}
function cancelEditDoc(){}
function editTopic(){}
function editVideo(){}
function editDoc(){}
function savePayment(){alert('Da luu!')}
document.addEventListener('DOMContentLoaded',function(){
  if(typeof initData==='function')initData();
  if(document.getElementById('statTopics')||document.getElementById('adminTopicsList')||document.getElementById('adminBaiList')){
    if(typeof loadAdminData==='function')loadAdminData();
  }
});
