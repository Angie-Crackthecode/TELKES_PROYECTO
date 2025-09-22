// Carrusel 

// Índice actual del slide que se muestra (comienza en 0)
let currentSlide = 0; // guarda el índice de la diapositiva actualmente visible

// NodeList con todas las imágenes dentro del contenedor del carrusel
const slides = document.querySelectorAll('.carousel-images img'); // selecciona todas las <img> del carrusel

// Elemento contenedor del carrusel (donde se aplicará el transform)
const carousel = document.querySelector('.carousel-images'); // contenedor que se moverá con translateY

// Número de diapositivas "reales" (se divide entre 2 porque el HTML suele duplicar imágenes
const totalSlides = slides.length / 2; // calcula cuántas "diapositivas" reales hay (si duplicaste para loop)

// Altura de cada slide (se calculará una vez cargada la imagen)
let slideHeight; // variable donde guardamos la altura de una imagen/slide

// Identificador del intervalo de auto-cambio (para poder detenerlo)
let autoChangeInterval; // referencia al setInterval que cambia slides automáticamente

// Bandera que indica si el carrusel está en medio de una transición
let isTransitioning = false; // evita ejecutar múltiples transiciones a la vez


// Inicializa el carrusel 
function initializeCarousel() {
  const firstImage = slides[0]; //Primera imagen - indice 0
  if (firstImage) { // si existe esa primera imagen
    firstImage.onload = () => { // asigna handler cuando la imagen termine de cargar
      slideHeight = firstImage.clientHeight; //Guarda la altura visible de la imagen en slideHeight
      startAutoChange(); //Llama a la función que inicia el auto-cambio
    };
    if (firstImage.complete) { //Si la imagen ya estaba cargada (cache), entra aquí
      slideHeight = firstImage.clientHeight; //Guarda la altura visible
      startAutoChange(); //Inicia el auto-cambio inmediatamente
    }
  }
}

// Funcion de tiempo de cambios del carrusel
function updateCarousel(instant = false) {
  carousel.style.transition = instant
    ? 'none' // si instant true, desactiva la transición CSS para "saltos" instantáneos
    : 'transform 0.5s ease-in-out'; // si no, usa una transición suave de 0.5s
  carousel.style.transform = `translateY(-${currentSlide * slideHeight}px)`; // mueve el contenedor verticalmente según el índice y altura
}

function changeSlide(direction) {
  if (isTransitioning) return; //Si ya hay una transición en curso, no hace nada
  isTransitioning = true; //marca que ahora estamos en transición
  currentSlide += direction; //incrementa o decrementa el índice de slide según la dirección
  updateCarousel(); //aplica la transformación basada en el nuevo índice

  if (direction === 1 && currentSlide >= totalSlides) {
    // Si avanzamos y llegamos al final de las "reales", reseteamos tras la transición
    setTimeout(() => {
      currentSlide = 0; //resetea índice a 0 (inicio)
      updateCarousel(true); //actualiza sin transición para evitar parpadeo
      isTransitioning = false; //libera la bandera de transición
    }, 500); //500 ms para que coincida con la duración de la transición
  } else if (direction === -1 && currentSlide < 0) {
    // Si retrocedimos más allá del inicio, saltamos al final
    setTimeout(() => {
      currentSlide = totalSlides - 1; //pone el índice en la última diapositiva "real"
      updateCarousel(true); //actualiza sin animación
      isTransitioning = false; //libera la bandera
    }, 500);
  } else {
    // Caso normal: después del periodo de transición, liberamos la bandera
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

function startAutoChange() {
  stopAutoChange(); //asegura que no haya ya un intervalo activo
  autoChangeInterval = setInterval(() => {
    changeSlide(1); //cada X ms avanza una diapositiva
  }, 5000); // intervalo de 5 segundos
}

function stopAutoChange() {
  clearInterval(autoChangeInterval); //detiene el intervalo si existiera
}

// Añade listeners a inputs/textarea y flechas para pausar/reanudar el auto cambio
document
  .querySelectorAll('form input, form textarea, .carousel-arrow')
  .forEach((element) => {
    element.addEventListener('focus', stopAutoChange); //al enfocar un campo, pausa
    element.addEventListener('blur', startAutoChange); //al perder foco, reanuda
  });

initializeCarousel(); //llama a la función que configura el carrusel al cargar la página


// Formularios y modales


// Referencias a elementos del DOM
const contactForm = document.querySelector('form'); // primer form (contacto) en el documento
const successModal = document.getElementById('successModal'); // overlay modal de éxito
const closeModalBtn = document.querySelector('.modal-close-btn'); // botón dentro del modal de éxito para cerrarlo

const loginRequiredModal = document.getElementById('loginRequiredModal'); // overlay que avisa "debe iniciar sesión"
const btnCloseLoginRequired = document.getElementById('btn-close-login-required'); // botón "Cerrar" del aviso
const btnOpenLoginModal = document.getElementById('btn-open-login-modal'); // botón "Iniciar sesión" del aviso

// variable de estado (se actualizará usando updateLoginState)
let isLoggedIn = false; // estado local que indica si hay sesión; inicializamos en false

// función que revisa todas las fuentes plausibles de "usuario logueado"
function updateLoginState() {
  const fromSession = !!sessionStorage.getItem('usuario'); // true si hay clave 'usuario' en sessionStorage
  const fromLocal = !!localStorage.getItem('usuario'); // true si hay clave 'usuario' en localStorage

  // usa el DOM como respaldo: por ejemplo, #datos-usuario o botón de logout visible
  const datosEl = document.getElementById('datos-usuario'); // elemento donde muestras el nombre del usuario en header
  const datosVisible = datosEl && datosEl.textContent.trim() !== '' && !datosEl.classList.contains('oculto'); 
  // datosVisible: true si existe el elemento, tiene texto no vacío y no tiene la clase 'oculto'

  const logoutBtn = document.getElementById('btn-logout'); // botón "Cerrar sesión"
  const logoutVisible = logoutBtn && getComputedStyle(logoutBtn).display !== 'none' && !logoutBtn.classList.contains('oculto');
  // logoutVisible: true si el botón existe y no está oculto por CSS ni tiene clase 'oculto'

  isLoggedIn = fromSession || fromLocal || datosVisible || logoutVisible; // si alguna fuente indica login → true
  return isLoggedIn; // devuelve el resultado para uso inmediato
}

// Inicializa estado al cargar
updateLoginState(); // calcula isLoggedIn una vez al inicio

// storage listener (se activa si otra pestaña cambia el storage)
window.addEventListener('storage', () => {
  updateLoginState(); // si en otra pestaña se modificó session/localStorage, actualizamos el estado acá
});

// MutationObserver para detectar cambios en el DOM (p.ej. si tu logueo.js actualiza #datos-usuario)
(function attachMutationObservers() {
  const datosEl = document.getElementById('datos-usuario'); // elemento que puede cambiar al loguear
  const logoutBtn = document.getElementById('btn-logout'); // botón que puede mostrarse/ocultarse

  if (datosEl) {
    const obs = new MutationObserver(() => {
      updateLoginState(); // si el contenido o atributos cambian, recalcula el estado
    });
    obs.observe(datosEl, { characterData: true, childList: true, subtree: true, attributes: true });
    // observa cambios en texto, hijos y atributos dentro de datosEl
  }

  if (logoutBtn) {
    const obs2 = new MutationObserver(() => {
      updateLoginState(); // si el botón cambia (p. ej. se muestra), recalcula el estado
    });
    obs2.observe(logoutBtn, { attributes: true, childList: false, subtree: false });
    // observa sólo cambios de atributos en el botón (p. ej. clase, estilo)
  }
})(); // IIFE que adjunta observadores sin contaminar el scope global

// Manejo del submit: **siempre recalcula** el estado actual antes de decidir
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // evita que el formulario haga submit tradicional (recarga)

    // recalculamos el estado justo ahora
    const logged = updateLoginState(); // lee session/local/dom para estar 100% actualizado

    if (!logged) { // si NO está logueado
      if (loginRequiredModal) loginRequiredModal.classList.add('active'); // muestra el modal de aviso
      return; // sale sin enviar ni mostrar modal de éxito
    }

    // mostrar modal de éxito (usuario logueado)
    if (successModal) successModal.classList.add('active');
  });
}

// Botones del modal de aviso
if (btnCloseLoginRequired) {
  btnCloseLoginRequired.addEventListener('click', () => {
    if (loginRequiredModal) loginRequiredModal.classList.remove('active'); // cierra el aviso al pulsar "Cerrar"
  });
}
if (btnOpenLoginModal) {
  btnOpenLoginModal.addEventListener('click', () => {
    if (loginRequiredModal) loginRequiredModal.classList.remove('active'); // cierra aviso
    const loginModalEl = document.getElementById('loginModal'); // busca el modal de bootstrap para login
    if (loginModalEl) {
      const loginModal = new bootstrap.Modal(loginModalEl); // crea instancia de Bootstrap Modal
      loginModal.show(); // muestra el modal de login para que el usuario inicie sesión
    }
  });
}

// Cierre modal éxito (botón)
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', function () {
    if (successModal) successModal.classList.remove('active'); // quita la clase active para ocultarlo
    if (contactForm) contactForm.reset(); // limpia los campos del formulario
  });
}
// Cierre modal éxito al hacer clic fuera del contenido (overlay)
if (successModal) {
  successModal.addEventListener('click', function (event) {
    if (event.target === successModal) { // solo si el clic fue en el overlay (no en el contenido)
      successModal.classList.remove('active'); // cerrar modal
      if (contactForm) contactForm.reset(); // limpiar formulario
    }
  });
}
