(function(){
  var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}

  var titles={es:document.title,en:document.documentElement.getAttribute('data-title-en')||document.title};
  function setLang(l){
    document.documentElement.lang=l;
    $$('[data-'+l+']').forEach(function(e){e.innerHTML=e.getAttribute('data-'+l)});
    $$('[data-ph-'+l+']').forEach(function(e){e.placeholder=e.getAttribute('data-ph-'+l)});
    $$('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===l)});
    document.title=titles[l];
    store('uma-lang',l);
  }
  $$('.lang button').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.lang)})});
  var saved=store('uma-lang');
  if(saved==='en')setLang('en');

  var burger=document.querySelector('.burger'),menu=document.querySelector('.menu');
  if(burger){
    burger.addEventListener('click',function(){
      var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);
    });
    $$('.menu a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')})});
  }

  $$('.chip').forEach(function(c){c.addEventListener('click',function(){
    $$('.chip').forEach(function(x){x.setAttribute('aria-pressed',x===c)});
    $$('.card').forEach(function(k){k.classList.toggle('hide',c.dataset.f!=='all'&&k.dataset.t!==c.dataset.f)});
  })});

  var ck=document.querySelector('.cookie');
  if(ck){
    var framed=false;try{framed=window.self!==window.top}catch(e){framed=true}
    if(framed||store('uma-cookies')){ck.hidden=true}else{document.body.classList.add('has-cookie')}
    $$('.cookie [data-c]').forEach(function(b){b.addEventListener('click',function(){
      store('uma-cookies',b.dataset.c);ck.hidden=true;document.body.classList.remove('has-cookie');
    })});
  }
  $$('form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();if(f.dataset.goto){location.hash=f.dataset.goto}})});
})();
