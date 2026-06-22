/* DEL GROSSO RACING — news.js
   Handles post page: reads slug from URL, finds matching article data,
   renders it into the page. Falls back to static HTML gracefully. */

var POSTS = {
  'venezuelan-podium-at-silverstone-strong-gb4-debut': {
    title: 'Venezuelan Podium at Silverstone: Strong GB4 Debut',
    date: '27 Apr 2026',
    readTime: '2 min read',
    badge: 'GB4 Debut',
    image: 'https://static.wixstatic.com/media/135b3d_6ddc444b315c4c0f8c62827fcef4b04a~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/135b3d_6ddc444b315c4c0f8c62827fcef4b04a~mv2.jpg',
    content: '<p>Emmilio Valentino Del Grosso had an outstanding debut weekend in the GB4 Championship at the iconic Silverstone Circuit.</p><h2>Race 1 — P2</h2><p>A controlled, front-running drive from the very first laps of GB4. Emmilio settled into the rhythm of the car quickly and pushed hard throughout, converting his pace into a P2 finish — a statement result on debut in one of the most competitive junior single-seater series in Britain.</p><h2>Race 2</h2><p>Strong again in Race 2, showing consistency across the weekend. The pace was there from first lap to last.</p><h2>What It Means</h2><p>A podium on debut in GB4 confirms what the team already believed: the transition to single-seaters has been seamless. The work done over the winter with Elite Motorsport is paying off immediately.</p><p>Venezuela had a driver on the podium at Silverstone. That means something.</p>'
  },
  'gb4-the-next-step': {
    title: 'GB4: The Next Step',
    date: '25 Feb 2026',
    readTime: '1 min read',
    badge: 'Announcement',
    image: 'https://static.wixstatic.com/media/135b3d_dc6db6fb0c0a47c09f45c1a1d04cd1d4~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/135b3d_dc6db6fb0c0a47c09f45c1a1d04cd1d4~mv2.jpg',
    content: '<p>I am excited to announce that I will be stepping up into the GB4 Championship for the 2026 season, contesting the series with Elite Motorsport.</p><p>This marks a significant milestone in my racing journey — my first full season in single-seaters after completing the 2025 campaign in the Ginetta Junior Championship. In that season I learned a huge amount, adapted quickly to car racing, and showed consistent pace and improvement.</p><p>Joining the GB4 field is something I have been working toward since the beginning. The series is one of the most competitive junior single-seater championships in Britain. The level is high, the circuits are serious, and the opportunity to show what I can do at the front of the field is real.</p><p>I cannot wait to get started. More to come.</p>'
  },
  'donington-the-final-fight': {
    title: 'Donington: The Final Fight',
    date: '15 Oct 2025',
    readTime: '1 min read',
    badge: 'Race Report',
    image: 'https://static.wixstatic.com/media/135b3d_9df6b433c29648d08c5cbc0cc299fab9~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/135b3d_9df6b433c29648d08c5cbc0cc299fab9~mv2.jpg',
    content: '<p>The final round of the season took us to Donington Park. Practice went well, sitting comfortably inside the top ten and feeling confident with the car.</p><h2>Qualifying</h2><p>Qualifying was tricky. The track was drying, conditions kept changing, and I made a few mistakes that cost us. We ended up P17 for Race 1 and P15 for Race 2. Not ideal, but the race pace was there.</p><h2>Race 1</h2><p>A lot of fun. Hard, clean racing all the way through. Fought forward and showed real progress — gained positions, had good battles, and finished inside the points.</p><h2>Race 2</h2><p>Strong start, gained more positions early. Pushed until the end. A fightback that showed what was possible even from a difficult grid.</p><p>The season is done. There is a lot to take from it — and a lot more to come in 2026.</p>'
  },
  'croft-hard-fights-real-progress': {
    title: 'Croft: Hard Fights, Real Progress',
    date: '15 Oct 2025',
    readTime: '1 min read',
    badge: 'Race Report',
    image: 'https://static.wixstatic.com/media/135b3d_33fb44adbaee40d79a469457a844d575~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/135b3d_33fb44adbaee40d79a469457a844d575~mv2.jpg',
    content: '<p>Croft brought a different challenge — mixed conditions, a new circuit to learn quickly, and a competitive grid across both races.</p><p>The weekend showed real resilience. Despite the tricky conditions, pace was strong and the battles were clean. Progress continued in every session, and the wet-weather performance was a particular highlight — showing adaptability under pressure.</p><p>Every weekend like this adds to the foundation being built. The experience counts.</p>'
  },
  'brands-hatch-step-by-step-forward': {
    title: 'Brands Hatch: Step by Step Forward',
    date: '15 Oct 2025',
    readTime: '1 min read',
    badge: 'Race Report',
    image: 'https://static.wixstatic.com/media/135b3d_d48f9ef0a7a54db29b516615ca5830f4~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/135b3d_d48f9ef0a7a54db29b516615ca5830f4~mv2.jpg',
    content: '<p>Brands Hatch is one of the most iconic circuits in Britain. A tight, technical layout that rewards car control and racecraft — exactly the kind of challenge that sharpens you as a driver.</p><p>Practice showed strong pace from the start. The weekend had learning moments, hard battles through the field, and more steps forward in the development as a driver.</p><p>Every lap at a circuit like Brands Hatch makes you better. The season is building.</p>'
  },
  'grinding-through-zandvoort-a-weekend-of-progress': {
    title: 'Grinding Through Zandvoort: A Weekend of Progress',
    date: '15 Oct 2025',
    readTime: '1 min read',
    badge: 'Race Report',
    image: 'https://static.wixstatic.com/media/135b3d_41b337e1e18c40d6b31fe38ed2290f66~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/135b3d_41b337e1e18c40d6b31fe38ed2290f66~mv2.jpg',
    content: '<p>Zandvoort is a challenging circuit — high-speed, technical, unforgiving at the limit. The kind of track that exposes any weakness and rewards total commitment.</p><p>The weekend had its moments of difficulty, but the composure shown through both races was the real story. Staying clean, making moves when the opportunity came, and bringing the car home in a better position than where it started.</p><p>Progress. That is what this season is about.</p>'
  }
};

(function(){
  // POST PAGE: render article from URL slug
  var postContainer = document.querySelector('[data-post-container]');
  if(postContainer){
    var parts = window.location.pathname.replace(/\/$/, '').split('/');
    var slug = parts[parts.length - 1];
    var post = POSTS[slug];
    if(post){
      // Update title
      var titleEl = document.getElementById('postTitle');
      if(titleEl){
        var words = post.title.split(' ');
        var half = Math.ceil(words.length / 2);
        titleEl.innerHTML = words.slice(0,half).join(' ') + '<br><em>' + words.slice(half).join(' ') + '</em>';
      }
      // Update summary / date
      var summaryEl = document.getElementById('postSummary');
      if(summaryEl) summaryEl.textContent = post.date + ' · ' + post.readTime;
      // Update hero image
      var imgEl = document.getElementById('postHeroImage');
      if(imgEl && post.image){ imgEl.src = post.image; imgEl.alt = post.title; imgEl.classList.remove('hidden'); }
      // Update page title
      document.title = post.title + ' | Del Grosso Racing';
      // Render content
      postContainer.innerHTML = '<div class="news-meta">' + post.date + ' · ' + post.readTime + '</div>' + post.content;
    }
  }
})();
