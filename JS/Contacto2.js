// Índice actual del slide que se muestra (comienza en 0)
let currentSlide = 0;
// NodeList con todas las imágenes dentro del contenedor del carrusel
const slides = document.querySelectorAll('.carousel-images img');
// Elemento contenedor del carrusel (donde se aplicará el transform)
const carousel = document.querySelector('.carousel-images');
// Número de diapositivas "reales" (se divide entre 2 porque el HTML suele duplicar imágenes
// para efecto infinito)
const totalSlides = slides.length / 2;
// Altura de cada slide (se calculará una vez cargada la imagen)
let slideHeight;
// Identificador del intervalo de auto-cambio (para poder detenerlo)
let autoChangeInterval;
// Bandera que indica si el carrusel está en medio de una transición
let isTransitioning = false;

// ============================
// Inicializa el carrusel
// ============================
function initializeCarousel() {
  const firstImage = slides[0]; //Primera imagen - indice 0
  if (firstImage) { 
    firstImage.onload = () => {  //Comprueba si existe
      slideHeight = firstImage.clientHeight; //Guarda la altura visible
      startAutoChange(); //Llama a funcion de cambio de imagen
    };
    if (firstImage.complete) { //Mismo procedimiento si ya esta guardado en cache
      slideHeight = firstImage.clientHeight;
      startAutoChange();
    }
  }
}

//Funcion de tiempo de cambios del carrusel
function updateCarousel(instant = false) {
  if (instant) {
    carousel.style.transition = 'none'; //true: quita animacion
  } else {
    carousel.style.transition = 'transform 0.5s ease-in-out'; //false: Cmabia la imagen 0,5s 
  }
  //Mueve el forma vertical el cambio con transform
  carousel.style.transform = `translateY(-${currentSlide * slideHeight}px)`;
}

//Funcion para cambio de imagen (hacia adelante(1) o atras(-1))
function changeSlide(direction) {
  if (isTransitioning) return; //Si hay transicion, no hace nada

  isTransitioning = true; //En transicion
  currentSlide += direction; //Cambia el indice de la imagen a mas

  updateCarousel(); //Actualiza el carrusel

  // Si se ha llegado al final o al principio, reinicia el índice después de la transición

  if (direction === 1 && currentSlide >= totalSlides) {
    setTimeout(() => {
      currentSlide = 0;
      updateCarousel(true);
      isTransitioning = false;
    }, 500);
  } else if (direction === -1 && currentSlide < 0) {
    setTimeout(() => {
      currentSlide = totalSlides - 1;
      updateCarousel(true);
      isTransitioning = false;
    }, 500);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

//Funcion de inicio y parada del cambio automatico
function startAutoChange() {
  stopAutoChange();
  autoChangeInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

//Detiene el cambio automatico cuando se esta escribiendo en el formulario
function stopAutoChange() {
  clearInterval(autoChangeInterval);
}

document.querySelectorAll('form input, form textarea, .carousel-arrow').forEach(element => {
  element.addEventListener('focus', stopAutoChange);
  element.addEventListener('blur', startAutoChange);
});

initializeCarousel();

// Funcionalidad del formulario
const contactForm = document.querySelector('form'); //Seleccion del primer formulario
const successModal = document.getElementById('successModal'); //Modal de exito con id
const closeModalBtn = document.querySelector('.modal-close-btn'); //Boton de cerrar modal

//Evento de envio del formulario
if (contactForm) { //Verfifica que el formulario existe
  contactForm.addEventListener('submit', function(event) { //Ve cuando el formulario se envia
    event.preventDefault(); //Evita el envio por defecto
    successModal.classList.add('active'); //Muestra el modal de exito
  });
}

//Evento de cierre del modal con boton
if (closeModalBtn) { //Verifica que el boton existe
  closeModalBtn.addEventListener('click', function() { //Cuando se hace click
    successModal.classList.remove('active'); //Oculta el modal (remueve active)
    // Limpiar los campos del formulario
    contactForm.reset(); 
  });
}

//Evento de cierre del modal al hacer clic fuera del contenido
if (successModal) { //Verifica que el modal existe
    successModal.addEventListener('click', function(event) {//Cuando se hace click en el modal
        if (event.target === successModal) { //Cuando el click ocurre en el fondo del modal (no en el contenido)
            successModal.classList.remove('active');
            // Limpiar los campos del formulario
            contactForm.reset();
        }
    });
}

