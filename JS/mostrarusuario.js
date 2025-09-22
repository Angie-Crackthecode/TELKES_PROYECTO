// Espera a que todo el documento HTML termine de cargarse
document.addEventListener("DOMContentLoaded", () => {

    // Recupera del localStorage la lista de usuarios registrados
    // Si no existe, devuelve un array vacío []
    console.log("Usuarios registrados:", JSON.parse(localStorage.getItem("usuarios")) || []);

    // Recupera el usuario activo (es decir, el que ha iniciado sesión)
    // Si no hay ninguno, mostrará null
    console.log("Usuario activo:", JSON.parse(localStorage.getItem("usuarioActivo")));
});