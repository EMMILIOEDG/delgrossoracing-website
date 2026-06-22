/* DEL GROSSO RACING — analytics.js
   Google Analytics G-8XWBSR0VWT
   Log in at analytics.google.com to see your visitors */
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-8XWBSR0VWT';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-8XWBSR0VWT');

  // Track nav/card clicks via data-track attributes
  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-track]');
    if(!el) return;
    var label = el.getAttribute('data-track-label') || el.getAttribute('data-track');
    gtag('event', 'click', { event_category: 'navigation', event_label: label });
  });
})();
