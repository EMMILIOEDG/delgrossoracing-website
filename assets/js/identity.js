/* DEL GROSSO RACING — identity.js
   Netlify Identity: redirects invite/recovery links to /admin/ */
(function(){
  if(window.netlifyIdentity){
    window.netlifyIdentity.on('init', function(user){
      if(!user){
        window.netlifyIdentity.on('login', function(){
          document.location.href = '/admin/';
        });
      }
    });
  }
})();
