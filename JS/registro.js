// Espera a que todo el documento HTML esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos el botón de registro
    const btnRegister = document.getElementById("btn-register");

    // Cuando se hace clic en el botón de registrar
    btnRegister.addEventListener("click", () => {
        // Guardamos en variables los valores escritos en el formulario
        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Validar que todos los campos estén completos
        if (!name || !email || !password || !confirmPassword) {
            alert("Por favor completa todos los campos.");
            return; // Detiene la ejecución si falta algún campo
        }

        // Validar que la contraseña y la confirmación sean iguales
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Obtenemos la lista de usuarios registrados desde localStorage (o un array vacío si no hay)
        let users = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Validamos que no exista un usuario con el mismo correo
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("El correo ya está registrado.");
            return;
        }

        // Agregamos el nuevo usuario al arreglo
        users.push({ name, email, password });

        // Guardamos el arreglo actualizado en localStorage
        localStorage.setItem("usuarios", JSON.stringify(users));

        // Mostramos mensaje de éxito
        alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");

        // Limpiamos los campos del formulario
        document.getElementById("registerName").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";
        document.getElementById("confirmPassword").value = "";
    });
});
