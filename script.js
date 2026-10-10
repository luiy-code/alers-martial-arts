/* ============================================================
   ALERS MARTIAL ARTS — script.js (v3)
   ============================================================ */

/* ── Page tab switch (global — called from onclick in HTML) ── */
var SECTION_MAP_G = {
  home:'home', disciplines:'home', about:'home', testimonials:'home',
  programs:'programs',
  schedule:'schedule', pricing:'schedule',
  gallery:'gallery',
  coaches:'coaches',
  merch:'merch',
  contact:'contact', waiver:'contact'
};

function switchPage(page) {
  if (!page) page = 'home';
  document.querySelectorAll('.page-section').forEach(function(p) {
    p.classList.toggle('active', p.dataset.page === page);
  });
  document.querySelectorAll('.nav-links .tab-link').forEach(function(a) {
    var href = a.getAttribute('href').replace('#', '');
    a.classList.toggle('active', (SECTION_MAP_G[href] || href) === page);
  });
  window.scrollTo(0, 0);
  try { history.pushState(null, '', '#' + page); } catch(e) {}
  /* close mobile menu if open */
  var nm = document.getElementById('navLinks');
  var mb = document.getElementById('menuBtn');
  if (nm) nm.classList.remove('open');
  if (mb) { mb.classList.remove('open'); mb.setAttribute('aria-expanded','false'); }
  document.body.style.overflow = '';
}

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

  /* ── Push navbar below topbar ── */
  var topbar = document.querySelector('.topbar');
  function setNavbarOffset() {
    if (topbar && navbar) navbar.style.top = topbar.offsetHeight + 'px';
  }
  setNavbarOffset();
  window.addEventListener('resize', setNavbarOffset);

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
    testimonials: 'home',
    programs: 'programs',
    schedule: 'schedule', pricing: 'schedule',
    gallery: 'gallery',
    coaches: 'coaches',
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
    var page = SECTION_MAP_G[hash] || hash || 'home';
    switchPage(page);
  })();

  /* Handle browser back/forward */
  window.addEventListener('popstate', function() {
    var hash = location.hash.replace('#', '');
    switchPage(SECTION_MAP_G[hash] || hash || 'home');
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
      var program    = document.getElementById('wProgram');
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
      if (program && !program.value) { program.style.borderColor='var(--red)'; ok=false; }
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

  /* ── Rashguard option picker ── */
  var rashOptions = document.getElementById('rashOptions');
  var rashBuyBtn  = document.getElementById('rashBuyBtn');
  if (rashOptions && rashBuyBtn) {
    rashOptions.addEventListener('change', function(e) {
      var radio = e.target;
      if (radio.type !== 'radio') return;
      var msg   = radio.dataset.msg;
      var price = radio.dataset.price;
      rashBuyBtn.href = 'https://wa.me/19543030527?text=' + msg;
      rashBuyBtn.textContent = 'Buy Now — ' + price;
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

/* ── Shop product modal ────────────────────────────────────── */
var SHOP_DATA = {
  rashguard: {
    brand:'AMA', name:'Rashguard',
    desc:'Official AMA compression rashguard — polyester/spandex blend built for BJJ, MMA, and grappling. "AMA – American Martial Arts" chest print.',
    price:'$45', defaultImg:'shop-rash-classic-front.png',
    styles:[
      {label:'Classic Black', img:'shop-rash-classic-front.png', images:['shop-rash-classic-front.png','shop-rash-classic-back.png','shop-rash-classic-side.png']},
      {label:'USA Edition',   img:'shop-rash-usa-front.png',  images:['shop-rash-usa-front.png','shop-rash-usa-back.png','shop-rash-usa-side.png']}
    ],
    sizes:['S','M','L','XL','2XL'],
    waBase:'Hi!+I%27d+like+to+order+an+AMA+Rashguard+(%2445).'
  },
  fightshorts: {
    brand:'AMA', name:'Fight Shorts',
    desc:'Official AMA MMA fight shorts — "01 A Team" embroidered patch, contrast flag panels, 4-way stretch elastic waistband.',
    price:'$45', defaultImg:'shop-shorts-classic-front.png',
    styles:[
      {label:'Classic Black', img:'shop-shorts-classic-front.png', images:['shop-shorts-classic-front.png','shop-shorts-classic-back.png','shop-shorts-classic-side.png']},
      {label:'USA Edition',   img:'shop-shorts-usa-front.png', images:['shop-shorts-usa-front.png','shop-shorts-usa-back.png','shop-shorts-usa-side.png']}
    ],
    sizes:['S','M','L','XL','2XL'],
    waBase:'Hi!+I%27d+like+to+order+AMA+Fight+Shorts+(%2445).'
  },
  amaset: {
    brand:'AMA', name:'Full Set — Top + Shorts',
    desc:'The complete AMA look — rashguard and fight shorts bundled together. Save $10 vs buying separately.',
    price:'$80', oldPrice:'$90', defaultImg:'shop-set-classic-front.png',
    styles:[
      {label:'Classic Black', img:'shop-set-classic-front.png', images:['shop-set-classic-front.png','shop-set-classic-back.png','shop-set-classic-side.png']},
      {label:'USA Edition',   img:'shop-set-usa-front.png',  images:['shop-set-usa-front.png','shop-set-usa-back.png','shop-set-usa-side.png']}
    ],
    sizes:['S','M','L','XL','2XL'],
    waBase:'Hi!+I%27d+like+to+order+the+AMA+Full+Set+(Rashguard+%2B+Shorts%2C+%2480).'
  },
  shorts: {
    brand:'Beast', name:'Muay Thai Shorts',
    desc:'Lightweight Beast Muay Thai shorts with the iconic gorilla logo — black/white splatter print. Made for mobility and built to last.',
    price:'$25', defaultImg:'shop-shorts.jpg',
    images:['shop-shorts.jpg'],
    styles:null,
    sizes:['S','M','L','XL','2XL'],
    waBase:'Hi!+I%27d+like+to+order+Beast+Muay+Thai+Shorts+(%2425).'
  },
  gloves: {
    brand:'Beast', name:'Boxing Gloves',
    desc:'Jim "The Beast" Alers signature gloves — premium build for bag work, pad work, and sparring. White splatter graphic with bold BEAST lettering.',
    price:'$45', defaultImg:'shop-gloves-red.jpg',
    styles:[
      {label:'Red / White',   img:'shop-gloves-red.jpg', images:['shop-gloves-red.jpg']},
      {label:'Black / White', img:'shop-gloves-bw.jpg',  images:['shop-gloves-bw.jpg']}
    ],
    sizes:null,
    waBase:'Hi!+I%27d+like+to+order+Beast+Boxing+Gloves+(%2445).'
  },
  wraps: {
    brand:'Beast', name:'Inner Gloves',
    desc:'Padded knuckle inner gloves with the Beast gorilla-print wrap band. Slip on and train — no wrapping time needed.',
    price:'$15', defaultImg:'shop-wraps.jpg',
    images:['shop-wraps.jpg'],
    styles:null, sizes:null,
    waBase:'Hi!+I%27d+like+to+order+Beast+Inner+Gloves+(%2415).'
  },
  shinpads: {
    brand:'Beast', name:'Shin Pads',
    desc:'Professional Beast shin guards — full BEAST logo front, firm shell, padded interior, Velcro ankle strap. Essential for Muay Thai and MMA sparring.',
    price:'$45', defaultImg:'shop-shinpads.jpg',
    images:['shop-shinpads.jpg'],
    styles:null, sizes:null,
    waBase:'Hi!+I%27d+like+to+order+Beast+Shin+Pads+(%2445).'
  }
};

var _shopState = {key:null, styleIdx:0, size:null, imgIdx:0, images:[]};

function _shopGetImages(p, styleIdx) {
  if (p.styles && p.styles[styleIdx] && p.styles[styleIdx].images && p.styles[styleIdx].images.length) {
    return p.styles[styleIdx].images;
  }
  if (p.images && p.images.length) return p.images;
  return [p.defaultImg];
}

function _shopRenderThumbs(images, activeIdx) {
  var strip = document.getElementById('shopThumbStrip');
  var prev  = document.getElementById('shopImgPrev');
  var next  = document.getElementById('shopImgNext');
  strip.innerHTML = '';
  var multi = images.length > 1;
  if (prev) prev.hidden = !multi;
  if (next) next.hidden = !multi;
  if (!multi) return;
  images.forEach(function(src, i) {
    var btn = document.createElement('button');
    btn.className = 'shop-thumb' + (i === activeIdx ? ' active' : '');
    btn.setAttribute('aria-label', 'View image ' + (i + 1));
    var thumbImg = document.createElement('img');
    thumbImg.src = src; thumbImg.alt = ''; thumbImg.loading = 'lazy';
    btn.appendChild(thumbImg);
    btn.onclick = function() { _shopSetImg(i); };
    strip.appendChild(btn);
  });
}

function _shopSetImg(idx) {
  var images = _shopState.images;
  if (!images || idx < 0 || idx >= images.length) return;
  _shopState.imgIdx = idx;
  document.getElementById('shopModalImg').src = images[idx];
  document.getElementById('shopThumbStrip').querySelectorAll('.shop-thumb').forEach(function(t, i) {
    t.classList.toggle('active', i === idx);
  });
}

function shopImgNav(dir) {
  var images = _shopState.images;
  if (!images || !images.length) return;
  _shopSetImg(((_shopState.imgIdx || 0) + dir + images.length) % images.length);
}

function shopOpen(key) {
  var p = SHOP_DATA[key];
  if (!p) return;
  var initImages = _shopGetImages(p, 0);
  _shopState = {key:key, styleIdx:0, size:null, imgIdx:0, images:initImages};

  document.getElementById('shopModalBrand').textContent = p.brand;
  document.getElementById('shopModalName').textContent  = p.name;
  document.getElementById('shopModalDesc').textContent  = p.desc;

  var priceEl = document.getElementById('shopModalPrice');
  priceEl.innerHTML = p.price + (p.oldPrice ? ' <span class="shop-old-price">' + p.oldPrice + '</span>' : '');

  var img = document.getElementById('shopModalImg');
  img.src = initImages[0] || p.defaultImg; img.alt = p.name;
  _shopRenderThumbs(initImages, 0);

  /* Style pills */
  var styleGrp   = document.getElementById('shopStyleGroup');
  var stylePills  = document.getElementById('shopStylePills');
  stylePills.innerHTML = '';
  if (p.styles && p.styles.length) {
    styleGrp.style.display = '';
    p.styles.forEach(function(s, i) {
      var btn = document.createElement('button');
      btn.className = 'shop-pill' + (i === 0 ? ' active' : '');
      btn.textContent = s.label;
      btn.onclick = function() {
        _shopState.styleIdx = i;
        var imgs = _shopGetImages(p, i);
        _shopState.images = imgs; _shopState.imgIdx = 0;
        document.getElementById('shopModalImg').src = imgs[0] || s.img;
        _shopRenderThumbs(imgs, 0);
        stylePills.querySelectorAll('.shop-pill').forEach(function(b,bi){ b.classList.toggle('active', bi===i); });
        _shopUpdateLink();
      };
      stylePills.appendChild(btn);
    });
  } else {
    styleGrp.style.display = 'none';
  }

  /* Size pills */
  var sizeGrp  = document.getElementById('shopSizeGroup');
  var sizePills = document.getElementById('shopSizePills');
  sizePills.innerHTML = '';
  if (p.sizes && p.sizes.length) {
    sizeGrp.style.display = '';
    p.sizes.forEach(function(sz) {
      var btn = document.createElement('button');
      btn.className = 'shop-pill shop-pill-size';
      btn.textContent = sz;
      btn.onclick = function() {
        _shopState.size = sz;
        sizePills.querySelectorAll('.shop-pill').forEach(function(b){ b.classList.toggle('active', b.textContent===sz); });
        _shopUpdateLink();
      };
      sizePills.appendChild(btn);
    });
  } else {
    sizeGrp.style.display = 'none';
  }

  _shopUpdateLink();

  var modal = document.getElementById('shopModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function _shopUpdateLink() {
  var p = SHOP_DATA[_shopState.key];
  if (!p) return;
  var msg = p.waBase;
  if (p.styles && p.styles[_shopState.styleIdx]) {
    msg += '+Style%3A+' + encodeURIComponent(p.styles[_shopState.styleIdx].label).replace(/%20/g,'+');
  }
  if (_shopState.size) { msg += '+Size%3A+' + _shopState.size; }
  document.getElementById('shopModalBuy').href = 'https://wa.me/19543030527?text=' + msg;
}

function shopClose() {
  document.getElementById('shopModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* keyboard nav for cards */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') shopClose();
});
document.querySelectorAll('.shop-card').forEach(function(card) {
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});
