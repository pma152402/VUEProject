<script setup>
// RECUERDA PONER LA PRIMERA MAYUSCULA EN NOMBRE Y APELLIDOS PARA MANDAR A BBDD
import { ref, watch } from "vue";
import { House } from "lucide-vue-next";
import FormPaso1 from "../components/register/FormPaso1.vue";
import FormPaso2 from "../components/register/FormPaso2.vue";

import siguiente from "../utils/siguiente.js";
import finalizar from "../utils/finalizar.js";

// Variables reactivas que creo en el padre para guardar los datos y validarlos
const nombre = ref("");
const apellidos = ref("");
const email = ref("");
const contrasena = ref("");
const repetir = ref("");

const errorNombre = ref("");
const errorApellidos = ref("");
const errorEmail = ref("");
const errorContrasena = ref("");
const errorRepetir = ref("");

// Limpiar el error cuando se escriba en cada campo (tengo q pasarlo a otro componente)
watch(nombre, () => {
  errorNombre.value = "";
});
watch(apellidos, () => {
  errorApellidos.value = "";
});
watch(email, () => {
  errorEmail.value = "";
});
watch(contrasena, () => {
  errorContrasena.value = "";
});
watch(repetir, () => {
  errorRepetir.value = "";
});

// Controlar el paso en el que estamos
const paso = ref(1);

// Funciones avanzar, volver y controlar el formulario

function volver() {
  paso.value--;
}

function comprobarPaso1() {
  siguiente({
    nombre,
    apellidos,
    email,
    errorNombre,
    errorApellidos,
    errorEmail,
    paso,
    contrasena,
    repetir,
    errorContrasena,
    errorRepetir,
  });
}

function comprobarPaso2() {
  finalizar({
    nombre,
    apellidos,
    email,
    errorNombre,
    errorApellidos,
    errorEmail,
    paso,
    contrasena,
    repetir,
    errorContrasena,
    errorRepetir,
  });
}
</script>

<template>
  <div
    class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 h-screen flex items-center justify-center"
  >
    <div class="bg-gradient-to-t from-blue-300 to-blue-200/80 rounded-2xl flex items-center">
      <div
        class="relative ml-3 rounded-lg bg-neutral-100 flex flex-col items-center px-8 pt-8 pb-4 gap-5 shadow-xl"
      >
        <RouterLink to="/">
          <a
            class="absolute bottom-4 left-8 mr-20 font-semibold flex flex-nowrap transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            < <House class="w-4" />
          </a>
        </RouterLink>
        <div class="flex-col items-center mb-6">
          <h1 class="font-light text-2xl text-gray-900">Regístrate en</h1>
          <h1 class="font-bold text-5xl text-gray-900">ORGANIZER</h1>
        </div>

        <!-- Nombre, Apellidos, Email -->
        <div v-if="paso === 1" class="flex-col w-full">
          <!-- Le paso las variables al componente hijo -->
          <FormPaso1
            v-model:nombre="nombre"
            v-model:apellidos="apellidos"
            v-model:email="email"
            v-model:errorNombre="errorNombre"
            v-model:errorApellidos="errorApellidos"
            v-model:errorEmail="errorEmail"
          />
        </div>

        <div v-if="paso === 2" class="flex-col w-full">
          <!-- Contraseña y repetirla -->
          <FormPaso2
            v-model:contrasena="contrasena"
            v-model:repetir="repetir"
            v-model:errorContrasena="errorContrasena"
            v-model:errorRepetir="errorRepetir"
          />
        </div>

        <div v-if="paso === 3" class="pb-10">
          <h3>¡Enhorabuena!</h3>
          <p>Te has registrado correctamente.</p>
        </div>

        <div class="flex gap-3">
          <button
            v-if="paso > 1 && paso < 3"
            @click="volver"
            class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
          >
            Anterior
          </button>

          <button
            v-if="paso < 2"
            @click="comprobarPaso1"
            class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
          >
            Siguiente
          </button>

          <button
            v-if="paso > 1 && paso < 3"
            @click="comprobarPaso2"
            class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
