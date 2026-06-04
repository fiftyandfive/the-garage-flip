// The Garage Flip — shared site behaviour (guarded for pages that omit a section)
(function(){
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  var mm = document.getElementById('mm');
  var navToggle = document.getElementById('navToggle');
  if (mm && navToggle) {
    navToggle.onclick = function(){ mm.classList.add('open'); };
    var mmClose = document.getElementById('mmClose');
    if (mmClose) mmClose.onclick = function(){ mm.classList.remove('open'); };
    mm.querySelectorAll('a').forEach(function(a){ a.onclick = function(){ mm.classList.remove('open'); }; });
  }

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

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:0.1, rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
})();
