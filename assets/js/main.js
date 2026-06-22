(function(){
  function initReveal(){
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function(el){ el.classList.add('visible'); }); return; }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, {threshold:.1, rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){ obs.observe(el); });
  }
  function initMobileNav(){
    var btn = document.querySelector('.mobile-toggle'); var links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', function(){
      var open = links.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function(e){ if(e.target.tagName === 'A') { links.classList.remove('open'); btn.setAttribute('aria-expanded','false'); } });
  }
  document.addEventListener('click', function(e){
    var item = e.target.closest('[data-track]'); if(!item) return;
    if (typeof window.dgrTrack === 'function') window.dgrTrack(item.dataset.track, {label:item.dataset.trackLabel || item.textContent.trim().slice(0,90), page:document.body.dataset.page || 'unknown'});
  });
  document.documentElement.classList.remove('no-js');
  document.addEventListener('DOMContentLoaded', function(){ initReveal(); initMobileNav(); });
  window.DGR = window.DGR || {}; window.DGR.initReveal = initReveal;
})();
