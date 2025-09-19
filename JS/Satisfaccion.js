
  const form = document.getElementById('encuesta');
  const modal = document.getElementById('modal-confirmacion');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que se envíe el formulario de inmediato

    // Mostrar el modal
    modal.classList.add('active');

    // Si quieres luego enviar el formulario realmente después de cerrar el modal,
    // puedes hacerlo con JavaScript.
    // form.submit(); <-- si decides enviarlo al cerrar el modal
  });

  function cerrarModal() {
    modal.classList.remove('active');
    
    // Opcional: mostrar el mensaje de "gracias"
    document.getElementById('form-container').style.display = "none";
    document.getElementById('thank-you-message').style.display = "block";
  }




