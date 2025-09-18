document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btn-login");

    btnLogin.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("usuarios")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("usuarioActivo", JSON.stringify(user));
            alert(`  Bienvenido ${user.name}  `);
            location.reload(); // Recargar la página para reflejar sesión activa
        } else {
            alert("❌ Correo o contraseña incorrectos.");
        }
    });
});
