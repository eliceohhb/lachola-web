/* =========================================================
   LA CHOLA · main.js
   Menú móvil, carrusel de testimonios, nav activa por scroll,
   header scrolled y revelado de secciones al hacer scroll
   ========================================================= */
(function () {
  'use strict';

  /* Activa la clase 'js' para animaciones progresivas (si JS falla, todo queda visible) */
  document.documentElement.classList.add('js');

  /* ---------- Header con sombra al hacer scroll ---------- */
  const header = document.querySelector('.header');
  if (header) {
    const onHeaderScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onHeaderScroll, { passive: true });
    onHeaderScroll();
  }

  /* ---------- Menú hamburguesa ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar el menú al hacer clic en un enlace (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Carrusel de testimonios ---------- */
  const pista = document.getElementById('carruselPista');
  const prev = document.getElementById('carruselPrev');
  const next = document.getElementById('carruselNext');

  if (pista && prev && next) {
    const slides = pista.children;
    let index = 0;

    function actualizar() {
      // evtica valores fuera de rango
      index = (index + slides.length) % slides.length;
      pista.style.transform = 'translateX(-' + index * 100 + '%)';
    }

    next.addEventListener('click', function () { index++; actualizar(); });
    prev.addEventListener('click', function () { index--; actualizar(); });

    // Auto-avance cada 6s (opcional, sutil)
    let timer = setInterval(function () { index++; actualizar(); }, 6000);

    // Pausar auto-avance al interactuar
    [prev, next].forEach(function (btn) {
      btn.addEventListener('click', function () { clearInterval(timer); });
    });

    actualizar();
  }

  /* ---------- Nav activa según sección visible ---------- */
  const secciones = document.querySelectorAll('section[id], footer[id]');
  const links = document.querySelectorAll('.nav__link');

  function resaltarActiva() {
    let actual = '';
    const top = window.scrollY + 120;

    secciones.forEach(function (sec) {
      if (top >= sec.offsetTop) {
        actual = sec.id;
      }
    });

    links.forEach(function (link) {
      link.classList.remove('is-active');
      const href = link.getAttribute('href');
      if (href === '#' + actual) {
        link.classList.add('is-active');
      }
    });
  }

  window.addEventListener('scroll', resaltarActiva, { passive: true });
  resaltarActiva();

  /* ---------- Año dinámico en footer ---------- */
  const yearEl = document.querySelector('.footer__bottom p');
  if (yearEl && yearEl.textContent.includes('2024')) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2024', String(new Date().getFullYear()));
  }

  /* ---------- Revelar secciones al hacer scroll (sutil) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    } else {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }
})();
