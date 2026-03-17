export default function checkLogin({ email, errorEmail, contrasena, errorContrasena }) {
  let hayError = false;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

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

  // Contrasena
  if (!contrasena.value) {
    errorContrasena.value = "La contraseña no puede quedar vacía";
    hayError = true;
  } else if (contrasena.value.length < 8) {
    errorContrasena.value = "La contraseña debe de tener 8 o más carácteres";
    hayError = true;
  } else if (!regexContrasena.test(contrasena.value)) {
    errorContrasena.value =
      "La contraseña debe de incluir: un número, una mayúscula y un carácter especial";
    hayError = true;
  }

  // salir
  if (hayError) return;

}
