/* Paste cleaner - keep text + images from news sites */
(function(){
  var ALLOW = {
    P:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,
    UL:1,OL:1,LI:1,
    TABLE:1,THEAD:1,TBODY:1,TR:1,TH:1,TD:1,
    IMG:1,A:1,BR:1,HR:1,
    STRONG:1,B:1,EM:1,I:1,U:1,S:1,SUB:1,SUP:1,
    BLOCKQUOTE:1,FIGURE:1,FIGCAPTION:1,
    PRE:1,CODE:1,SPAN:1,DIV:1,PICTURE:1
  };

  function isPlaceholderSrc(s){
    if(!s) return true;
    s = s.trim();
    if(!s) return true;
    // 1x1 gif / blank / svg placeholder / base64 tiny
    if(/^data:image\/(gif|svg|png)/i.test(s) && s.length < 500) return true;
    if(/spacer|pixel|blank|placeholder|transparent|1x1|loading\.gif|grey\.gif/i.test(s)) return true;
    return false;
  }

  function absUrl(src, base){
    if(!src) return '';
    src = String(src).trim().replace(/^['"]|['"]$/g,'');
    if(!src) return '';
    if(/^data:image\//i.test(src)) return src;
    if(/^https?:\/\//i.test(src)) return src;
    if(src.indexOf('//')===0) return 'https:'+src;
    try{ return new URL(src, base || location.href).href; }catch(e){ return src; }
  }

  function fromSrcset(ss){
    if(!ss) return '';
    var parts = ss.split(',').map(function(p){
      return p.trim().split(/\s+/)[0];
    }).filter(function(u){ return u && !isPlaceholderSrc(u); });
    return parts.length ? parts[parts.length-1] : '';
  }

  function pickImgSrc(el){
    // Prefer real lazy-load URLs OVER placeholder src
    var candidates = [];
    var lazyAttrs = [
      'data-src','data-original','data-lazy-src','data-lazy','data-url',
      'data-img','data-image','data-actualsrc','data-src-large',
      'data-hi-res-src','data-original-src','data-large_image','data-full-url'
    ];
    lazyAttrs.forEach(function(a){
      var v = el.getAttribute(a);
      if(v && !isPlaceholderSrc(v)) candidates.push(v.trim());
    });
    // srcset variants
    var ss = fromSrcset(el.getAttribute('data-srcset') || el.getAttribute('srcset') || '');
    if(ss) candidates.push(ss);

    // parent <picture> sources
    if(el.parentNode && el.parentNode.tagName==='PICTURE'){
      var sources = el.parentNode.querySelectorAll('source');
      for(var i=0;i<sources.length;i++){
        var s2 = fromSrcset(sources[i].getAttribute('data-srcset') || sources[i].getAttribute('srcset') || '');
        if(s2) candidates.push(s2);
      }
    }

    // finally normal src if not placeholder
    var src = el.getAttribute('src');
    if(src && !isPlaceholderSrc(src)) candidates.push(src.trim());

    // background-image on element
    var st = el.getAttribute('style') || '';
    var m = st.match(/background-image\s*:\s*url\(\s*['"]?([^'"\)]+)/i);
    if(m && !isPlaceholderSrc(m[1])) candidates.push(m[1].trim());

    return candidates[0] || '';
  }

  function isJunk(cls, id){
    var t = ((cls||'')+' '+(id||'')).toLowerCase();
    return /\b(share|social|comment|related|ads?|banner|cookie|popup|newsletter|subscribe|menu|nav-|toolbar|breadcrumb|widget|sidebar)\b/.test(t);
  }

  function makeImg(src, alt, base){
    var url = absUrl(src, base);
    if(!url || isPlaceholderSrc(url)) return null;
    var img = document.createElement('img');
    img.setAttribute('src', url);
    if(alt) img.setAttribute('alt', alt);
    img.setAttribute('loading','lazy');
    img.style.cssText = 'max-width:100%;height:auto;display:block;margin:12px 0';
    return img;
  }

  function cleanNode(node, base){
    if(node.nodeType === 3) return document.createTextNode(node.nodeValue);
    if(node.nodeType !== 1) return null;

    var tag = node.tagName;
    if(/^(SCRIPT|STYLE|NOSCRIPT|IFRAME|SVG|BUTTON|INPUT|FORM|NAV|HEADER|FOOTER|ASIDE|META|LINK|OBJECT|EMBED|VIDEO|AUDIO)$/.test(tag)){
      return null;
    }

    var cls = (typeof node.className==='string') ? node.className : '';
    if(isJunk(cls, node.id||'')) return null;

    // PICTURE → extract img
    if(tag==='PICTURE'){
      var im = node.querySelector('img');
      return im ? cleanNode(im, base) : null;
    }

    // IMG
    if(tag==='IMG'){
      var src = pickImgSrc(node);
      if(!src) return null;
      var w = parseInt(node.getAttribute('width')||'0',10);
      var h = parseInt(node.getAttribute('height')||'0',10);
      if((w>0&&w<4)||(h>0&&h<4)) return null;
      return makeImg(src, node.getAttribute('alt')||'', base);
    }

    // DIV with only background-image (hero image blocks)
    if(tag==='DIV' || tag==='SPAN' || tag==='A'){
      var st = node.getAttribute('style') || '';
      var bm = st.match(/background-image\s*:\s*url\(\s*['"]?([^'"\)]+)/i);
      if(bm && !isPlaceholderSrc(bm[1]) && !(node.textContent||'').trim()){
        return makeImg(bm[1], '', base);
      }
    }

    if(!ALLOW[tag]){
      // unwrap children (keep images inside unknown wrappers)
      var frag = document.createDocumentFragment();
      Array.prototype.forEach.call(node.childNodes, function(ch){
        var c = cleanNode(ch, base);
        if(!c) return;
        if(c.nodeType===11) while(c.firstChild) frag.appendChild(c.firstChild);
        else frag.appendChild(c);
      });
      return frag.childNodes.length ? frag : null;
    }

    var outTag = tag;
    if(tag==='DIV'){
      var kids = node.children || [];
      // single image wrapper
      if(kids.length===1 && (kids[0].tagName==='IMG' || kids[0].tagName==='PICTURE' || kids[0].tagName==='FIGURE')){
        return cleanNode(kids[0], base);
      }
      var hasBlock = false;
      Array.prototype.forEach.call(kids, function(ch){
        if(/^(P|H[1-6]|UL|OL|TABLE|BLOCKQUOTE|FIGURE|DIV|PRE|IMG|PICTURE)$/.test(ch.tagName)) hasBlock = true;
      });
      outTag = hasBlock ? 'DIV' : 'P';
    }

    var el = document.createElement(outTag.toLowerCase());

    if(tag==='A'){
      var href = node.getAttribute('href');
      if(href && !/^javascript:/i.test(href)){
        el.setAttribute('href', absUrl(href, base));
        el.setAttribute('target','_blank');
        el.setAttribute('rel','noopener');
      }
    }
    if(tag==='TD'||tag==='TH'){
      var cs = node.getAttribute('colspan');
      var rs = node.getAttribute('rowspan');
      if(cs) el.setAttribute('colspan', cs);
      if(rs) el.setAttribute('rowspan', rs);
    }

    var st2 = node.getAttribute('style') || '';
    var keep = [];
    if(/text-align\s*:\s*(left|right|center|justify)/i.test(st2))
      keep.push(st2.match(/text-align\s*:\s*(left|right|center|justify)/i)[0]);
    if(/font-weight\s*:\s*(bold|700|600)/i.test(st2)) keep.push('font-weight:bold');
    if(/font-style\s*:\s*italic/i.test(st2)) keep.push('font-style:italic');
    if(keep.length) el.setAttribute('style', keep.join(';'));

    Array.prototype.forEach.call(node.childNodes, function(ch){
      var c = cleanNode(ch, base);
      if(!c) return;
      if(c.nodeType===11) while(c.firstChild) el.appendChild(c.firstChild);
      else el.appendChild(c);
    });

    // also check if this block has background image + text → prepend img
    if((tag==='DIV'||tag==='P'||tag==='FIGURE') && !(el.querySelector && el.querySelector('img'))){
      var st3 = node.getAttribute('style') || '';
      var bm2 = st3.match(/background-image\s*:\s*url\(\s*['"]?([^'"\)]+)/i);
      if(bm2 && !isPlaceholderSrc(bm2[1])){
        var im2 = makeImg(bm2[1], '', base);
        if(im2) el.insertBefore(im2, el.firstChild);
      }
    }

    if(!/^(BR|HR)$/.test(tag)){
      var text = (el.textContent||'').replace(/\u00a0/g,' ').trim();
      var hasImg = el.querySelector && el.querySelector('img');
      if(!text && !hasImg && !el.querySelector('table,ul,ol,br')) return null;
    }
    return el;
  }

  function extractBase(html){
    // Prefer og-like absolute image hosts or first https domain
    var m = html.match(/https?:\/\/[\w.-]+/i);
    return m ? m[0] : location.href;
  }

  window.cleanPastedHtml = function(html){
    if(!html) return '';
    html = html
      .replace(/<!--\[if[\s\S]*?<!\[endif\]-->/gi,'')
      .replace(/<o:[\s\S]*?>/gi,'')
      .replace(/<\/o:[^>]+>/gi,'')
      .replace(/<xml[\s\S]*?<\/xml>/gi,'')
      .replace(/<style[\s\S]*?<\/style>/gi,'')
      .replace(/<script[\s\S]*?<\/script>/gi,'')
      .replace(/class="?Mso[^"\s>]*"?/gi,'');

    var base = extractBase(html);
    var doc = new DOMParser().parseFromString('<div id="root">'+html+'</div>','text/html');
    var root = doc.getElementById('root') || doc.body;
    var out = document.createElement('div');

    Array.prototype.forEach.call(root.childNodes, function(ch){
      var c = cleanNode(ch, base);
      if(!c) return;
      if(c.nodeType===11) while(c.firstChild) out.appendChild(c.firstChild);
      else out.appendChild(c);
    });

    // Second pass: if somehow no images made it but original HTML had img tags, force extract
    if(!out.querySelector('img') && /<img/i.test(html)){
      var tmp = document.createElement('div');
      tmp.innerHTML = html;
      var imgs = tmp.querySelectorAll('img');
      Array.prototype.forEach.call(imgs, function(im){
        var s = pickImgSrc(im);
        var made = makeImg(s, im.getAttribute('alt')||'', base);
        if(made) out.appendChild(made);
      });
    }

    return out.innerHTML
      .replace(/(<p>\s*<\/p>\s*){2,}/gi,'<p><br></p>')
      .replace(/&nbsp;/g,' ')
      .trim();
  };
})();
