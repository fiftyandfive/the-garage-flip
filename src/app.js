// The Garage Flip — shared site behaviour (guarded for pages that omit a section)
(function(){
  // ── Analytics (GA4) ────────────────────────────────────────────────────────
  // Paste your GA4 Measurement ID below (looks like "G-XXXXXXXXXX").
  // Find it in Google Analytics → Admin → Data Streams → your web stream.
  // Until a real ID is set, tracking stays off (no broken requests).
  var GA_MEASUREMENT_ID = 'G-RY0HBH06LR';

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var gaEnabled = /^G-[A-Z0-9]{6,}$/.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';
  if (gaEnabled) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }
  // Fire a conversion/event only when analytics is live (no-op otherwise).
  function track(name, params){ if (gaEnabled) gtag('event', name, params || {}); }

  var pageLabel = (document.body && document.body.getAttribute('data-screen-label')) || 'Site';

  // ── Nav scroll state ────────────────────────────────────────────────────────
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // ── Mobile menu ─────────────────────────────────────────────────────────────
  var mm = document.getElementById('mm');
  var navToggle = document.getElementById('navToggle');
  if (mm && navToggle) {
    navToggle.onclick = function(){ mm.classList.add('open'); };
    var mmClose = document.getElementById('mmClose');
    if (mmClose) mmClose.onclick = function(){ mm.classList.remove('open'); };
    mm.querySelectorAll('a').forEach(function(a){ a.onclick = function(){ mm.classList.remove('open'); }; });
  }

  // ── FAQ accordion ───────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-list .faq button').forEach(function(btn){
    btn.onclick = function(){
      var item = btn.parentElement;
      var ans = item.querySelector('.ans');
      var isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq').forEach(function(f){
        f.classList.remove('open');
        f.querySelector('.ans').style.maxHeight = null;
      });
      if (!isOpen) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    };
  });

  // ── Sticky mobile call bar (injected site-wide) ─────────────────────────────
  if (!document.querySelector('.callbar')) {
    var bar = document.createElement('div');
    bar.className = 'callbar';
    bar.innerHTML =
      '<a href="tel:+14077356450" class="cb-call" data-cb="call">' +
        '<span class="cb-ico" aria-hidden="true">&#9742;</span> Call' +
      '</a>' +
      '<a href="#book" class="cb-quote" data-cb="quote">Free quote</a>';
    document.body.appendChild(bar);
  }

  // ── Click-to-call / text conversion tracking (delegated) ────────────────────
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) track('click_to_call', { page_location_label: pageLabel });
    else if (href.indexOf('sms:') === 0) track('click_to_text', { page_location_label: pageLabel });
  }, true);

  // ── Intake form ─────────────────────────────────────────────────────────────
  var form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var set = function(id, bad){ var el = document.getElementById(id); if (el) el.classList.toggle('err', bad); };
      var nameBad = document.getElementById('name').value.trim().length < 2;
      var phoneBad = (document.getElementById('phone').value.match(/\d/g) || []).length < 7;
      var zipBad = document.getElementById('zip').value.trim().length < 3;
      set('f-name', nameBad); set('f-phone', phoneBad); set('f-zip', zipBad);
      if (!(nameBad || phoneBad || zipBad)) {
        var data = {
          name: document.getElementById('name').value.trim(),
          phone: document.getElementById('phone').value.trim(),
          zip: document.getElementById('zip').value.trim(),
          _subject: 'New lead — The Garage Flip (' + pageLabel + ')'
        };
        var size = document.getElementById('size');
        var timeline = document.getElementById('timeline');
        var service = document.getElementById('service');
        if (size && size.value) data.garage_size = size.value;
        if (timeline && timeline.value) data.timeline = timeline.value;
        if (service && service.value) data.service = service.value;
        data._replyto = 'hello@thegarageflip.com';
        data.page = pageLabel;

        fetch('https://formspree.io/f/xkokwnov', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        // GA4 conversion — mark "generate_lead" as a Key Event in GA to count sign-ups.
        track('generate_lead', { page_location_label: pageLabel, service: data.service || 'unspecified' });

        form.style.display = 'none';
        var done = document.getElementById('done');
        if (done) done.classList.add('show');
      }
    });
    ['name','phone','zip'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function(){ document.getElementById('f-'+id).classList.remove('err'); });
    });
  }

  // ── Scroll reveal ───────────────────────────────────────────────────────────
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:0.1, rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
})();
