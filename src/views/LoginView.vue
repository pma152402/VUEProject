<script setup>
// RECUERDA PONER LA PRIMERA MAYUSCULA EN NOMBRE Y APELLIDOS PARA MANDAR A BBDD
import { ref, watch } from "vue";
import { House } from "lucide-vue-next";

import Login from "../components/login/Login.vue";

import { login } from "../api/auth";
import { useRouter } from "vue-router";

import checkLogin from "../utils/checkLogin.js";

// mi router
const router = useRouter();

// Variables reactivas que creo en el padre para guardar los datos y validarlos
const email = ref("");
const contrasena = ref("");

const errorEmail = ref("");
const errorContrasena = ref("");

// Controlar el paso en el que estamos
const paso = ref(1);

// Función para iniciar sesión
async function iniciarSesion() {
  const usuario = await login(email.value, contrasena.value);

  console.log(usuario);

  if (usuario) {
    // si hay usuario (ha pasado el login), lo guardo en localStorage *******
    localStorage.setItem("usuario", JSON.stringify(usuario));

    paso.value = 2

    // lo mando al panel con un timeout para que se vea la vista de paso == 2
    setTimeout(() => {
      router.push("/panel");
    }, 1500);
  }
}

// Limpiar el error cuando se escriba en cada campo (tengo q pasarlo a otro componente)
watch(email, () => {
  errorEmail.value = "";
});
watch(contrasena, () => {
  errorContrasena.value = "";
});

//  controlar el formulario

function comprobarLogin() {
  checkLogin({
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
      <form @submit.prevent="iniciarSesion">
        <div
          class="relative ml-3 rounded-lg bg-neutral-100 flex flex-col items-center px-8 pt-8 pb-4 gap-5 shadow-xl"
        >
          <RouterLink to="/">
            <a
              v-if="paso === 1"
              class="text-gray-400 absolute bottom-4 left-8 mr-20 font-semibold flex flex-nowrap transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
            >
              < <House class="w-4" />
            </a>
          </RouterLink>
          <div class="flex-col items-center mb-6">
            <h1 class="font-light text-2xl text-gray-900">Inicia sesión en</h1>
            <h1 class="font-bold text-5xl text-gray-900">ORGANIZER</h1>
          </div>

          <Login
            v-if="paso === 1"
            v-model:email="email"
            v-model:errorEmail="errorEmail"
            v-model:contrasena="contrasena"
            v-model:errorContrasena="errorContrasena"
          ></Login>

          <div class="flex gap-3">
            <!-- <RouterLink sustituido por push -->
            <button
              type="submit"
              @click="comprobarLogin"
              class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
              v-if="paso === 1"
            >
              Iniciar sesión
            </button>
            <!-- </RouterLink> -->
          </div>

          <div v-if="paso === 2" class="pb-10">
            <h3>¡Enhorabuena!</h3>
            <p>Has iniciado sesión correctamente.</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
