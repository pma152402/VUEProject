export default function finalizar({
  paso,
  contrasena,
  repetir,
  errorContrasena,
  errorRepetir
}) {

  let hayError = false; 

  const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

  // Contrasena
  if (!contrasena.value) {
    errorContrasena.value = "La contraseña no puede quedar vacía";
    hayError = true;
  } else if (contrasena.value.length < 8) {
    errorContrasena.value = "La contraseña debe de tener 8 o más carácteres";
    hayError = true;
  } else if (!regexContrasena.test(contrasena.value)) {
      errorContrasena.value = "La contraseña debe de incluir: un número, una mayúscula y un carácter especial";
      hayError = true;
    }

  // Repetir
  if (!repetir.value) {
    errorRepetir.value = "Repetir contraseña no puede quedar vacío";
    hayError = true;
  } else if (contrasena.value != repetir.value) {
    errorRepetir.value = "Las contraseñas no coinciden";
    hayError = true;
  }

  
  // salir
  if (hayError) return;

  paso.value++;
}
