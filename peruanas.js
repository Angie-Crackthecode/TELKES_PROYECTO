function mostrarResumen(boton) {
  const resumen = boton.nextElementSibling;
  const visible = resumen.style.display === "block";

  // Ocultar todos los resúmenes primero
  document.querySelectorAll(".resumen").forEach((r) => (r.style.display = "none"));

  // Mostrar el resumen solo si antes estaba oculto
  if (!visible) {
    resumen.style.display = "block";
  }
}

// Validación básica con Bootstrap
(() => {
  "use strict";

  const form = document.getElementById("registroForm");

  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        alert("Formulario enviado correctamente!");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        form.classList.add("was-validated");
      }
    },
    false
  );
})();
