
(function () {
  function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, params);
  }
  window.trackEvent = trackEvent;

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const d = new Date(dateString + 'T00:00:00');
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function card(post) {
    const href = post.link && post.link.trim() ? post.link : `/post/${encodeURIComponent(post.slug || '')}`;
    return `<a class="news-card reveal" href="${escapeHtml(href)}" data-track="news_card" data-track-label="${escapeHtml(post.title)}">
      <div class="news-card-img"><img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}"></div>
      <div class="news-card-body">
        <div class="news-meta">${escapeHtml(formatDate(post.date))}${post.read_time ? ' · ' + escapeHtml(post.read_time) : ''}</div>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.summary)}</p>
        ${post.badge ? `<span class="news-badge">${escapeHtml(post.badge)}</span>` : ''}
      </div>
    </a>`;
  }

  async function renderNews() {
    const homeGrid = document.getElementById('homeNewsGrid');
    const newsGrid = document.getElementById('newsGrid');
    if (!homeGrid && !newsGrid) return;
    try {
      const res = await fetch('/data/news.json', { cache: 'no-store' });
      const data = await res.json();
      const posts = Array.isArray(data.posts) ? data.posts : [];
      const sorted = posts.slice().sort((a,b) => String(b.date || '').localeCompare(String(a.date || '')));
      if (homeGrid) {
        const limit = Number(homeGrid.dataset.limit || 3);
        homeGrid.innerHTML = sorted.slice(0, limit).map(card).join('');
      }
      if (newsGrid) {
        newsGrid.innerHTML = sorted.map(card).join('');
      }
      initReveal();
    } catch (err) {
      const target = homeGrid || newsGrid;
      if (target) target.innerHTML = '<div class="news-card"><div class="news-card-body"><h3>News could not load.</h3><p>Please refresh the page.</p></div></div>';
    }
  }

  document.addEventListener('click', function(e) {
    const item = e.target.closest('[data-track]');
    if (!item) return;
    trackEvent(item.dataset.track, {
      label: item.dataset.trackLabel || item.textContent.trim().slice(0, 80),
      page: document.body.dataset.page || 'unknown'
    });
  });

  document.addEventListener('submit', function(e) {
    const form = e.target.closest('form');
    if (!form) return;
    trackEvent('form_submit_attempt', { form_name: form.getAttribute('name') || form.id || 'form' });
  });

  document.addEventListener('DOMContentLoaded', function() {
    initReveal();
    renderNews();
  });
})();
