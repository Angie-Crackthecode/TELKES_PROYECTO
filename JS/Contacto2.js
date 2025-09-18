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
  if (instant) {
    carousel.style.transition = 'none';
  } else {
    carousel.style.transition = 'transform 0.5s ease-in-out';
  }
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

document.querySelectorAll('form input, form textarea, .carousel-arrow').forEach(element => {
  element.addEventListener('focus', stopAutoChange);
  element.addEventListener('blur', startAutoChange);
});

initializeCarousel();

// Funcionalidad del formulario
const contactForm = document.querySelector('form');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.querySelector('.modal-close-btn');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    successModal.classList.add('active');
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', function() {
    successModal.classList.remove('active');
    // Limpiar los campos del formulario
    contactForm.reset(); 
  });
}

if (successModal) {
    successModal.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.classList.remove('active');
            // Limpiar los campos del formulario
            contactForm.reset();
        }
    });
}