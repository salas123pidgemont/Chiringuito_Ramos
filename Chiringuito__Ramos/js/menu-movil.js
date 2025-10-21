// menu-movil.js
// Funciona al insertarse después del fetch, no depende de DOMContentLoaded

(function() {
const hamburguesa = document.getElementById('hamburguesa');
const navegacion = document.getElementById('navegacion');
const overlay = document.getElementById('overlay');
const body = document.body;

if (!hamburguesa || !navegacion || !overlay) return;

function abrirMenu() {
    hamburguesa.classList.add('open');
    hamburguesa.setAttribute('aria-expanded', 'true');
    navegacion.classList.add('active');
    navegacion.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    body.classList.add('menu-abierto');

    // Bloquear touchmove fuera del menú (scroll solo dentro de contenedor-enlaces)
    function preventTouch(e) {
    if (e.target.closest('#navegacion .contenedor-enlaces')) return;
    e.preventDefault();
    }
    document.addEventListener('touchmove', preventTouch, { passive: false });
    document._preventTouchHandler = preventTouch;
}

function cerrarMenu() {
    hamburguesa.classList.remove('open');
    hamburguesa.setAttribute('aria-expanded', 'false');
    navegacion.classList.remove('active');
    navegacion.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    body.classList.remove('menu-abierto');

    // Quitar bloqueo touchmove
    if (document._preventTouchHandler) {
    document.removeEventListener('touchmove', document._preventTouchHandler, { passive: false });
    delete document._preventTouchHandler;
    }
}

  // Toggle menú
hamburguesa.addEventListener('click', function(e) {
    e.stopPropagation();
    if (navegacion.classList.contains('active')) cerrarMenu();
    else abrirMenu();
});

  // Cerrar menú al clicar overlay
overlay.addEventListener('click', cerrarMenu);

  // Cerrar menú al clicar fuera
document.addEventListener('click', function(e) {
    if (navegacion.classList.contains('active') &&
        !navegacion.contains(e.target) &&
        e.target !== hamburguesa) {
    cerrarMenu();
    }
});

  // Evitar que clics dentro del menú cierren el menú
navegacion.addEventListener('click', function(e) {
    e.stopPropagation();
});

  // Ajuste opcional de altura del contenedor de enlaces
const cont = navegacion.querySelector('.contenedor-enlaces');
function ajustarMaxHeight() {
    const redes = navegacion.querySelector('.redes-socialess');
    const redesHeight = redes ? redes.offsetHeight : 0;
    const headerSpace = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 60;
    cont.style.maxHeight = `calc(100vh - ${redesHeight + headerSpace + 20}px)`;
}
window.addEventListener('resize', ajustarMaxHeight);
setTimeout(ajustarMaxHeight, 100);
})();
