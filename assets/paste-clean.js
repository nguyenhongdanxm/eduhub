/* Paste cleaner - keep article layout when pasting from news sites */
(function(){
  var ALLOW = {
    P:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,
    UL:1,OL:1,LI:1,
    TABLE:1,THEAD:1,TBODY:1,TR:1,TH:1,TD:1,
    IMG:1,A:1,BR:1,HR:1,
    STRONG:1,B:1,EM:1,I:1,U:1,S:1,SUB:1,SUP:1,
    BLOCKQUOTE:1,FIGURE:1,FIGCAPTION:1,
    PRE:1,CODE:1,SPAN:1,DIV:1
  };

  function absUrl(src, base){
    if(!src) return '';
    src = src.trim();
    if(/^data:|^https?:\/\//i.test(src)) return src;
    if(src.indexOf('//')===0) return 'https:'+src;
    try{
      return new URL(src, base || location.href).href;
    }catch(e){ return src; }
  }

  function pickImgSrc(el){
    var s = el.getAttribute('src') || el.getAttribute('data-src') || el.getAttribute('data-original') || '';
    if(!s){
      var ss = el.getAttribute('srcset') || el.getAttribute('data-srcset') || '';
      if(ss){
        // take largest candidate roughly
        var parts = ss.split(',').map(function(p){return p.trim().split(/\s+/)[0];}).filter(Boolean);
        if(parts.length) s = parts[parts.length-1];
      }
    }
    return s;
  }

  function cleanNode(node, base){
    if(node.nodeType === 3){
      // text
      return document.createTextNode(node.nodeValue);
    }
    if(node.nodeType !== 1) return null;

    var tag = node.tagName;
    if(tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'IFRAME' || tag === 'SVG' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'FORM' || tag === 'NAV' || tag === 'HEADER' || tag === 'FOOTER' || tag === 'ASIDE'){
      return null;
    }

    // Skip obvious chrome
    var cls = (node.className && typeof node.className === 'string') ? node.className.toLowerCase() : '';
    var id = (node.id || '').toLowerCase();
    if(/share|social|comment|related|ads?|banner|cookie|popup|newsletter|subscribe|menu|nav-|toolbar|breadcrumb/.test(cls+' '+id)){
      return null;
    }

    if(!ALLOW[tag]){
      // unwrap: keep children
      var frag = document.createDocumentFragment();
      Array.prototype.slice.call(node.childNodes).forEach(function(ch){
        var c = cleanNode(ch, base);
        if(c) frag.appendChild(c);
      });
      return frag.childNodes.length ? frag : null;
    }

    // Map DIV with only inline-ish content to P if it has text
    var outTag = tag;
    if(tag === 'DIV'){
      // if div looks like a paragraph container, convert to P
      var hasBlock = false;
      Array.prototype.slice.call(node.children || []).forEach(function(ch){
        if(/^(P|H[1-6]|UL|OL|TABLE|BLOCKQUOTE|FIGURE|DIV|PRE)$/.test(ch.tagName)) hasBlock = true;
      });
      outTag = hasBlock ? 'DIV' : 'P';
    }

    var el = document.createElement(outTag === 'DIV' ? 'DIV' : outTag.toLowerCase());

    // Attributes we keep
    if(tag === 'A'){
      var href = node.getAttribute('href');
      if(href && !/^javascript:/i.test(href)){
        el.setAttribute('href', absUrl(href, base));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    }
    if(tag === 'IMG'){
      var src = pickImgSrc(node);
      if(!src) return null;
      el.setAttribute('src', absUrl(src, base));
      var alt = node.getAttribute('alt') || '';
      if(alt) el.setAttribute('alt', alt);
      el.style.maxWidth = '100%';
      el.style.height = 'auto';
    }
    if(tag === 'TD' || tag === 'TH'){
      var cs = node.getAttribute('colspan');
      var rs = node.getAttribute('rowspan');
      if(cs) el.setAttribute('colspan', cs);
      if(rs) el.setAttribute('rowspan', rs);
    }

    // Useful inline styles only
    var st = node.getAttribute('style') || '';
    var keep = [];
    if(/text-align\s*:\s*(left|right|center|justify)/i.test(st)){
      keep.push(st.match(/text-align\s*:\s*(left|right|center|justify)/i)[0]);
    }
    if(/font-weight\s*:\s*(bold|700|600)/i.test(st)) keep.push('font-weight:bold');
    if(/font-style\s*:\s*italic/i.test(st)) keep.push('font-style:italic');
    if(keep.length) el.setAttribute('style', keep.join(';'));

    Array.prototype.slice.call(node.childNodes).forEach(function(ch){
      var c = cleanNode(ch, base);
      if(c) el.appendChild(c);
    });

    // Drop empty non-media elements
    if(!/^(IMG|BR|HR)$/.test(tag)){
      var text = (el.textContent || '').replace(/\u00a0/g,' ').trim();
      var hasImg = el.querySelector && el.querySelector('img');
      if(!text && !hasImg && !el.querySelector('table,ul,ol,br')) return null;
    }

    return el;
  }

  function extractBase(html){
    // try to find origin from clipboard comment or first absolute link
    var m = html.match(/https?:\/\/[\w.-]+/i);
    return m ? m[0] : location.href;
  }

  window.cleanPastedHtml = function(html){
    if(!html) return '';
    // strip Word/Office junk
    html = html
      .replace(/<!--\[if[\s\S]*?<!\[endif\]-->/gi, '')
      .replace(/<o:[\s\S]*?>/gi, '')
      .replace(/<\/o:[^>]+>/gi, '')
      .replace(/<xml[\s\S]*?<\/xml>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/class="?Mso[^"\s>]*"?/gi, '');

    var base = extractBase(html);
    var parser = new DOMParser();
    var doc = parser.parseFromString('<div id="root">'+html+'</div>', 'text/html');
    var root = doc.getElementById('root') || doc.body;
    var out = document.createElement('div');

    Array.prototype.slice.call(root.childNodes).forEach(function(ch){
      var c = cleanNode(ch, base);
      if(!c) return;
      if(c.nodeType === 11){ // fragment
        while(c.firstChild) out.appendChild(c.firstChild);
      } else {
        out.appendChild(c);
      }
    });

    // Normalize consecutive empty paragraphs
    var htmlOut = out.innerHTML
      .replace(/(<p>\s*<\/p>\s*){2,}/gi, '<p><br></p>')
      .replace(/&nbsp;/g, ' ')
      .trim();
    return htmlOut;
  };
})();
