/* Bai hoc rich content - overrides */
function saveBaiHoc(){
  var title=document.getElementById('baiTitle')&&document.getElementById('baiTitle').value.trim();
  var ed=document.getElementById('baiEditor');
  var content=ed?ed.innerHTML.trim():'';
  if(content==='<br>'||content==='<div><br></div>')content='';
  var subjectId=Number(document.getElementById('baiSubject')&&document.getElementById('baiSubject').value);
  var lop=Number(document.getElementById('baiLop')&&document.getElementById('baiLop').value)||1;
  var stt=Number(document.getElementById('baiStt')&&document.getElementById('baiStt').value)||1;
  var attachLink=(document.getElementById('baiAttachLink')&&document.getElementById('baiAttachLink').value.trim())||'';
  var attachName=(document.getElementById('baiAttachName')&&document.getElementById('baiAttachName').value.trim())||'';
  if(!title||!subjectId)return alert('Nhap ten bai va chon mon');
  upsert(KEYS.baiHoc,{subjectId:subjectId,lop:lop,stt:stt,title:title,content:content,attachLink:attachLink,attachName:attachName},'baiHoc');
  setVal('baiTitle','');
  if(ed){ed.innerHTML='';ed.classList.add('empty');}
  setVal('baiAttachLink','');setVal('baiAttachName','');
  var prev=document.getElementById('baiAttachPreview');if(prev)prev.innerHTML='';
  var fi=document.getElementById('baiAttachFile');if(fi)fi.value='';
}
var _origEditItem=typeof editItem==='function'?editItem:null;
editItem=function(type,id){
  if(_origEditItem)_origEditItem(type,id);
  if(type==='baiHoc'){
    var item=(getData(KEYS.baiHoc)||[]).find(function(x){return x.id==id;});
    if(!item)return;
    var ed=document.getElementById('baiEditor');
    if(ed){
      var c=item.content||'';
      if(c && c.indexOf('<')===-1) c='<p>'+c.replace(/\n/g,'<br>')+'</p>';
      ed.innerHTML=c;
      ed.classList.toggle('empty',!ed.textContent.trim());
    }
    setVal('baiAttachLink',item.attachLink||'');
    setVal('baiAttachName',item.attachName||'');
    var prev=document.getElementById('baiAttachPreview');
    if(prev)prev.innerHTML=item.attachLink?'<a href="'+item.attachLink+'" target="_blank" class="text-indigo-600 text-sm"><i class="fas fa-paperclip"></i> '+(item.attachName||'Tep dinh kem')+'</a>':'';
  }
};
function openBai(baiId){
  if(typeof _monState==='undefined')return;
  _monState.baiId=baiId;
  if(typeof hideAllViews==='function')hideAllViews();
  var vb=document.getElementById('viewBai');if(vb)vb.classList.remove('hidden');
  var b=(getData(KEYS.baiHoc)||[]).find(function(x){return x.id==baiId;});
  var detail=document.getElementById('baiDetail');
  if(!b){if(detail)detail.innerHTML='<p>Khong tim thay bai.</p>';return;}
  var res=(getData(KEYS.resources)||[]).filter(function(r){return r.baiId==baiId;});
  var html='<div class="text-xs text-indigo-600 font-semibold mb-1">Lop '+b.lop+' · Sach Ket noi tri thuc</div>';
  html+='<h2 class="text-xl font-extrabold mb-4">'+b.title+'</h2>';
  var body=b.content||'';
  if(body && body.indexOf('<')===-1) body='<p>'+body.replace(/\n/g,'<br>')+'</p>';
  html+='<div class="text-sm text-slate-700 leading-relaxed mb-6 prose prose-sm max-w-none bai-content">'+body+'</div>';
  if(b.attachLink){
    html+='<div class="mb-4"><a href="'+b.attachLink+'" target="_blank" class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-100"><i class="fas fa-paperclip"></i> '+(b.attachName||'Tep dinh kem')+'</a></div>';
  }
  html+='<div class="border-t pt-4"><div class="text-xs font-semibold text-slate-400 mb-3 uppercase">Tai nguyen dinh kem</div>';
  if(!res.length && !b.attachLink){html+='<p class="text-slate-400 text-sm">Chua co giao an/slide dinh kem.</p>';}
  else{
    html+=res.map(function(r){
      return '<div class="border rounded-xl p-3 mb-2 flex gap-3 items-start"><div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><i class="fas fa-file-alt"></i></div><div class="flex-1"><div class="text-xs text-indigo-600 font-semibold">'+r.type+' · '+(r.format||'')+'</div><div class="font-medium text-sm">'+r.title+'</div><p class="text-xs text-slate-500 mt-1">'+(r.desc||'')+'</p>'+(r.link?'<a href="'+r.link+'" target="_blank" class="text-xs text-indigo-600 font-semibold mt-1 inline-block">Mo link →</a>':'')+'</div></div>';
    }).join('');
  }
  html+='</div>';
  if(detail)detail.innerHTML=html;
}
