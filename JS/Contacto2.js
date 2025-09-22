// ============================
// Carrusel (sin cambios funcionales)
// ============================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-images img');
const carousel = document.querySelector('.carousel-images');
const totalSlides = slides.length / 2;
let slideHeight;
let autoChangeInterval;
let isTransitioning = false;

function initializeCarousel() {
  const firstImage = slides[0];
  if (firstImage) {
    firstImage.onload = () => {
      slideHeight = firstImage.clientHeight;
      startAutoChange();
    };
    if (firstImage.complete) {
      slideHeight = firstImage.clientHeight;
      startAutoChange();
    }
  }
}

function updateCarousel(instant = false) {
  carousel.style.transition = instant
    ? 'none'
    : 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateY(-${currentSlide * slideHeight}px)`;
}

function changeSlide(direction) {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide += direction;
  updateCarousel();

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

function startAutoChange() {
  stopAutoChange();
  autoChangeInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function stopAutoChange() {
  clearInterval(autoChangeInterval);
}

document
  .querySelectorAll('form input, form textarea, .carousel-arrow')
  .forEach((element) => {
    element.addEventListener('focus', stopAutoChange);
    element.addEventListener('blur', startAutoChange);
  });

initializeCarousel();

// ============================
// Formularios y modales (mejorado)
// ============================

const contactForm = document.querySelector('form'); // primer form (contacto)
const successModal = document.getElementById('successModal');
const closeModalBtn = document.querySelector('.modal-close-btn');

const loginRequiredModal = document.getElementById('loginRequiredModal');
const btnCloseLoginRequired = document.getElementById('btn-close-login-required');
const btnOpenLoginModal = document.getElementById('btn-open-login-modal');

// variable de estado (se actualizará usando updateLoginState)
let isLoggedIn = false;

// función que revisa todas las fuentes plausibles de "usuario logueado"
function updateLoginState() {
  const fromSession = !!sessionStorage.getItem('usuario');
  const fromLocal = !!localStorage.getItem('usuario');

  // usa el DOM como respaldo: por ejemplo, #datos-usuario o botón de logout visible
  const datosEl = document.getElementById('datos-usuario');
  const datosVisible = datosEl && datosEl.textContent.trim() !== '' && !datosEl.classList.contains('oculto');

  const logoutBtn = document.getElementById('btn-logout');
  const logoutVisible = logoutBtn && getComputedStyle(logoutBtn).display !== 'none' && !logoutBtn.classList.contains('oculto');

  isLoggedIn = fromSession || fromLocal || datosVisible || logoutVisible;
  return isLoggedIn;
}

// Inicializa estado al cargar
updateLoginState();

// storage listener (se activa si otra pestaña cambia el storage)
window.addEventListener('storage', () => {
  updateLoginState();
});

// MutationObserver para detectar cambios en el DOM (p.ej. si tu logueo.js actualiza #datos-usuario)
(function attachMutationObservers() {
  const datosEl = document.getElementById('datos-usuario');
  const logoutBtn = document.getElementById('btn-logout');

  if (datosEl) {
    const obs = new MutationObserver(() => {
      updateLoginState();
    });
    obs.observe(datosEl, { characterData: true, childList: true, subtree: true, attributes: true });
  }

  if (logoutBtn) {
    const obs2 = new MutationObserver(() => {
      updateLoginState();
    });
    obs2.observe(logoutBtn, { attributes: true, childList: false, subtree: false });
  }
})();

// Manejo del submit: **siempre recalcula** el estado actual antes de decidir
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // recalculamos el estado justo ahora
    const logged = updateLoginState();

    if (!logged) {
      if (loginRequiredModal) loginRequiredModal.classList.add('active');
      return;
    }

    // mostrar modal de éxito
    if (successModal) successModal.classList.add('active');
  });
}

// Botones del modal de aviso
if (btnCloseLoginRequired) {
  btnCloseLoginRequired.addEventListener('click', () => {
    if (loginRequiredModal) loginRequiredModal.classList.remove('active');
  });
}
if (btnOpenLoginModal) {
  btnOpenLoginModal.addEventListener('click', () => {
    if (loginRequiredModal) loginRequiredModal.classList.remove('active');
    const loginModalEl = document.getElementById('loginModal');
    if (loginModalEl) {
      const loginModal = new bootstrap.Modal(loginModalEl);
      loginModal.show();
    }
  });
}

// Cierre modal éxito
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', function () {
    if (successModal) successModal.classList.remove('active');
    if (contactForm) contactForm.reset();
  });
}
if (successModal) {
  successModal.addEventListener('click', function (event) {
    if (event.target === successModal) {
      successModal.classList.remove('active');
      if (contactForm) contactForm.reset();
    }
  });
}
