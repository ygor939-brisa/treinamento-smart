(function(){
  'use strict';
  var root=document.getElementById('manuals-app');
  var source=window.TECH_MANUALS;
  var lightbox=document.getElementById('manual-lightbox');
  var lastFocus=null;

  function escapeHtml(value){
    return String(value==null?'':value).replace(/[&<>"']/g,function(character){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character];
    });
  }

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  }

  function initials(title){
    return String(title||'M').split(/\s+/).filter(Boolean).slice(0,2).map(function(word){return word.charAt(0);}).join('').toUpperCase();
  }

  function card(key,child){
    var manual=source.items[key];
    if(!manual)return '';
    return '<button type="button" class="manual-card" data-manual="'+escapeHtml(key)+'">'+
      '<span class="initials" aria-hidden="true">'+escapeHtml(initials(manual.title))+'</span>'+
      '<strong>'+escapeHtml(manual.title)+'</strong>'+
      '<span>'+escapeHtml(manual.description||'Procedimento operacional')+'</span>'+
      '<small>'+(child?'Abrir procedimento':'Abrir manual')+' →</small></button>';
  }

  function showHome(query){
    var search=normalize(query);
    var keys=source.order.filter(function(key){
      var item=source.items[key];
      var childText=(item.children||[]).map(function(child){var value=source.items[child];return value?[value.title,value.description].join(' '):'';}).join(' ');
      return !search||normalize([item.title,item.description,childText].join(' ')).indexOf(search)!==-1;
    });
    root.innerHTML='<section class="toolbar"><div><h2>Escolha uma tecnologia</h2><p>Pesquise pelo nome do equipamento ou pelo procedimento.</p></div><label class="search"><span aria-hidden="true">⌕</span><input id="manual-search" type="search" autocomplete="off" placeholder="Pesquisar manual..." value="'+escapeHtml(query||'')+'"><span class="sr-only"></span></label></section><section class="grid" id="manual-grid">'+(keys.map(function(key){return card(key,false);}).join('')||'<div class="empty">Nenhum manual encontrado para esta pesquisa.</div>')+'</section>';
    var input=document.getElementById('manual-search');
    input.oninput=function(){showHome(input.value);var next=document.getElementById('manual-search');next.focus();next.setSelectionRange(next.value.length,next.value.length);};
    bindCards();
  }

  function showManual(key,parentKey){
    var manual=source.items[key];
    if(!manual)return;
    if(manual.children){
      root.innerHTML='<section class="manual-page"><button type="button" class="back-button" data-back-home>← Voltar para tecnologias</button><header class="manual-head"><span class="eyebrow">SELEÇÃO DE EQUIPAMENTO</span><h2>'+escapeHtml(manual.title)+'</h2><p>'+escapeHtml(manual.description||'')+'</p></header><section class="grid">'+manual.children.map(function(child){return card(child,true);}).join('')+'</section></section>';
      root.querySelector('[data-back-home]').onclick=function(){showHome('');};
      bindCards(key);window.scrollTo({top:0,behavior:'smooth'});return;
    }
    var content=(manual.content||[]).map(function(part,index){
      if(part.type==='image')return '<figure class="figure"><button type="button" class="image-button" data-image="'+escapeHtml(part.src)+'" aria-label="Ampliar imagem '+(index+1)+' do manual '+escapeHtml(manual.title)+'"><img loading="lazy" src="'+escapeHtml(part.src)+'" alt="Etapa visual '+(index+1)+' do manual '+escapeHtml(manual.title)+'"></button><figcaption>Imagem '+(index+1)+' · clique para ampliar</figcaption></figure>';
      if(part.type==='text'){
        var alert=/IMPORTANTE|ATENÇÃO|CUIDADO/i.test(part.text||'');
        return '<article class="text-card'+(alert?' alert':'')+'">'+escapeHtml(part.text||'')+'</article>';
      }
      return '';
    }).join('');
    root.innerHTML='<article class="manual-page"><button type="button" class="back-button" data-manual-back>← Voltar</button><header class="manual-head"><span class="eyebrow">MANUAL OPERACIONAL</span><h2>'+escapeHtml(manual.title)+'</h2><p>'+escapeHtml(manual.description||'')+'</p></header><section class="manual-content">'+(content||'<div class="empty">Este manual ainda não possui conteúdo.</div>')+'</section></article>';
    root.querySelector('[data-manual-back]').onclick=function(){parentKey?showManual(parentKey):showHome('');};
    root.querySelectorAll('[data-image]').forEach(function(button){button.onclick=function(){openImage(button.dataset.image,button);};});
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function bindCards(parentKey){
    root.querySelectorAll('[data-manual]').forEach(function(button){button.onclick=function(){showManual(button.dataset.manual,parentKey);};});
  }

  function openImage(src,trigger){
    lastFocus=trigger;lightbox.querySelector('img').src=src;lightbox.hidden=false;lightbox.querySelector('.lightbox-close').focus();
  }

  function closeImage(){
    lightbox.hidden=true;lightbox.querySelector('img').removeAttribute('src');if(lastFocus)lastFocus.focus();
  }

  lightbox.querySelector('.lightbox-close').onclick=closeImage;
  lightbox.onclick=function(event){if(event.target===lightbox)closeImage();};
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&!lightbox.hidden)closeImage();});

  if(!source||!source.items||!Array.isArray(source.order)){
    root.innerHTML='<div class="empty">Não foi possível carregar os dados dos manuais.</div>';return;
  }
  showHome('');
})();
