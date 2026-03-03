<script setup>
// RECUERDA PONER LA PRIMERA MAYUSCULA EN NOMBRE Y APELLIDOS PARA MANDAR A BBDD
import { ref, watch } from "vue";
import { House } from "lucide-vue-next";
import FormPaso1 from "../components/register/FormPaso1.vue";
import FormPaso2 from "../components/register/FormPaso2.vue";

import siguiente from "../utils/siguiente.js";
import finalizar from "../utils/finalizar.js";

// Variables reactivas que creo en el padre para guardar los datos y validarlos
const email = ref("");
const contrasena = ref("");

const errorEmail = ref("");
const errorContrasena = ref("");

// Limpiar el error cuando se escriba en cada campo (tengo q pasarlo a otro componente)
watch(email, () => {
  errorEmail.value = "";
});
watch(contrasena, () => {
  errorContrasena.value = "";
});

// Controlar el paso en el que estamos
const paso = ref(1);

// Funciones avanzar, volver y controlar el formulario

function volver() {
  paso.value--;
}

function comprobar() {
  contrasenaCheck({
    paso,
    email,
    errorEmail,
    contrasena,
    errorContrasena,
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
          <h1 class="font-light text-2xl text-gray-900">Inicia sesión en</h1>
          <h1 class="font-bold text-5xl text-gray-900">ORGANIZER</h1>
        </div>

        <!-- correo -->
        <div class="flex flex-col w-full">
          <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
            Correo electrónico
          </span>
          <input
            type="email"
            placeholder="pma152402@gmail.com"
            class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
          />
          <span class="text-red-400 text-[10px]"> </span>
        </div>
        <!-- contrasena -->
        <div class="flex flex-col w-full">
          <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
            Contraseña
          </span>
          <input
            type="password"
            placeholder="Contraseña"
            class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
          />
          <span class="mb-5 text-red-400 text-[10px]"> </span>
        </div>

        <div v-if="paso === 3" class="pb-10">
          <h3>¡Enhorabuena!</h3>
          <p>Has iniciado sesión correctamente.</p>
        </div>

        <div class="flex gap-3">
          <RouterLink to="/panel">
            <button
              class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
            >
              Iniciar sesión
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
