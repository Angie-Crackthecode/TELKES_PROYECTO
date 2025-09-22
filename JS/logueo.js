// Espera a que todo el documento HTML esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
   
    // Obtenemos el botón de login por su ID
    const btnLogin = document.getElementById("btn-login");

    // Agregamos un evento al botón: cuando se hace clic, se ejecuta esta función
    btnLogin.addEventListener("click", () => {
       
        // Guardamos en variables el email y la contraseña escritos por el usuario
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        // Validamos que no estén vacíos
        if (!email || !password) {
            alert("Por favor completa todos los campos.");
            return; // Se detiene la ejecución si falta un dato
        }

        // Obtenemos de localStorage la lista de usuarios registrados
        // Si no hay ninguno, devuelve un arreglo vacío []
        const users = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Buscamos dentro de ese arreglo un usuario con el mismo email y contraseña
        const user = users.find(u => u.email === email && u.password === password);

        // Si encontramos al usuario
        if (user) {
            // Guardamos al usuario en localStorage como "usuarioActivo" (sesión iniciada)
            localStorage.setItem("usuarioActivo", JSON.stringify(user));

            // Mostramos un mensaje de bienvenida con su nombre
            alert(`  Bienvenido ${user.name}  `);

            // Recargamos la página para reflejar que ya hay sesión activa
            location.reload();
        } else {
            // Si no se encontró el usuario, mostramos error
            alert("❌ Correo o contraseña incorrectos.");
        }
    });
});