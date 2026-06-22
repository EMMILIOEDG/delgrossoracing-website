/* DEL GROSSO RACING — main.js */

// Mobile nav toggle
(function(){
  var toggle = document.querySelector('.mobile-toggle');
  var links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? '✕' : '☰';
    });
    // Close on link click
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        toggle.textContent = '☰';
      });
    });
  }
})();

// Scroll reveal
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  },{ threshold:0.1, rootMargin:'0px 0px -40px 0px' });
  els.forEach(function(el){ io.observe(el); });
})();

// Active nav link based on scroll
(function(){
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  if(!sections.length) return;
  window.addEventListener('scroll', function(){
    var scrollY = window.pageYOffset;
    sections.forEach(function(s){
      var top = s.offsetTop - 100;
      var bottom = top + s.offsetHeight;
      if(scrollY >= top && scrollY < bottom){
        navLinks.forEach(function(a){
          a.classList.remove('active');
          if(a.getAttribute('href') === '/#'+s.id || a.getAttribute('href') === '#'+s.id){
            a.classList.add('active');
          }
        });
      }
    });
  },{ passive:true });
})();

// Netlify form submit with JS enhancement
(function(){
  var form = document.querySelector('form[data-netlify]');
  if(!form) return;
  // Netlify handles native POST — this just adds a loading state
  form.addEventListener('submit', function(){
    var btn = form.querySelector('button[type=submit]');
    if(btn){ btn.textContent = 'Sending…'; btn.disabled = true; }
  });
})();

// Newsletter form
(function(){
  var nf = document.querySelector('.newsletter-form');
  if(!nf) return;
  nf.addEventListener('submit', function(){
    var btn = nf.querySelector('button');
    if(btn){ btn.textContent = 'Done!'; btn.disabled = true; }
  });
})();
