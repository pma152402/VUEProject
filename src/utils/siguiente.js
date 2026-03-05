export default function siguiente({
  nombre,
  email,
  errorNombre,
  errorEmail,
  paso
}) {
  let hayError = false;

  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
    // Nombre
    nombre.value = nombre.value.trim();

    if (!nombre.value) {
      errorNombre.value = "El nombre no puede quedar vacío";
      hayError = true;
    } else if (nombre.value.length > 45) {
      errorNombre.value = "El nombre no puede superar los 45 caracteres";
      hayError = true;
    } else if (!regex.test(nombre.value)) {
      errorNombre.value = "El nombre no puede contener números ni caracteres especiales";
      hayError = true;
    } else if (nombre.value.includes("  ")) {
      errorNombre.value = "El nombre no puede incluir espacios dobles";
      hayError = true;
    }

    // Email
    email.value = email.value.trim();

    if (!email.value) {
      errorEmail.value = "El email no puede quedar vacío";
      hayError = true;
    } else if (email.value.length > 120) {
      errorEmail.value = "El email no puede superar los 120 caracteres";
      hayError = true;
    } else if (!regexEmail.test(email.value)) {
      errorEmail.value = "Introduce un email válido";
      hayError = true;
    }
  

    

  // salir
  if (hayError) return;

  paso.value++;
}
