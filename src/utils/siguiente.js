export default function siguiente() {

    let hayError = true
    
    // Nombre;
    nombre.value = nombre.value.trim();
    
    if (!nombre.value) {
        errorNombre.value="El nombre no puede quedar vacío";
    } 
    else if (nombre.value.length > 45) {
        errorNombre.value="El nombre no puede superar los 45 carácteres";
    }
    else if (!regex.test(nombre.value)) {
        errorNombre.value="El nombre no puede contener números ni carácteres especiales";
    }
    else if (nombre.value.includes("  ")){
        errorNombre.value="El nombre no puede incluir espacios dobles"
    }
    else {
        // si todo va bien QUITO el error
        hayError = false;
    }

    // Apellidos;
    apellidos.value = apellidos.value.trim();
    
    if (!apellidos.value) {
        errorApellidos.value="Los apellidos no pueden quedar vacíos";
    } 
    else if (apellidos.value.length > 100) {
        errorApellidos.value="Los apellidos no pueden superar los 100 carácteres";
    }
    else if (!regex.test(apellidos.value)) {
        errorApellidos.value="Los apellidos no pueden contener números ni carácteres especiales";
    }
    else if (apellidos.value.includes("  ")){
        errorApellidos.value="Los apellidos no pueden incluir espacios dobles"
    }
    else {
        // si todo va bien QUITO el error
        hayError = false;
    }

    // Email
    if (!email.value) {
        errorEmail.value="El email no puede quedar vacío";
    } 
    else if(email.value.length > 120) {
        errorEmail.value="El email no puede superar los 120 carácteres"
    }
    else if(!regexEmail.test(email.value)) {
        errorEmail.value="Introduce un patrón de email válido"
    }
    else {
        // si todo va bien QUITO el error
        hayError = false;
    }
    paso.value++;
}