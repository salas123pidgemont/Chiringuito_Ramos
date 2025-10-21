// Función para cargar un include
function loadInclude(id, file) {
fetch(file)
    .then(response => response.text())
    .then(html => {
    document.getElementById(id).innerHTML = html;

      // Una vez cargado el menú, inicializamos el scroll
    initMenuScroll();
    })
    .catch(err => console.error(`Error cargando ${file}:`, err));
}

// Función que agrega/quita clase 'solid' al hacer scroll
function initMenuScroll() {
const menu = document.querySelector('.menu-navegacion');
if (!menu) return;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
    menu.classList.add('solid');
    } else {
    menu.classList.remove('solid');
    }
});
}

// Cargar menú
document.addEventListener('DOMContentLoaded', () => {
loadInclude('menu-container', '/includes/menu.html');
});
