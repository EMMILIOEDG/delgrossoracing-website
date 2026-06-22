(function(){
  var TOKEN_RE = /(invite_token|confirmation_token|recovery_token|email_change_token|access_token|refresh_token|error)=/i;
  var hash = window.location.hash || '';
  var isAdmin = /^\/admin\/?/.test(window.location.pathname);

  if (TOKEN_RE.test(hash) && !isAdmin) {
    window.location.replace('/admin/' + hash);
    return;
  }

  function boot(){
    if (!window.netlifyIdentity) return;
    window.netlifyIdentity.on('init', function(user){
      if (TOKEN_RE.test(window.location.hash || '')) {
        window.netlifyIdentity.open();
      }
    });
    window.netlifyIdentity.on('login', function(){
      window.netlifyIdentity.close();
      if (window.location.hash) history.replaceState(null, document.title, window.location.pathname + window.location.search);
      if (!isAdmin) window.location.href = '/admin/';
    });
    window.netlifyIdentity.on('signup', function(){
      window.netlifyIdentity.close();
      if (!isAdmin) window.location.href = '/admin/';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
