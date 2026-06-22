(function(){
  function esc(v){return String(v == null ? '' : v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c];});}
  function formatDate(value){ if(!value) return ''; var d=new Date(value+'T00:00:00'); if(isNaN(d.getTime())) return value; return d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}); }
  function postUrl(post){ return '/post/' + encodeURIComponent(post.slug || '') + '/'; }
  function card(post){
    return '<a class="news-card reveal" href="'+esc(postUrl(post))+'" data-track="news_card" data-track-label="'+esc(post.title)+'">'+
      '<div class="news-card-img"><img loading="lazy" src="'+esc(post.image)+'" alt="'+esc(post.title)+'"></div>'+
      '<div class="news-card-body"><div class="news-meta">'+esc(formatDate(post.date))+(post.read_time?' · '+esc(post.read_time):'')+'</div><h3>'+esc(post.title)+'</h3><p>'+esc(post.summary)+'</p>'+(post.badge?'<span class="news-badge">'+esc(post.badge)+'</span>':'')+'</div></a>';
  }
  function simpleMarkdown(md){
    md = String(md || '').replace(/\r\n/g,'\n');
    var blocks = md.split(/\n\s*\n/).filter(function(b){return b.trim();});
    return blocks.map(function(b){
      var t=b.trim();
      if (/^###\s+/.test(t)) return '<h3>'+esc(t.replace(/^###\s+/,''))+'</h3>';
      if (/^##\s+/.test(t)) return '<h2>'+esc(t.replace(/^##\s+/,''))+'</h2>';
      if (/^>\s?/.test(t)) return '<blockquote>'+esc(t.replace(/^>\s?/,''))+'</blockquote>';
      if (/^-\s+/m.test(t) && t.split('\n').every(function(line){return /^-\s+/.test(line.trim());})) {
        return '<ul>'+t.split('\n').map(function(line){return '<li>'+esc(line.replace(/^-\s+/,''))+'</li>';}).join('')+'</ul>';
      }
      t = esc(t).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/  \n/g,'<br>').replace(/\n/g,'<br>');
      return '<p>'+t+'</p>';
    }).join('');
  }
  async function getPosts(){
    var res = await fetch('/data/news.json', {cache:'no-store'}); if(!res.ok) throw new Error('Could not load news');
    var data = await res.json(); var posts = Array.isArray(data.posts) ? data.posts : [];
    return posts.sort(function(a,b){return String(b.date || '').localeCompare(String(a.date || ''));});
  }
  async function renderList(){
    var grids = document.querySelectorAll('[data-news-grid]'); if(!grids.length) return;
    try{
      var posts = await getPosts();
      grids.forEach(function(grid){ var limit = Number(grid.dataset.limit || posts.length); grid.innerHTML = posts.slice(0,limit).map(card).join(''); });
      if (window.DGR && window.DGR.initReveal) window.DGR.initReveal();
    }catch(e){
      grids.forEach(function(grid){ if (!grid.children.length) grid.innerHTML = '<div class="card"><h3>News could not load.</h3><p>Please refresh the page.</p></div>'; });
    }
  }
  function slugFromLocation(){
    var qs = new URLSearchParams(window.location.search); if(qs.get('slug')) return qs.get('slug');
    var parts = window.location.pathname.split('/').filter(Boolean); var last = parts[parts.length-1] || '';
    if(last === 'post') return ''; return decodeURIComponent(last || '');
  }
  function splitTitle(title){
    var safe=esc(title || 'Article');
    if (safe.indexOf(':') > -1) { var i=safe.indexOf(':'); return safe.slice(0,i+1)+'<br><em>'+safe.slice(i+1).trim()+'</em>'; }
    var words=safe.split(' '); if(words.length>2){return words.slice(0,-2).join(' ')+'<br><em>'+words.slice(-2).join(' ')+'</em>';}
    return safe;
  }
  async function renderPost(){
    var container = document.querySelector('[data-post-container]'); if(!container) return;
    var titleEl = document.getElementById('postTitle'); var summaryEl = document.getElementById('postSummary'); var imgEl = document.getElementById('postHeroImage');
    try{
      var slug = slugFromLocation(); var posts = await getPosts();
      var post = posts.find(function(p){return p.slug === slug;}) || posts[0];
      if(!post) throw new Error('No post');
      document.title = post.title + ' | Del Grosso Racing';
      if(titleEl) titleEl.innerHTML = splitTitle(post.title);
      if(summaryEl) summaryEl.textContent = post.summary || '';
      if(imgEl) { imgEl.src = post.image; imgEl.alt = post.title; imgEl.classList.remove('hidden'); }
      container.innerHTML = '<div class="section-eyebrow reveal"><div class="section-label-line"></div><span class="section-label">'+esc(post.badge || 'Update')+'</span></div>'+
        '<div class="news-meta">'+esc(formatDate(post.date))+(post.read_time?' · '+esc(post.read_time):'')+'</div>'+
        '<div class="article-body">'+simpleMarkdown(post.body)+'</div><br><a href="/news/" class="btn-red-outline">Back To News</a>';
      if(window.DGR && window.DGR.initReveal) window.DGR.initReveal();
    }catch(e){
      if(titleEl) titleEl.innerHTML='Article<br><em>Not Found</em>';
      if(summaryEl) summaryEl.textContent='Go back to the news page and choose another update.';
      container.innerHTML = '<h2 class="section-title">Article Not Found</h2><p class="lead-text">The article could not load. Try refreshing or return to the news page.</p><br><a href="/news/" class="btn-red-outline">Back To News</a>';
    }
  }
  document.addEventListener('DOMContentLoaded', function(){ renderList(); renderPost(); });
})();
