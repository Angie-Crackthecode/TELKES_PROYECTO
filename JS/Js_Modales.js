// Obtener los elementos de los botones y los modales
const btnOpenRegister = document.getElementById("btn-open-register");
const btnBackToLogin = document.getElementById("btn-back-to-login");

const loginModalElement = document.getElementById("loginModal");
const registerModalElement = document.getElementById("registerModal");

// Inicializar los modales de Bootstrap
const loginModal = new bootstrap.Modal(loginModalElement);
const registerModal = new bootstrap.Modal(registerModalElement);

// Evento para abrir el modal de registro y cerrar el de login
btnOpenRegister.addEventListener("click", () => {
  loginModal.hide(); // Oculta el modal de login
  registerModal.show(); // Muestra el modal de registro
});

// Evento para regresar al modal de login desde el de registro
btnBackToLogin.addEventListener("click", () => {
  registerModal.hide(); // Oculta el modal de registro
  loginModal.show(); // Muestra el modal de login
});
