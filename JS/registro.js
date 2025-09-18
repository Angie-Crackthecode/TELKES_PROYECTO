document.addEventListener("DOMContentLoaded", () => {
    const btnRegister = document.getElementById("btn-register");

    btnRegister.addEventListener("click", () => {
        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!name || !email || !password || !confirmPassword) {
            alert("Por favor completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Validar que no exista el correo
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("El correo ya está registrado.");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("usuarios", JSON.stringify(users));

        alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
        document.getElementById("registerName").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";
        document.getElementById("confirmPassword").value = "";
    });
});
