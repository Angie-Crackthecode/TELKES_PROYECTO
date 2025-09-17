// Guardar usuarios en localStorage
document.getElementById("btn-register").addEventListener("click", () => {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Por favor completa todos los campos.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Validar que el email no esté repetido
    const exists = users.find(user => user.email === email);
    if (exists) {
        alert("El correo ya está registrado.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado con éxito 🎉");
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";
});
