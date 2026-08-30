/* ============================================================
   ALERS MARTIAL ARTS — script.js (v3)
   ============================================================ */

/* ── Schedule tab switch (global — called from onclick in HTML) ── */
function switchSchedTab(panelId) {
  document.querySelectorAll('.sched-tab').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.sched-panel').forEach(p => { p.style.display = 'none'; });
  var activeBtn = document.getElementById('tab-' + panelId);
  if (activeBtn) { activeBtn.classList.add('active'); activeBtn.setAttribute('aria-selected', 'true'); }
  var activePanel = document.getElementById('panel-' + panelId);
  if (activePanel) { activePanel.style.display = 'block'; }
}

(function () {
  'use strict';

  /* ── Navbar elements ── */
  var navbar  = document.getElementById('navbar');
  var menuBtn = document.getElementById('menuBtn');
  var navMenu = document.getElementById('navLinks');

  /* ── Navbar scroll shadow ── */
  function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 60); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ────────────────────────────────────────────────────────────
     TAB SYSTEM
     Pages map:  home | programs | schedule | gallery | merch | contact
     Any internal #hash link switches to the right tab.
  ──────────────────────────────────────────────────────────── */

  /* Maps section IDs that live inside a tab pane → their tab's page name */
  var SECTION_MAP = {
    home: 'home', disciplines: 'home', about: 'home',
    testimonials: 'home', coaches: 'home',
    programs: 'programs',
    schedule: 'schedule', pricing: 'schedule',
    gallery: 'gallery',
    merch: 'merch',
    contact: 'contact', waiver: 'contact'
  };

  function switchPage(page, pushState) {
    if (!page) page = 'home';
    /* Update panes */
    document.querySelectorAll('.page-section').forEach(function(p) {
      p.classList.toggle('active', p.dataset.page === page);
    });
    /* Update tab-links */
    document.querySelectorAll('.nav-links .tab-link').forEach(function(a) {
      var href = a.getAttribute('href').replace('#', '');
      var mapped = SECTION_MAP[href] || href;
      a.classList.toggle('active', mapped === page);
    });
    window.scrollTo(0, 0);
    if (pushState !== false) {
      history.pushState(null, '', '#' + page);
    }
    closeMenu();
  }

  /* Init on load from URL hash */
  (function() {
    var hash = location.hash.replace('#', '');
    switchPage(SECTION_MAP[hash] || hash || 'home', false);
  })();

  /* Handle browser back/forward */
  window.addEventListener('popstate', function() {
    var hash = location.hash.replace('#', '');
    switchPage(SECTION_MAP[hash] || hash || 'home', false);
  });

  /* Intercept ALL internal #hash link clicks */
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute('href').replace('#', '');
    if (!hash) return;
    var page = SECTION_MAP[hash] || hash;
    /* Only intercept known tab pages */
    var knownPages = ['home','programs','schedule','gallery','merch','contact'];
    if (knownPages.indexOf(page) === -1) return;
    e.preventDefault();
    switchPage(page);
  });

  /* ── Mobile menu ── */
  menuBtn.addEventListener('click', function() {
    var open = navMenu.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMenu(); });

  function closeMenu() {
    navMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ── Scroll-reveal ── */
  var revealSelectors = [
    '.discipline-card', '.t-card', '.coach-card',
    '.prog-card', '.p-card', '.gal-item',
    '.about-content', '.proof-item'
  ].join(',');

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(el) {
      if (el.isIntersecting) {
        el.target.style.opacity   = '1';
        el.target.style.transform = 'translateY(0)';
        io.unobserve(el.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(revealSelectors).forEach(function(el, i) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity .5s ' + (i * 0.04) + 's cubic-bezier(.16,1,.3,1), transform .5s ' + (i * 0.04) + 's cubic-bezier(.16,1,.3,1)';
    io.observe(el);
  });

  /* ── Contact form ── */
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!validate()) return;
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(function() {
        form.style.display = 'none';
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 700);
    });

    form.querySelectorAll('input, select, textarea').forEach(function(el) {
      el.addEventListener('input', function() {
        el.style.borderColor = '';
        var errEl = el.parentNode.querySelector('.f-err');
        if (errEl) errEl.remove();
      });
    });
  }

  function validate() {
    var ok = true;
    clearErrors();
    var fn = form.querySelector('#firstName');
    var ln = form.querySelector('#lastName');
    var em = form.querySelector('#email');
    if (!fn.value.trim()) { showErr(fn, 'First name required'); ok = false; }
    if (!ln.value.trim()) { showErr(ln, 'Last name required');  ok = false; }
    if (!em.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) { showErr(em, 'Valid email required'); ok = false; }
    return ok;
  }
  function showErr(input, msg) {
    input.style.borderColor = '#c0392b';
    var span = document.createElement('span');
    span.className = 'f-err';
    span.textContent = msg;
    span.style.cssText = 'display:block;font-size:.72rem;color:#c0392b;margin-top:.25rem';
    input.parentNode.appendChild(span);
  }
  function clearErrors() {
    if (!form) return;
    form.querySelectorAll('.f-err').forEach(function(e) { e.remove(); });
    form.querySelectorAll('input,select,textarea').forEach(function(el) { el.style.borderColor = ''; });
  }

  /* ── Phone formatting ── */
  var phone = document.getElementById('phone');
  if (phone) {
    phone.addEventListener('input', function() {
      var v = phone.value.replace(/\D/g, '').slice(0, 10);
      if (v.length >= 6)      v = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6);
      else if (v.length >= 3) v = '(' + v.slice(0,3) + ') ' + v.slice(3);
      phone.value = v;
    });
  }

  /* ── Video placeholders ── */
  document.querySelectorAll('.gal-item.vid').forEach(function(el) {
    el.addEventListener('click', videoModal);
    el.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); videoModal(); } });
  });

  function videoModal() {
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeIn .2s ease';
    ov.innerHTML = '<div style="text-align:center;padding:2rem;max-width:480px"><h3 style="font-family:\'Bebas Neue\',sans-serif;font-size:2rem;letter-spacing:.05em;color:#fff;margin-bottom:.75rem">Video Content</h3><p style="color:#aaa;font-size:.9rem;line-height:1.65;margin-bottom:1.5rem">Connect your YouTube channel (@AlersMartialArts) here — replace this with an &lt;iframe&gt; embed.</p><p style="color:#444;font-size:.78rem">Click anywhere to close</p></div>';
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    var rm = function() { ov.remove(); document.body.style.overflow = ''; };
    ov.addEventListener('click', rm);
    document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { rm(); document.removeEventListener('keydown', k); } });
  }

  /* inject fadeIn keyframe */
  var s = document.createElement('style');
  s.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
  document.head.appendChild(s);

  /* ── Waiver form ── */
  var waiverForm    = document.getElementById('waiverForm');
  var waiverSuccess = document.getElementById('waiverSuccess');
  var waiverSubmit  = document.getElementById('waiverSubmitBtn');

  if (waiverForm) {
    /* Auto-fill today's date */
    var wDate = document.getElementById('wDate');
    if (wDate) {
      var now = new Date();
      wDate.value = now.toISOString().split('T')[0];
    }

    waiverForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var checks = ['wc1','wc2','wc3','wc4'];
      var allChecked = checks.every(function(id) {
        var el = document.getElementById(id);
        return el && el.checked;
      });
      var firstName  = document.getElementById('wFirstName');
      var lastName   = document.getElementById('wLastName');
      var email      = document.getElementById('wEmail');
      var dob        = document.getElementById('wDob');
      var sig        = document.getElementById('wSignature');
      var ok = true;

      if (!allChecked) {
        alert('Please check all agreement boxes before signing.');
        return;
      }
      if (!firstName.value.trim()) { firstName.style.borderColor='var(--red)'; ok=false; }
      if (!lastName.value.trim())  { lastName.style.borderColor='var(--red)';  ok=false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.style.borderColor='var(--red)'; ok=false; }
      if (!dob.value) { dob.style.borderColor='var(--red)'; ok=false; }
      if (!sig.value.trim()) { sig.style.borderColor='var(--red)'; ok=false; }
      if (!ok) { alert('Please fill in all required fields and provide your signature.'); return; }

      waiverSubmit.disabled = true;
      waiverSubmit.textContent = 'Submitting…';
      setTimeout(function() {
        waiverForm.style.display = 'none';
        waiverSuccess.style.display = 'block';
        waiverSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 700);
    });
  }

  /* ── Summer camp popup ── */
  var campPopup   = document.getElementById('campPopup');
  var campClose   = document.getElementById('campClose');
  var campDismiss = document.getElementById('campDismiss');
  var campCta     = document.getElementById('campCta');

  function closeCamp() {
    campPopup.classList.remove('active');
    sessionStorage.setItem('campSeen', '1');
  }

  if (campPopup && !sessionStorage.getItem('campSeen')) {
    setTimeout(function() { campPopup.classList.add('active'); }, 2000);
    if (campClose)   campClose.addEventListener('click', closeCamp);
    if (campDismiss) campDismiss.addEventListener('click', closeCamp);
    if (campCta)     campCta.addEventListener('click', closeCamp);
    campPopup.addEventListener('click', function(e) { if (e.target === campPopup) closeCamp(); });
    document.addEventListener('keydown', function campKey(e) {
      if (e.key === 'Escape') { closeCamp(); document.removeEventListener('keydown', campKey); }
    });
  }

})();
