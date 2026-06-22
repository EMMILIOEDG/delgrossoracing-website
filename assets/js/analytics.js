
(async function () {
  function loadScript(src, async = true) {
    const s = document.createElement('script');
    s.src = src;
    s.async = async;
    document.head.appendChild(s);
    return s;
  }

  let config = {};
  try {
    const res = await fetch('/data/site.json', { cache: 'no-store' });
    config = await res.json();
  } catch (e) {
    config = {};
  }

  const gaId = config.ga4_id;
  if (gaId && !String(gaId).includes('XXXX')) {
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId));
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }

  const clarityId = config.clarity_id;
  if (clarityId && String(clarityId).trim()) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, 'clarity', 'script', clarityId);
  }

  const pixelId = config.meta_pixel_id;
  if (pixelId && String(pixelId).trim()) {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelId);
    fbq('track', 'PageView');
  }
})();
