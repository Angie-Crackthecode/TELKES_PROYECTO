document.addEventListener("DOMContentLoaded", () => {
    const datosUsuario = document.getElementById("datos-usuario");
    const btnLogout = document.getElementById("btn-logout");
    const btnOpenLogin = document.getElementById("btn-open-login");

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo) {
        datosUsuario.textContent = `Bienvenido, ${usuarioActivo.name}`;
        datosUsuario.classList.remove("oculto");
        btnLogout.classList.remove("oculto");
        btnOpenLogin.classList.add("oculto");
    }

    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        alert("Has cerrado sesión.");
        location.reload();
    });
});
