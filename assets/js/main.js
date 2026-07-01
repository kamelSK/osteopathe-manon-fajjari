/* Manon Fajjari — Ostéopathe | interactions */
(function () {
  'use strict';

  /* =========================================================================
     CONFIGURATION — à personnaliser
     ========================================================================= */
  var CONFIG = {
    // Fiche Google (avis). Lien de partage fourni par la praticienne.
    googleUrl: 'https://share.google/MJVze3w1MALIBznbP',
    // Note et nombre d'avis Google. Laisser à null tant qu'ils ne sont pas connus
    // (le badge affichera alors un simple appel à l'action, sans note inventée).
    // Exemple une fois connus : googleRating: '5,0', googleCount: '27'
    googleRating: null,
    googleCount: null,

    // WhatsApp — numéro au format international SANS le "+" ni espaces.
    // ⚠️ REMPLACER par le vrai numéro (ex. 33612345678 pour 06 12 34 56 78).
    whatsappNumber: '33600000000',
    // Message pré-rempli dans WhatsApp quand le visiteur démarre la conversation.
    whatsappPrefill: 'Bonjour, je vous contacte depuis votre site internet.'
  };

  var svgStar = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3 6.5 7 .6-5.3 4.6 1.6 6.8L12 17l-6.2 3.5 1.6-6.8L2 9.1l7-.6L12 2Z"/></svg>';
  var svgStars = svgStar + svgStar + svgStar + svgStar + svgStar;
  var svgGoogleG = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.1z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9h-7.3v5.7C7.9 41.1 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.3-3 .7-4.3v-5.7H4.5C3 17 2 20.4 2 24s1 7 2.5 10l7.3-5.7z"/><path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 7.9 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"/></svg>';

  /* =========================================================================
     Injection : barre d'avis Google (haut de page)
     ========================================================================= */
  var ratingLabel = (CONFIG.googleRating)
    ? CONFIG.googleRating + (CONFIG.googleCount ? ' · ' + CONFIG.googleCount + ' avis' : '') + ' sur Google'
    : 'Avis Google';
  var ratingLabelLong = (CONFIG.googleRating)
    ? 'Note ' + CONFIG.googleRating + (CONFIG.googleCount ? ' sur ' + CONFIG.googleCount + ' avis' : '') + ' sur Google'
    : 'Vos avis comptent — retrouvez-nous sur Google';

  var topbar = document.createElement('div');
  topbar.className = 'gmb-topbar';
  topbar.innerHTML =
    '<a href="' + CONFIG.googleUrl + '" target="_blank" rel="noopener" aria-label="' + ratingLabelLong + '">' +
      '<span class="g-logo">' + svgGoogleG + '</span>' +
      '<span class="stars" aria-hidden="true">' + svgStars + '</span>' +
      '<span class="tb-text">' + ratingLabel + '</span>' +
      '<span class="tb-cta">Voir la fiche &amp; laisser un avis</span>' +
    '</a>';
  document.body.insertBefore(topbar, document.body.firstChild);

  /* =========================================================================
     Injection : bloc d'avis Google (bas de page, au-dessus du footer)
     ========================================================================= */
  var footer = document.querySelector('.site-footer');
  if (footer) {
    var fbar = document.createElement('section');
    fbar.className = 'gmb-footerbar';
    fbar.setAttribute('aria-label', 'Avis Google');
    fbar.innerHTML =
      '<div class="container"><div class="inner">' +
        '<span class="g-logo">' + svgGoogleG + '</span>' +
        '<div class="rev">' +
          '<span class="stars" aria-hidden="true">' + svgStars + '</span>' +
          '<div><b>' + (CONFIG.googleRating ? CONFIG.googleRating + ' / 5 sur Google' : 'Ils nous recommandent sur Google') + '</b>' +
          '<span>' + (CONFIG.googleCount ? 'Basé sur ' + CONFIG.googleCount + ' avis vérifiés' : 'Votre avis nous aide à progresser') + '</span></div>' +
        '</div>' +
        '<a class="btn btn--ghost" href="' + CONFIG.googleUrl + '" target="_blank" rel="noopener">Voir &amp; laisser un avis</a>' +
      '</div></div>';
    footer.parentNode.insertBefore(fbar, footer);
  }

  /* =========================================================================
     Injection : widget WhatsApp flottant
     ========================================================================= */
  var svgWa = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-1.8c1.9 1 4 1.6 6.1 1.6 7 0 12.5-5.5 12.5-12.5S23 3 16 3zm0 22.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.2 10.2 0 0 1-1.6-5.6c0-5.7 4.7-10.3 10.4-10.3 5.7 0 10.3 4.6 10.3 10.3S21.7 25.8 16 25.8zm5.7-7.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/></svg>';

  var fab = document.createElement('button');
  fab.className = 'wa-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Ouvrir la discussion WhatsApp');
  fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = '<span class="wa-ping" aria-hidden="true"></span>' + svgWa + '<span class="wa-dot" aria-hidden="true">1</span>';

  var now = new Date();
  var hh = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);

  var panel = document.createElement('div');
  panel.className = 'wa-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Discussion WhatsApp avec Manon Fajjari');
  panel.innerHTML =
    '<div class="wa-head">' +
      '<span class="av" aria-hidden="true">M</span>' +
      '<div class="who"><b>Manon Fajjari</b><span>Ostéopathe · En ligne</span></div>' +
      '<button class="wa-close" type="button" aria-label="Fermer la discussion">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="wa-body">' +
      '<div class="wa-bubble">Bonjour&nbsp;👋 Comment puis-je vous aider&nbsp;?<span class="wa-time">' + hh + '</span></div>' +
    '</div>' +
    '<form class="wa-foot">' +
      '<input type="text" name="msg" aria-label="Votre message" placeholder="Écrivez votre message…" autocomplete="off" />' +
      '<button class="wa-send" type="submit" aria-label="Envoyer sur WhatsApp">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>' +
      '</button>' +
    '</form>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var waInput = panel.querySelector('input');

  function waUrl(text) {
    var t = (text && text.trim()) ? text.trim() : CONFIG.whatsappPrefill;
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(t);
  }
  function openWa() {
    panel.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    var dot = fab.querySelector('.wa-dot'); if (dot) dot.style.display = 'none';
    setTimeout(function () { if (waInput) waInput.focus(); }, 300);
  }
  function closeWa() {
    panel.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }
  fab.addEventListener('click', function () {
    panel.classList.contains('open') ? closeWa() : openWa();
  });
  panel.querySelector('.wa-close').addEventListener('click', closeWa);
  panel.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    window.open(waUrl(waInput ? waInput.value : ''), '_blank', 'noopener');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeWa();
  });
  document.addEventListener('click', function (e) {
    if (panel.classList.contains('open') && !panel.contains(e.target) && !fab.contains(e.target)) closeWa();
  });

  /* =========================================================================
     En-tête au défilement (+ masquage de la barre Google)
     ========================================================================= */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    var scrolled = window.scrollY > 24;
    if (header) header.classList.toggle('scrolled', scrolled);
    topbar.classList.toggle('hidden', scrolled);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* =========================================================================
     Menu mobile
     ========================================================================= */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  function setMenuTop() {
    if (header && links) links.style.top = Math.round(header.getBoundingClientRect().bottom) + 'px';
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      if (open) setMenuTop();
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    window.addEventListener('resize', function () { if (links.classList.contains('open')) setMenuTop(); });
  }

  /* =========================================================================
     Animations au scroll
     ========================================================================= */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* =========================================================================
     FAQ accordéon
     ========================================================================= */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + 'px';
    });
  });

  /* ----- Année du footer ----- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
