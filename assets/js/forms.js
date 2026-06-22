(function(){
  function encode(data){ return new URLSearchParams(data).toString(); }
  function setMessage(form, text, type){
    var el = form.querySelector('.form-message');
    if (!el) { el = document.createElement('div'); el.className='form-message'; form.appendChild(el); }
    el.textContent = text; el.className = 'form-message ' + (type || '');
  }
  async function handle(form){
    var btn = form.querySelector('button[type="submit"]');
    var old = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    setMessage(form, '', '');
    var data = new FormData(form);
    if (!data.get('form-name')) data.set('form-name', form.getAttribute('name') || 'contact');
    try {
      var res = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: encode(data) });
      if (!res.ok) throw new Error('Netlify returned ' + res.status);
      if (typeof window.dgrTrack === 'function') window.dgrTrack('form_submit_success', {form_name: form.getAttribute('name') || 'form'});
      window.location.href = form.dataset.success || '/thank-you/';
    } catch(err) {
      if (typeof window.dgrTrack === 'function') window.dgrTrack('form_submit_error', {form_name: form.getAttribute('name') || 'form', message: String(err.message || err)});
      setMessage(form, 'Message could not send yet. Make sure Netlify Forms detection is enabled, then redeploy. You can also email Emmilio directly.', 'error');
      if (btn) { btn.disabled = false; btn.textContent = old; }
    }
  }
  document.addEventListener('submit', function(e){
    var form = e.target.closest('form[data-enhance="netlify"]');
    if (!form) return;
    e.preventDefault(); handle(form);
  });
})();
