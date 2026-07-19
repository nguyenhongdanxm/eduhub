// Admin + playlist TV lop 1-4
(function(){
  if(typeof KEYS==='undefined'){console.error('Load script.js first');return;}
  if(!KEYS.baiHoc)KEYS.baiHoc='eduhub_baihoc';
  function ensure(k,def){if(typeof getData==='function'&&!getData(k))setData(k,def||[]);}
  function mergePlaylist(list, verKey, ver){
    if(getData(verKey)===ver)return;
    var vids=getData(KEYS.videos)||[];
    var byYt={};vids.forEach(function(v){byYt[v.youtubeId]=v;});
    var next=vids.length?Math.max.apply(null,vids.map(function(v){return v.id;}))+1:1;
    list.forEach(function(p){
      if(byYt[p.youtubeId]){
        byYt[p.youtubeId].title=p.title;
        byYt[p.youtubeId].duration=p.duration;
        byYt[p.youtubeId].subjectId=p.subjectId;
        byYt[p.youtubeId].lop=p.lop;
      }else{p.id=next++;vids.push(p);}
    });
    setData(KEYS.videos,vids);
    setData(verKey,ver);
  }
  if(typeof getData==='function'){
    ensure(KEYS.baiHoc,typeof defaultBaiHoc!=='undefined'?defaultBaiHoc:[]);
    ensure(KEYS.keHoach,typeof defaultKeHoach!=='undefined'?defaultKeHoach:[]);
    ensure(KEYS.bieuMau,typeof defaultBieuMau!=='undefined'?defaultBieuMau:[]);
    ensure(KEYS.deThi,typeof defaultDeThi!=='undefined'?defaultDeThi:[]);
    ensure(KEYS.sangKien,typeof defaultSangKien!=='undefined'?defaultSangKien:[]);
    var playlistTV1=[
      {title:'Bai doc: Chuot nha va chuot dong',youtubeId:'8_hhplvTTpM',duration:'2:33',subjectId:1,lop:1},
      {title:'Bai doc: Kien va de men',youtubeId:'aa_9p3gRT8Y',duration:'2:18',subjectId:1,lop:1},
      {title:'Bai doc: Bai hoc dau tien cua tho con',youtubeId:'X9GkCQ9tthY',duration:'2:08',subjectId:1,lop:1},
      {title:'Bai doc: Qua va dan bo cau',youtubeId:'To8Bs2aM0B8',duration:'1:32',subjectId:1,lop:1},
      {title:'Bai doc: Mat ong cua gau con',youtubeId:'jrnInyzIu9Y',duration:'2:19',subjectId:1,lop:1},
      {title:'Bai doc: Su tich hoa cuc trang',youtubeId:'w6c8RoQ5mWY',duration:'2:27',subjectId:1,lop:1},
      {title:'Bai doc: Ga nau va vit xam',youtubeId:'CviyCcrXUzs',duration:'2:04',subjectId:1,lop:1},
      {title:'Bai doc: Hai nguoi ban va con gau',youtubeId:'xlTfKkNjIco',duration:'1:45',subjectId:1,lop:1},
      {title:'Bai doc: Cho soi va cuu non',youtubeId:'L33M5DO4PbE',duration:'2:02',subjectId:1,lop:1},
      {title:'Bai doc: Co chu khong biet quy tinh ban',youtubeId:'R1eY6UduXGA',duration:'2:17',subjectId:1,lop:1},
      {title:'Bai doc: Con qua thong minh',youtubeId:'bFeKjfje7Tw',duration:'2:07',subjectId:1,lop:1},
      {title:'Bai doc: Dan kien con ngoan ngoan',youtubeId:'N-9tUhU72io',duration:'2:09',subjectId:1,lop:1},
      {title:'Bai doc: Cau chuyen cua soi',youtubeId:'dNVOHDxpYQc',duration:'2:18',subjectId:1,lop:1},
      {title:'Bai doc: Chu be chan cuu',youtubeId:'cloBQE7JUWg',duration:'1:48',subjectId:1,lop:1},
      {title:'Bai doc: Kien va chim bo cau',youtubeId:'ouHAaavN93M',duration:'3:32',subjectId:1,lop:1},
      {title:'Bai doc: Den giao thong',youtubeId:'yLM3Sb9Ise0',duration:'2:20',subjectId:1,lop:1},
      {title:'Bai doc: Hoa yeu thuong',youtubeId:'E0YcCHvrQdQ',duration:'2:07',subjectId:1,lop:1},
      {title:'Bai doc: Rua tay truoc khi an',youtubeId:'H3eGOvyCs_0',duration:'1:23',subjectId:1,lop:1},
      {title:'Ke chuyen: Bup be va de men',youtubeId:'hmzHGAvWa6k',duration:'1:21',subjectId:1,lop:1},
      {title:'Bai hat: Bay sac cau vong',youtubeId:'hoPpZ-ij-xA',duration:'2:12',subjectId:1,lop:1},
      {title:'Bai doc: Neu khong may bi lac',youtubeId:'JGQqTryYUrc',duration:'1:17',subjectId:1,lop:1},
      {title:'Bai doc: Khi me vang nha',youtubeId:'QabYIm8dVAg',duration:'1:19',subjectId:1,lop:1},
      {title:'Bai hat: Loi chao di truoc',youtubeId:'OEtFE6GzT74',duration:'3:24',subjectId:1,lop:1},
      {title:'Nhac tri nho: Cau chuyen cua re',youtubeId:'Rk2uAYdme-w',duration:'3:14',subjectId:1,lop:1},
      {title:'Nhac tri nho: Gio ra choi',youtubeId:'8IvTNBAJxXs',duration:'2:20',subjectId:1,lop:1},
      {title:'Nhac tri nho: Cay bang va lop hoc',youtubeId:'f2fIi95F50U',duration:'2:26',subjectId:1,lop:1},
      {title:'Tap doc: Toi va cac ban',youtubeId:'FqYBu8pdLLY',duration:'3:10',subjectId:1,lop:1},
      {title:'Nhac tri nho: Ngoi nha',youtubeId:'lH40FbQATKs',duration:'2:58',subjectId:1,lop:1},
      {title:'Nhac tri nho: Ban cua gio',youtubeId:'KwY1hxcWTQo',duration:'2:29',subjectId:1,lop:1}
    ];
    var playlistTV2=[
      {title:'Nhac tri nho: Giot nuoc va bien lon',youtubeId:'_klXsAk4Exg',duration:'3:41',subjectId:1,lop:2},
      {title:'Nhac tri nho: Bai hat toi truong',youtubeId:'7vVmStlHO7w',duration:'2:55',subjectId:1,lop:2},
      {title:'Nhac tri nho: Hat thoc',youtubeId:'95H0lkEDplM',duration:'3:06',subjectId:1,lop:2},
      {title:'Tap doc: Bon mua',youtubeId:'J3frJPgYwdU',duration:'3:23',subjectId:1,lop:2},
      {title:'Tap doc: Su tich cay khoai lang',youtubeId:'_McOyTHOkas',duration:'2:46',subjectId:1,lop:2},
      {title:'Nhac tri nho: Luy tre',youtubeId:'MqwaUu1YNoA',duration:'1:42',subjectId:1,lop:2},
      {title:'Nhac tri nho: Ve chim',youtubeId:'pXdwx3ggqRM',duration:'2:35',subjectId:1,lop:2},
      {title:'Nhac tri nho: Su tu xuat quan',youtubeId:'RgHwNHZCqY8',duration:'2:51',subjectId:1,lop:2},
      {title:'Bai doc: Co non cuoi roi',youtubeId:'dG_nWWS6vwY',duration:'1:31',subjectId:1,lop:2},
      {title:'Bai doc: Nhung con sao bien',youtubeId:'C5uWHxx7N3g',duration:'1:09',subjectId:1,lop:2},
      {title:'Bai doc: Tam biet canh cam',youtubeId:'JMG3nU-V_Jc',duration:'1:26',subjectId:1,lop:2},
      {title:'Bai doc: Cay dua',youtubeId:'4_gl4UfRAVo',duration:'4:44',subjectId:1,lop:2},
      {title:'Bai doc: Canh dong que em',youtubeId:'PkPSRkUDaDk',duration:'2:15',subjectId:1,lop:2},
      {title:'Bai doc: Toi la hoc sinh lop 2',youtubeId:'vT9zaOmMLT8',duration:'1:32',subjectId:1,lop:2},
      {title:'Bai doc: Cau be ham hoc',youtubeId:'IiWzFpeRUo8',duration:'2:04',subjectId:1,lop:2},
      {title:'Bai hat: Co giao lop em',youtubeId:'VXvb9i1U6eA',duration:'2:10',subjectId:1,lop:2},
      {title:'Bai hat: Cai trong truong em',youtubeId:'GxOCchiCY6U',duration:'2:02',subjectId:1,lop:2},
      {title:'Bai hat: Yeu lam truong oi',youtubeId:'PC9XczUy8Tw',duration:'2:29',subjectId:1,lop:2},
      {title:'Bai hat: Em tap ve',youtubeId:'g20nAu-6yWE',duration:'2:39',subjectId:1,lop:2},
      {title:'Bai doc: Cuon sach cua em',youtubeId:'bacBtRVphpM',duration:'2:40',subjectId:1,lop:2},
      {title:'Bai doc: Khi trang sach mo ra',youtubeId:'pkP_Rou-TK4',duration:'2:50',subjectId:1,lop:2},
      {title:'Bai hat: Goi ban',youtubeId:'HHF3ntHHFIg',duration:'3:01',subjectId:1,lop:2},
      {title:'Bai hat: Em mang ve yeu thuong',youtubeId:'g1C8tG6JXqs',duration:'3:21',subjectId:1,lop:2},
      {title:'Bai hat: Tha dieu',youtubeId:'aYrxuEITRMw',duration:'2:35',subjectId:1,lop:2},
      {title:'Bai doc: Chu A va nhung nguoi ban',youtubeId:'PZjMSB2bLXo',duration:'2:29',subjectId:1,lop:2},
      {title:'Bai hat: Bo tre don khach',youtubeId:'lp7yFDowPqU',duration:'4:21',subjectId:1,lop:2},
      {title:'Bai doc: Chuyen bon mua',youtubeId:'KgDJP67p_88',duration:'1:32',subjectId:1,lop:2},
      {title:'Bai doc: Hoa mi hot',youtubeId:'qL1hbMx1nUs',duration:'1:33',subjectId:1,lop:2},
      {title:'Bai doc: Tet den roi',youtubeId:'euq2FvsTefM',duration:'2:00',subjectId:1,lop:2},
      {title:'Bai doc: Mua vang',youtubeId:'F5ZhwA0paIs',duration:'1:56',subjectId:1,lop:2},
      {title:'Bai doc: Khung long',youtubeId:'0kE8p7rm5as',duration:'1:57',subjectId:1,lop:2},
      {title:'Bai doc: Su tich cay thi la',youtubeId:'ULl9knleV_Q',duration:'2:22',subjectId:1,lop:2},
      {title:'Bai doc: Nhung cach chao doc dao',youtubeId:'a49WshpyhWc',duration:'1:27',subjectId:1,lop:2},
      {title:'Bai doc: Thu vien biet di',youtubeId:'kCbLOpXlJqQ',duration:'1:49',subjectId:1,lop:2},
      {title:'Bai doc: Cam on anh ha ma',youtubeId:'7ldKRDaQNi8',duration:'1:46',subjectId:1,lop:2},
      {title:'Bai doc: Tu chu bo cau den in-to-net',youtubeId:'f0MwGPJbazY',duration:'1:39',subjectId:1,lop:2},
      {title:'Bai doc: Mai An Tiem',youtubeId:'8Spa8mBXSow',duration:'1:44',subjectId:1,lop:2},
      {title:'Bai hat: Tieng choi tre',youtubeId:'LRyuGhbX0Dk',duration:'2:49',subjectId:1,lop:2},
      {title:'Bai doc: Chiec re da tron',youtubeId:'dglDrdJZeqY',duration:'1:14',subjectId:1,lop:2},
      {title:'Bai hat: Thu gui bo ngoai dao',youtubeId:'faRH3hBhbzc',duration:'2:01',subjectId:1,lop:2},
      {title:'Bai hat: Thu gui bo ngoai dao (ngan)',youtubeId:'D3feMMjYFP8',duration:'0:43',subjectId:1,lop:2}
    ];
    var playlistTV3=[
      {title:'Bai doc: Qua hong cua tho con',youtubeId:'49WrndRgzd8',duration:'2:06',subjectId:1,lop:3},
      {title:'Bai doc: Cay gao',youtubeId:'FQ0kDa9OvgY',duration:'2:07',subjectId:1,lop:3},
      {title:'Bai hat: Mai nha chung',youtubeId:'AAY6jrMeFk4',duration:'2:59',subjectId:1,lop:3},
      {title:'Bai hat: Mua he lap lanh',youtubeId:'CgYTAQU0rDQ',duration:'2:31',subjectId:1,lop:3},
      {title:'Bai doc: Tia nang cho ba',youtubeId:'BO3f6adqJcQ',duration:'2:11',subjectId:1,lop:3},
      {title:'Bai doc: Mon qua dac biet',youtubeId:'UjIS9oZs4uI',duration:'3:01',subjectId:1,lop:3},
      {title:'Bai hat: Ngay em vao doi',youtubeId:'qvDkvoNFJZE',duration:'2:39',subjectId:1,lop:3},
      {title:'Bai doc: Thu vien',youtubeId:'OUQGgYfrJKM',duration:'2:24',subjectId:1,lop:3},
      {title:'Bai doc: Cuoc hop cua chu viet',youtubeId:'PX2j1ya2oKw',duration:'2:01',subjectId:1,lop:3},
      {title:'Bai doc: Con vet xanh',youtubeId:'-88MgvQiTq0',duration:'2:59',subjectId:1,lop:3},
      {title:'Bai doc: Bai tap lam van',youtubeId:'wD9a1XAcyok',duration:'2:32',subjectId:1,lop:3},
      {title:'Bai doc: Loi giai toan dac biet',youtubeId:'Ty8LbvHOSFM',duration:'1:52',subjectId:1,lop:3},
      {title:'Bai doc: Con duong den truong',youtubeId:'5bW2c65fA0E',duration:'2:05',subjectId:1,lop:3},
      {title:'Ca khuc: Khi ca nha be ti',youtubeId:'tOPWbooJkmw',duration:'2:19',subjectId:1,lop:3},
      {title:'Bai doc: Ngay gap lai',youtubeId:'2uMagvnPEPw',duration:'2:11',subjectId:1,lop:3},
      {title:'Bai doc: A lo to day?',youtubeId:'JDu4BabimnE',duration:'1:56',subjectId:1,lop:3},
      {title:'Bai doc: Ngay nhu the nao la dep?',youtubeId:'YxisF8hwHTI',duration:'1:43',subjectId:1,lop:3},
      {title:'Bai doc: Dat nuoc la gi?',youtubeId:'kQcHSulAGwY',duration:'3:39',subjectId:1,lop:3},
      {title:'Nhac tri nho: Meo di cau ca',youtubeId:'M_IqI1BB0LY',duration:'4:04',subjectId:1,lop:3},
      {title:'Nhac tri nho: Ngay hoi rung xanh',youtubeId:'YpwQwTgR_So',duration:'2:52',subjectId:1,lop:3},
      {title:'Tap doc: Nhung sac mau thien nhien (P1)',youtubeId:'wbTY7Gh5bp8',duration:'2:28',subjectId:1,lop:3},
      {title:'Nhac tri nho: Mua',youtubeId:'gbMnAo2RMkQ',duration:'3:44',subjectId:1,lop:3},
      {title:'Nhac tri nho: Buoi sang',youtubeId:'m19b5Vyp0RE',duration:'2:26',subjectId:1,lop:3},
      {title:'Nhac tri nho: Toi yeu em toi',youtubeId:'b5AxwUfpG2M',duration:'3:08',subjectId:1,lop:3},
      {title:'Nhac tri nho: Nguong cua',youtubeId:'HfWT78iZjkw',duration:'3:37',subjectId:1,lop:3},
      {title:'Bai hat: Di hoc vui sao',youtubeId:'SYDzUJjDqcU',duration:'3:27',subjectId:1,lop:3},
      {title:'Nhac tri nho: Ban tay co giao',youtubeId:'clxqwWBjPYE',duration:'2:52',subjectId:1,lop:3},
      {title:'Nhac tri nho: Ba em',youtubeId:'kA20lTtbCLk',duration:'4:41',subjectId:1,lop:3},
      {title:'Nhac tri nho: Vao bep that vui',youtubeId:'RC3488Z91GM',duration:'2:59',subjectId:1,lop:3},
      {title:'Nhac tri nho: Em yeu mua he',youtubeId:'xZuZ0zC_WL4',duration:'4:01',subjectId:1,lop:3}
    ];
    var playlistTV4=[
      {title:'Bai doc: Vet phan tren mat ban',youtubeId:'YJ2iVNR3YD4',duration:'1:57',subjectId:1,lop:4},
      {title:'Bai hat: Bon mua mo uoc',youtubeId:'-7uMZaVki7g',duration:'3:54',subjectId:1,lop:4},
      {title:'Bai hat: Ve mau',youtubeId:'fNKJqGo0fXU',duration:'5:19',subjectId:1,lop:4},
      {title:'Bai doc: Con chim chien chien',youtubeId:'YnPeqLQ8RZ8',duration:'4:15',subjectId:1,lop:4},
      {title:'Bai doc: Truoc ngay xa que',youtubeId:'QVg44mle5cc',duration:'3:18',subjectId:1,lop:4},
      {title:'Bai doc: Nha phat minh 6 tuoi',youtubeId:'8rdTenfYtbM',duration:'2:36',subjectId:1,lop:4},
      {title:'Bai doc: Tap lam van',youtubeId:'dqzAOBYI8Y4',duration:'3:07',subjectId:1,lop:4},
      {title:'Bai doc: Tieng noi cua co cay',youtubeId:'Kfab_EDHrqE',duration:'2:48',subjectId:1,lop:4},
      {title:'Bai hat: Bau troi trong qua trung',youtubeId:'LlC2MzJZdCU',duration:'2:58',subjectId:1,lop:4},
      {title:'Bai hat: Gat chu tren non',youtubeId:'igxXfb0zTqQ',duration:'4:44',subjectId:1,lop:4},
      {title:'Bai doc: Thi nhac',youtubeId:'8zpWkzeG-dA',duration:'2:52',subjectId:1,lop:4},
      {title:'Bai hat: Tuoi ngua',youtubeId:'MH1kdhpYjK8',duration:'4:16',subjectId:1,lop:4},
      {title:'Bai hat: Dieu ky dieu',youtubeId:'wEp-wfStVIk',duration:'2:25',subjectId:1,lop:4},
      {title:'Bai hat: Di hoi chua Huong',youtubeId:'f16Z3_Mvgko',duration:'4:45',subjectId:1,lop:4},
      {title:'Bai hat: Buoc mua xuan',youtubeId:'bYOh9bNQ8p8',duration:'3:37',subjectId:1,lop:4},
      {title:'Bai hat: Ngua bien phong',youtubeId:'WcPR3SmoTp4',duration:'3:36',subjectId:1,lop:4},
      {title:'Nhac tri nho: Trong loi me hat',youtubeId:'Fvg1-lEmWRo',duration:'3:19',subjectId:1,lop:4},
      {title:'Nhac tri nho: Cam xuc Truong Sa',youtubeId:'qA7XnAaPmFM',duration:'5:24',subjectId:1,lop:4},
      {title:'Nhac tri nho: Sang thang nam',youtubeId:'y2HQMA0dqT8',duration:'2:35',subjectId:1,lop:4},
      {title:'Tap doc: Song de yeu thuong (P1)',youtubeId:'CAvbm8qDt4Q',duration:'3:09',subjectId:1,lop:4},
      {title:'Nhac tri nho: Qua ngot cuoi mua',youtubeId:'WAGSrFW2nGw',duration:'3:06',subjectId:1,lop:4},
      {title:'Nhac tri nho: Neu chung minh co phep la',youtubeId:'aRszb3aUOtU',duration:'4:13',subjectId:1,lop:4}
    ];
    mergePlaylist(playlistTV1,'eduhub_playlist_tv1_v2',3);
    mergePlaylist(playlistTV2,'eduhub_playlist_tv2_v1',1);
    mergePlaylist(playlistTV3,'eduhub_playlist_tv3_v1',1);
    mergePlaylist(playlistTV4,'eduhub_playlist_tv4_v1',1);
  }
})();

window._editState={type:null,id:null};
function nextId(list){return list.length?Math.max.apply(null,list.map(function(x){return x.id;}))+1:1}
function norm(s){return(s||'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function matchQ(q){if(!q)return true;var n=norm(q);var fields=Array.prototype.slice.call(arguments,1);return fields.some(function(f){return norm(f).indexOf(n)>=0;})}
function listRow(title,sub,type,id){return '<div class="bg-white rounded-xl p-4 border flex justify-between items-start gap-3"><div class="min-w-0"><div class="font-medium text-sm">'+esc(title)+'</div><div class="text-xs text-gray-500 mt-0.5">'+esc(sub)+'</div></div><div class="flex gap-1 flex-shrink-0"><button onclick="editItem(\''+type+'\','+id+')" class="text-indigo-600 px-2 py-1 rounded hover:bg-indigo-50" title="Sua"><i class="fas fa-pen text-sm"></i></button><button onclick="deleteItem(\''+type+'\','+id+')" class="text-red-500 px-2 py-1 rounded hover:bg-red-50" title="Xoa"><i class="fas fa-trash text-sm"></i></button></div></div>';}
function esc(s){return String(s||'').replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>').replace(/"/g,'"')}
function adminSearchVal(){return document.getElementById('adminSearch')?document.getElementById('adminSearch').value:'';}
function loadAdminData(){var q=adminSearchVal();var subjects=getData(KEYS.subjects)||[];var resources=getData(KEYS.resources)||[];var videos=getData(KEYS.videos)||[];var baiHoc=getData(KEYS.baiHoc)||[];if(document.getElementById('statTopics'))document.getElementById('statTopics').textContent=subjects.length;if(document.getElementById('statVideos'))document.getElementById('statVideos').textContent=videos.length;if(document.getElementById('statDocs'))document.getElementById('statDocs').textContent=resources.length;if(document.getElementById('statBai'))document.getElementById('statBai').textContent=baiHoc.length;var opts='<option value="">-- Chon mon --</option>'+subjects.map(function(s){return '<option value="'+s.id+'">'+s.name+'</option>';}).join('');['resourceSubject','videoTopic','baiSubject','filterBaiSubject'].forEach(function(id){var el=document.getElementById(id);if(!el)return;var cur=el.value;if(id==='filterBaiSubject')el.innerHTML='<option value="">Tat ca mon</option>'+subjects.map(function(s){return '<option value="'+s.id+'">'+s.name+'</option>';}).join('');else el.innerHTML=opts;if(cur)el.value=cur;});var topicsEl=document.getElementById('adminTopicsList');if(topicsEl){var list=subjects.filter(function(s){return matchQ(q,s.name,s.desc);});topicsEl.innerHTML=list.map(function(s){return listRow(s.name,s.desc||'','subjects',s.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var baiFiltered=baiHoc.slice();var fSub=document.getElementById('filterBaiSubject')?document.getElementById('filterBaiSubject').value:'';var fLop=document.getElementById('filterBaiLop')?document.getElementById('filterBaiLop').value:'';if(fSub)baiFiltered=baiFiltered.filter(function(b){return b.subjectId==fSub;});if(fLop)baiFiltered=baiFiltered.filter(function(b){return b.lop==fLop;});baiFiltered=baiFiltered.filter(function(b){return matchQ(q,b.title,b.content);});baiFiltered.sort(function(a,b){return (a.lop-b.lop)||(a.stt-b.stt);});var baiEl=document.getElementById('adminBaiList');if(baiEl)baiEl.innerHTML=baiFiltered.map(function(b){return listRow(b.title,getSubjectName(b.subjectId)+' · Lop '+b.lop+' · STT '+b.stt,'baiHoc',b.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';var resEl=document.getElementById('adminResourcesList');if(resEl){var list=resources.filter(function(r){return matchQ(q,r.title,r.desc,r.content,r.type);});resEl.innerHTML=list.map(function(r){return listRow(r.title,getSubjectName(r.subjectId)+' · Lop '+(r.lop||'?')+' · '+r.type+(r.link?' · co link':''),'resources',r.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var videosEl=document.getElementById('adminVideosList');if(videosEl){var list=videos.filter(function(v){return matchQ(q,v.title,v.youtubeId);});videosEl.innerHTML=list.map(function(v){return listRow(v.title,'Lop '+(v.lop||'?')+' · '+v.youtubeId,'videos',v.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var vanBan=getData(KEYS.vanBan)||[];var vbEl=document.getElementById('adminVanBanList');if(vbEl){var list=vanBan.filter(function(v){return matchQ(q,v.title,v.content,v.type);});vbEl.innerHTML=list.map(function(v){return listRow(v.title,v.type+' · '+v.year,'vanBan',v.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var faq=getData(KEYS.faq)||[];var faqEl=document.getElementById('adminFaqList');if(faqEl){var list=faq.filter(function(f){return matchQ(q,f.q,f.a);});faqEl.innerHTML=list.map(function(f){return listRow(f.q,'','faq',f.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var apps=getData(KEYS.apps)||[];var appsEl=document.getElementById('adminAppsList');if(appsEl){var list=apps.filter(function(a){return matchQ(q,a.name,a.desc,a.detail);});appsEl.innerHTML=list.map(function(a){return listRow(a.name,a.url||'','apps',a.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var kh=getData(KEYS.keHoach)||[];var khEl=document.getElementById('adminKeHoachList');if(khEl){var list=kh.filter(function(x){return matchQ(q,x.title,x.content,x.type);});khEl.innerHTML=list.map(function(x){return listRow(x.title,x.type||'','keHoach',x.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var bm=getData(KEYS.bieuMau)||[];var bmEl=document.getElementById('adminBieuMauList');if(bmEl){var list=bm.filter(function(x){return matchQ(q,x.title,x.content,x.type);});bmEl.innerHTML=list.map(function(x){return listRow(x.title,x.type||'','bieuMau',x.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var dt=getData(KEYS.deThi)||[];var dtEl=document.getElementById('adminDeThiList');if(dtEl){var list=dt.filter(function(x){return matchQ(q,x.title,x.content,x.mon);});dtEl.innerHTML=list.map(function(x){return listRow(x.title,(x.mon||'')+' · Lop '+(x.lop||''),'deThi',x.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}var sk=getData(KEYS.sangKien)||[];var skEl=document.getElementById('adminSangKienList');if(skEl){var list=sk.filter(function(x){return matchQ(q,x.title,x.content,x.mon);});skEl.innerHTML=list.map(function(x){return listRow(x.title,x.mon||'','sangKien',x.id);}).join('')||'<p class="text-gray-500 text-sm">Khong co ket qua.</p>';}updateEditBadge();}
function updateEditBadge(){var el=document.getElementById('editModeBadge');if(!el)return;if(_editState.id){el.classList.remove('hidden');el.querySelector('span').textContent='Dang sua #'+_editState.id+' ('+_editState.type+')';}else el.classList.add('hidden');}
function clearEdit(){_editState={type:null,id:null};updateEditBadge();}
function setVal(id,v){var e=document.getElementById(id);if(e)e.value=v!=null?v:'';}
function editItem(type,id){var keyMap={subjects:KEYS.subjects,resources:KEYS.resources,videos:KEYS.videos,vanBan:KEYS.vanBan,faq:KEYS.faq,apps:KEYS.apps,baiHoc:KEYS.baiHoc,keHoach:KEYS.keHoach,bieuMau:KEYS.bieuMau,deThi:KEYS.deThi,sangKien:KEYS.sangKien};var key=keyMap[type];if(!key)return;var item=(getData(key)||[]).find(function(x){return x.id==id;});if(!item)return alert('Khong tim thay');_editState={type:type,id:item.id};var tabMap={subjects:'mon',baiHoc:'bai',resources:'tn',videos:'video',vanBan:'vb',faq:'faq',apps:'app',keHoach:'kh',bieuMau:'bm',deThi:'dt',sangKien:'sk'};if(tabMap[type]&&typeof showTab==='function')showTab(tabMap[type]);if(type==='subjects'){setVal('topicName',item.name);setVal('topicDesc',item.desc);setVal('topicIcon',item.icon);}if(type==='baiHoc'){setVal('baiSubject',item.subjectId);setVal('baiLop',item.lop);setVal('baiStt',item.stt);setVal('baiTitle',item.title);setVal('baiContent',item.content);}if(type==='resources'){setVal('resourceTitle',item.title);setVal('resourceSubject',item.subjectId);setVal('resourceLop',item.lop);setVal('resourceType',item.type);setVal('resourceFormat',item.format);setVal('resourceLink',item.link);setVal('resourceDesc',item.desc);setVal('resourceContent',item.content);}if(type==='videos'){setVal('videoTitle',item.title);setVal('videoId',item.youtubeId);setVal('videoDuration',item.duration);setVal('videoTopic',item.subjectId);setVal('videoLop',item.lop);}if(type==='vanBan'){setVal('vbTitle',item.title);setVal('vbYear',item.year);setVal('vbType',item.type);setVal('vbLink',item.link);setVal('vbContent',item.content);}if(type==='faq'){setVal('faqQ',item.q);setVal('faqA',item.a);}if(type==='apps'){setVal('appName',item.name);setVal('appUrl',item.url);setVal('appDesc',item.desc);setVal('appIcon',item.icon);setVal('appDetail',item.detail);}if(type==='keHoach'){setVal('khTitle',item.title);setVal('khType',item.type);setVal('khLink',item.link);setVal('khContent',item.content);}if(type==='bieuMau'){setVal('bmTitle',item.title);setVal('bmType',item.type);setVal('bmLink',item.link);setVal('bmContent',item.content);}if(type==='deThi'){setVal('dtTitle',item.title);setVal('dtMon',item.mon);setVal('dtLop',item.lop);setVal('dtLink',item.link);setVal('dtContent',item.content);}if(type==='sangKien'){setVal('skTitle',item.title);setVal('skMon',item.mon);setVal('skLink',item.link);setVal('skContent',item.content);}updateEditBadge();window.scrollTo({top:0,behavior:'smooth'});}
function upsert(key,obj,type){var list=getData(key)||[];if(_editState.type===type&&_editState.id){list=list.map(function(x){return x.id==_editState.id?Object.assign({},x,obj,{id:_editState.id}):x;});clearEdit();setData(key,list);alert('Da cap nhat!');}else{list.push(Object.assign({},obj,{id:nextId(list)}));setData(key,list);alert('Da them!');}loadAdminData();}
function saveSubject(){var name=document.getElementById('topicName')&&document.getElementById('topicName').value.trim();var desc=(document.getElementById('topicDesc')&&document.getElementById('topicDesc').value.trim())||'';var icon=(document.getElementById('topicIcon')&&document.getElementById('topicIcon').value.trim())||'fa-folder';if(!name)return alert('Nhap ten mon');upsert(KEYS.subjects,{name:name,desc:desc,icon:icon,color:'indigo'},'subjects');}
function saveBaiHoc(){var title=document.getElementById('baiTitle')&&document.getElementById('baiTitle').value.trim();var content=(document.getElementById('baiContent')&&document.getElementById('baiContent').value.trim())||'';var subjectId=Number(document.getElementById('baiSubject')&&document.getElementById('baiSubject').value);var lop=Number(document.getElementById('baiLop')&&document.getElementById('baiLop').value)||1;var stt=Number(document.getElementById('baiStt')&&document.getElementById('baiStt').value)||1;if(!title||!subjectId)return alert('Nhap ten bai va chon mon');upsert(KEYS.baiHoc,{subjectId:subjectId,lop:lop,stt:stt,title:title,content:content},'baiHoc');setVal('baiTitle','');setVal('baiContent','');}
function saveResource(){var title=document.getElementById('resourceTitle')&&document.getElementById('resourceTitle').value.trim();var type=(document.getElementById('resourceType')&&document.getElementById('resourceType').value)||'Giao an';var format=(document.getElementById('resourceFormat')&&document.getElementById('resourceFormat').value)||'Word';var subjectId=document.getElementById('resourceSubject')&&document.getElementById('resourceSubject').value;var desc=(document.getElementById('resourceDesc')&&document.getElementById('resourceDesc').value.trim())||'';var content=(document.getElementById('resourceContent')&&document.getElementById('resourceContent').value.trim())||'';var link=(document.getElementById('resourceLink')&&document.getElementById('resourceLink').value.trim())||'';var lop=Number(document.getElementById('resourceLop')&&document.getElementById('resourceLop').value)||1;var fileInput=document.getElementById('resourceFile');var fileName=fileInput&&fileInput.files&&fileInput.files[0]?fileInput.files[0].name:'';if(!title||!subjectId)return alert('Nhap tieu de va chon mon');upsert(KEYS.resources,{title:title,type:type,format:format,subjectId:Number(subjectId),lop:lop,desc:desc,content:content,link:link,fileName:fileName},'resources');}
function saveVideo(){var title=document.getElementById('videoTitle')&&document.getElementById('videoTitle').value.trim();var yt=document.getElementById('videoId')&&document.getElementById('videoId').value.trim();var duration=(document.getElementById('videoDuration')&&document.getElementById('videoDuration').value.trim())||'';var subjectId=document.getElementById('videoTopic')&&document.getElementById('videoTopic').value;var lop=Number(document.getElementById('videoLop')&&document.getElementById('videoLop').value)||1;if(!title||!yt)return alert('Nhap tieu de va YouTube');var m=yt.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);if(m)yt=m[1];upsert(KEYS.videos,{title:title,youtubeId:yt,duration:duration,subjectId:subjectId?Number(subjectId):null,lop:lop},'videos');}
function saveVanBan(){var title=document.getElementById('vbTitle')&&document.getElementById('vbTitle').value.trim();var type=(document.getElementById('vbType')&&document.getElementById('vbType').value)||'Cong van';var year=(document.getElementById('vbYear')&&document.getElementById('vbYear').value)||'';var content=(document.getElementById('vbContent')&&document.getElementById('vbContent').value.trim())||'';var link=(document.getElementById('vbLink')&&document.getElementById('vbLink').value.trim())||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.vanBan,{title:title,type:type,year:year,content:content,link:link},'vanBan');}
function saveFaq(){var q=document.getElementById('faqQ')&&document.getElementById('faqQ').value.trim();var a=document.getElementById('faqA')&&document.getElementById('faqA').value.trim();if(!q||!a)return alert('Nhap du');upsert(KEYS.faq,{q:q,a:a},'faq');}
function saveApp(){var name=document.getElementById('appName')&&document.getElementById('appName').value.trim();var desc=(document.getElementById('appDesc')&&document.getElementById('appDesc').value.trim())||'';var url=(document.getElementById('appUrl')&&document.getElementById('appUrl').value.trim())||'#';var icon=(document.getElementById('appIcon')&&document.getElementById('appIcon').value.trim())||'fa-link';var detail=(document.getElementById('appDetail')&&document.getElementById('appDetail').value.trim())||desc;if(!name)return alert('Nhap ten');upsert(KEYS.apps,{name:name,desc:desc,url:url,icon:icon,detail:detail},'apps');}
function saveKeHoach(){var title=document.getElementById('khTitle')&&document.getElementById('khTitle').value.trim();var type=(document.getElementById('khType')&&document.getElementById('khType').value)||'Nam hoc';var content=(document.getElementById('khContent')&&document.getElementById('khContent').value.trim())||'';var link=(document.getElementById('khLink')&&document.getElementById('khLink').value.trim())||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.keHoach,{title:title,type:type,content:content,link:link},'keHoach');}
function saveBieuMau(){var title=document.getElementById('bmTitle')&&document.getElementById('bmTitle').value.trim();var type=(document.getElementById('bmType')&&document.getElementById('bmType').value)||'So sach';var content=(document.getElementById('bmContent')&&document.getElementById('bmContent').value.trim())||'';var link=(document.getElementById('bmLink')&&document.getElementById('bmLink').value.trim())||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.bieuMau,{title:title,type:type,content:content,link:link},'bieuMau');}
function saveDeThi(){var title=document.getElementById('dtTitle')&&document.getElementById('dtTitle').value.trim();var mon=(document.getElementById('dtMon')&&document.getElementById('dtMon').value.trim())||'';var lop=(document.getElementById('dtLop')&&document.getElementById('dtLop').value)||'1';var content=(document.getElementById('dtContent')&&document.getElementById('dtContent').value.trim())||'';var link=(document.getElementById('dtLink')&&document.getElementById('dtLink').value.trim())||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.deThi,{title:title,mon:mon,lop:lop,content:content,link:link},'deThi');}
function saveSangKien(){var title=document.getElementById('skTitle')&&document.getElementById('skTitle').value.trim();var mon=(document.getElementById('skMon')&&document.getElementById('skMon').value.trim())||'';var content=(document.getElementById('skContent')&&document.getElementById('skContent').value.trim())||'';var link=(document.getElementById('skLink')&&document.getElementById('skLink').value.trim())||'';if(!title)return alert('Nhap tieu de');upsert(KEYS.sangKien,{title:title,mon:mon,content:content,link:link},'sangKien');}
function deleteItem(type,id){if(!confirm('Xoa muc nay?'))return;var keyMap={subjects:KEYS.subjects,resources:KEYS.resources,videos:KEYS.videos,vanBan:KEYS.vanBan,faq:KEYS.faq,apps:KEYS.apps,baiHoc:KEYS.baiHoc,keHoach:KEYS.keHoach,bieuMau:KEYS.bieuMau,deThi:KEYS.deThi,sangKien:KEYS.sangKien};var key=keyMap[type];if(!key)return;setData(key,(getData(key)||[]).filter(function(i){return i.id!=id;}));if(_editState.id==id)clearEdit();loadAdminData();if(document.getElementById('subjectsList'))renderHomepage();}
function saveTopic(){saveSubject();}function saveDoc(){alert('Dung tab Tai nguyen');}function cancelEditTopic(){clearEdit();}function cancelEditVideo(){clearEdit();}function cancelEditDoc(){clearEdit();}function editTopic(){}function editVideo(){}function editDoc(){}function savePayment(){alert('Da luu!');}
function siteSearch(q){q=(q||'').trim();var box=document.getElementById('searchResults');if(!box)return;if(!q){box.classList.add('hidden');box.innerHTML='';return;}initData();var results=[];(getData(KEYS.subjects)||[]).forEach(function(s){if(matchQ(q,s.name,s.desc))results.push({type:'Mon hoc',title:s.name,href:'mon.html?id='+s.id,sub:s.desc});});(getData(KEYS.baiHoc)||[]).forEach(function(b){if(matchQ(q,b.title,b.content))results.push({type:'Bai hoc L'+b.lop,title:b.title,href:'mon.html?id='+b.subjectId,sub:(b.content||'').slice(0,80)});});(getData(KEYS.resources)||[]).forEach(function(r){if(matchQ(q,r.title,r.desc,r.content))results.push({type:r.type||'Tai nguyen',title:r.title,href:'mon.html?id='+r.subjectId,sub:r.desc});});(getData(KEYS.videos)||[]).forEach(function(v){if(matchQ(q,v.title))results.push({type:'Video',title:v.title,href:'video.html',sub:'Lop '+(v.lop||'')});});(getData(KEYS.vanBan)||[]).forEach(function(v){if(matchQ(q,v.title,v.content))results.push({type:'Van ban',title:v.title,href:'#van-ban',sub:v.type});});(getData(KEYS.faq)||[]).forEach(function(f){if(matchQ(q,f.q,f.a))results.push({type:'Hoi dap',title:f.q,href:'#van-ban',sub:(f.a||'').slice(0,60)});});(getData(KEYS.deThi)||[]).forEach(function(d){if(matchQ(q,d.title,d.content,d.mon))results.push({type:'De thi',title:d.title,href:'#de-thi',sub:(d.mon||'')+' Lop '+(d.lop||'')});});(getData(KEYS.keHoach)||[]).forEach(function(k){if(matchQ(q,k.title,k.content))results.push({type:'Ke hoach',title:k.title,href:'#ke-hoach',sub:k.type});});(getData(KEYS.bieuMau)||[]).forEach(function(k){if(matchQ(q,k.title,k.content))results.push({type:'Bieu mau',title:k.title,href:'#bieu-mau',sub:k.type});});(getData(KEYS.apps)||[]).forEach(function(a){if(matchQ(q,a.name,a.desc))results.push({type:'Ung dung',title:a.name,href:'#ung-dung',sub:a.desc});});(getData(KEYS.sangKien)||[]).forEach(function(s){if(matchQ(q,s.title,s.content))results.push({type:'Sang kien',title:s.title,href:'#sang-kien',sub:s.mon});});box.classList.remove('hidden');if(!results.length){box.innerHTML='<div class="p-4 text-sm text-slate-500">Khong tim thay</div>';return;}box.innerHTML='<div class="p-2 text-xs text-slate-400 font-semibold">'+results.length+' ket qua</div>'+results.slice(0,30).map(function(r){return '<a href="'+r.href+'" class="block px-4 py-3 hover:bg-indigo-50 border-t border-slate-100"><div class="text-[10px] font-bold text-indigo-500 uppercase">'+esc(r.type)+'</div><div class="font-semibold text-sm">'+esc(r.title)+'</div><div class="text-xs text-slate-500 truncate">'+esc(r.sub||'')+'</div></a>';}).join('');}
function filterLessons(q){if(typeof openGrade!=='function'||!window._monState||!_monState.grade)return;var list=(getData(KEYS.baiHoc)||[]).filter(function(b){return b.subjectId==_monState.subjectId&&b.lop==_monState.grade;}).filter(function(b){return matchQ(q,b.title,b.content);}).sort(function(a,b){return a.stt-b.stt;});var el=document.getElementById('lessonsList');if(!el)return;if(!list.length){el.innerHTML='<div class="bg-white border rounded-xl p-6 text-slate-400">Khong co bai khop.</div>';return;}el.innerHTML=list.map(function(b){return '<a href="javascript:void(0)" onclick="openBai('+b.id+')" class="bg-white border rounded-xl p-4 flex items-center gap-3 card-hover block hover:border-indigo-300"><div class="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">'+(b.stt===0?'★':b.stt)+'</div><div class="flex-1 min-w-0"><div class="font-semibold text-sm">'+b.title+'</div><div class="text-xs text-slate-400 truncate">'+(b.content||'').slice(0,80)+'…</div></div><i class="fas fa-chevron-right text-slate-300"></i></a>';}).join('');}
document.addEventListener('DOMContentLoaded',function(){if(typeof initData==='function')initData();if(document.getElementById('statTopics')||document.getElementById('adminTopicsList')||document.getElementById('adminBaiList')){if(typeof loadAdminData==='function')loadAdminData();}var as=document.getElementById('adminSearch');if(as)as.addEventListener('input',function(){loadAdminData();});var ss=document.getElementById('siteSearchInput');if(ss){ss.addEventListener('input',function(){siteSearch(ss.value);});ss.addEventListener('focus',function(){if(ss.value)siteSearch(ss.value);});document.addEventListener('click',function(e){var box=document.getElementById('searchResults');if(box&&!box.contains(e.target)&&e.target!==ss)box.classList.add('hidden');});}});
