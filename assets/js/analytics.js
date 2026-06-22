(function () {
  window.dgrTrack = function(eventName, params) {
    params = params || {};
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, params);
  };

  async function loadSettings(){
    try { const res = await fetch('/data/site.json', {cache:'no-store'}); return await res.json(); } catch(e) { return {}; }
  }
  function inject(src, attrs) {
    var s = document.createElement('script'); s.async = true; s.src = src;
    if (attrs) Object.keys(attrs).forEach(function(k){ s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
  }
  function inline(code) { var s = document.createElement('script'); s.text = code; document.head.appendChild(s); }
  loadSettings().then(function(site){
    var ga = (site.ga4_id || '').trim();
    var clarity = (site.clarity_id || '').trim();
    var pixel = (site.meta_pixel_id || '').trim();
    if (ga && /^G-[A-Z0-9]+$/i.test(ga)) {
      inject('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga));
      inline("window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" + ga.replace(/'/g,'') + "');");
    }
    if (clarity) {
      inline("(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '" + clarity.replace(/'/g,'') + "');");
    }
    if (pixel && /^[0-9]+$/.test(pixel)) {
      inline("!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','" + pixel.replace(/'/g,'') + "');fbq('track','PageView');");
    }
  });
})();
