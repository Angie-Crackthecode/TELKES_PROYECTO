// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos los elementos del DOM que vamos a manipular
    const datosUsuario = document.getElementById("datos-usuario");
    const btnLogout = document.getElementById("btn-logout");
    const btnOpenLogin = document.getElementById("btn-open-login");

    // Revisamos si hay un usuario activo guardado en localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si existe un usuario activo (sesión iniciada)
    if (usuarioActivo) {
        // Mostramos el nombre del usuario en pantalla
        datosUsuario.textContent = `Bienvenido, ${usuarioActivo.name}`;
        datosUsuario.classList.remove("oculto"); // mostramos el texto
        btnLogout.classList.remove("oculto");    // mostramos el botón de logout
        btnOpenLogin.classList.add("oculto");    // ocultamos el botón de login
    }

    // Evento para cerrar sesión
    btnLogout.addEventListener("click", () => {
        // Eliminamos al usuario activo del localStorage
        localStorage.removeItem("usuarioActivo");
        alert("Has cerrado sesión.");
        location.reload(); // Recargamos la página para reflejar el cambio
    });
});