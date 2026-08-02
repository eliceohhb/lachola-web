/* =========================================================
   LA CHOLA · Página de producto · JavaScript
   Galeria de miniaturas con cambio de imagen grande + lightbox
   ========================================================= */
(function () {
  'use strict';

  const imgGrande = document.getElementById('productoImgGrande');
  const thumbs   = document.getElementById('productoThumbs');

  if (!imgGrande || !thumbs) return;

  // --- Cambio de imagen al hacer click/borrar en un thumb ---
  thumbs.addEventListener('click', function (e) {
    const thumb = e.target.closest('.producto__thumb');
    if (!thumb) return;

    const src = thumb.dataset.img;
    const alt = thumb.dataset.alt;
    if (!src) return;

    // Marca activo
    thumbs.querySelectorAll('.producto__thumb').forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    thumb.classList.add('is-active');
    thumb.setAttribute('aria-selected', 'true');

    // Fade out -> cambiar src -> fade in
    imgGrande.classList.add('is-cambiando');
    const preloader = new Image();
    preloader.onload = () => {
      imgGrande.src = src;
      imgGrande.alt = alt || '';
      imgGrande.classList.remove('is-cambiando');
    };
    preloader.src = src;
  });

  // --- Lightbox simple en la imagen grande ---
  imgGrande.addEventListener('click', function () {
    const src = imgGrande.src;
    const alt = imgGrande.alt || 'Charlotte artesanal';

    const overlay = document.createElement('div');
    overlay.className = 'producto__lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Imagen ampliada: ' + alt);
    overlay.innerHTML =
      '<button class="producto__lightbox-cerrar" aria-label="Cerrar imagen ampliada">&times;</button>' +
      '<img src="' + src + '" alt="' + alt.replace(/"/g, '"') + '" />';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.focus();

    const cerrar = () => {
      overlay.remove();
      document.body.style.overflow = '';
    };
    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay || ev.target.classList.contains('producto__lightbox-cerrar')) cerrar();
    });
    document.addEventListener('keydown', function onKey(ev) {
      if (ev.key === 'Escape') { cerrar(); document.removeEventListener('keydown', onKey); }
    });
  });

  // Cursor pointer visual en la imagen grande (mejor affordance)
  imgGrande.style.cursor = 'zoom-in';
})();
