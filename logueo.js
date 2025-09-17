// Iniciar sesión
document.getElementById("btn-login").addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        alert(`Bienvenido ${user.name} 👋`);
        location.reload(); // recargar para actualizar navbar
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});

// Cerrar sesión
document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    location.reload();
});
