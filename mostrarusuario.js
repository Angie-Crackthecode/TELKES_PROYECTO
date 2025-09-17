// Mostrar usuario logueado en el navbar
window.addEventListener("DOMContentLoaded", () => {
    const datosUsuario = document.getElementById("datos-usuario");
    const btnLogout = document.getElementById("btn-logout");
    const btnOpenLogin = document.getElementById("btn-open-login");

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loggedUser) {
        datosUsuario.textContent = `Hola, ${loggedUser.name}`;
        datosUsuario.classList.remove("oculto");

        btnLogout.classList.remove("oculto");
        btnOpenLogin.classList.add("oculto");
    } else {
        datosUsuario.classList.add("oculto");
        btnLogout.classList.add("oculto");
        btnOpenLogin.classList.remove("oculto");
    }
});
