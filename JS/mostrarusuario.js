document.addEventListener("DOMContentLoaded", () => {
    console.log("Usuarios registrados:", JSON.parse(localStorage.getItem("usuarios")) || []);
    console.log("Usuario activo:", JSON.parse(localStorage.getItem("usuarioActivo")));
});
