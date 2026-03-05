<script setup>
import { ref, watch } from "vue";
import { House } from "lucide-vue-next";
import FormPaso1 from "../components/register/FormPaso1.vue";
import FormPaso2 from "../components/register/FormPaso2.vue";

import siguiente from "../utils/siguiente.js";
import finalizar from "../utils/finalizar.js";

// Variables reactivas que creo en el padre para guardar los datos y validarlos
const nombre = ref("");
const email = ref("");
const contrasena = ref("");
const repetir = ref("");

const errorNombre = ref("");
const errorEmail = ref("");
const errorContrasena = ref("");
const errorRepetir = ref("");

// Limpiar el error cuando se escriba en cada campo (tengo q pasarlo a otro componente)
watch(nombre, () => {
  errorNombre.value = "";
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

// Funcion para crear usuario
async function crearUsuario(nombre, email, contrasena) {
  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          mutation($name: String!, $email: String!, $password: String!) {
          createUser(name: $name, email: $email, password: $password) {
            id
            name
            email
          }
        }
        `,
      variables: {
        name: nombre.value,
        email: email.value,
        password: contrasena.value,
      },
    }),
  });

  const data = await respuesta.json();

  console.log(data);
}

// Controlar el paso en el que estamos
const paso = ref(1);

// Funciones avanzar, volver y controlar el formulario

function volver() {
  paso.value--;
}

function comprobarPaso1() {
  siguiente({
    nombre,
    email,
    errorNombre,
    errorEmail,
    paso,
    contrasena,
    repetir,
    errorContrasena,
    errorRepetir,
  });
}

function comprobarPaso2() {
  if (
    finalizar({
      nombre,
      email,
      errorNombre,
      errorEmail,
      paso,
      contrasena,
      repetir,
      errorContrasena,
      errorRepetir,
    })
  ) {
    console.log("dentro de finalizar: TODO HA IDO BIEN antes de CREACION DE USUARIO");

    crearUsuario(nombre, email, contrasena);
  }
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
            class="text-gray-400 absolute bottom-4 left-8 mr-20 font-semibold flex flex-nowrap transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            < <House class="w-4" />
          </a>
        </RouterLink>
        <div class="flex-col items-center mb-6">
          <h1 class="font-light text-2xl text-gray-900">Regístrate en</h1>
          <h1 class="font-bold text-5xl text-gray-900">ORGANIZER</h1>
        </div>

        <!-- Nombre, Email -->
        <div v-if="paso === 1" class="flex-col w-full">
          <!-- Le paso las variables al componente hijo -->
          <FormPaso1
            v-model:nombre="nombre"
            v-model:email="email"
            v-model:errorNombre="errorNombre"
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

        <div v-if="paso === 3" class="-mt-2">
          <h3>¡Enhorabuena!</h3>
          <p>Te has registrado correctamente.</p>
          <div class="flex items-center justify-center mt-6">
            <RouterLink to="/login">
              <button
                class="rounded-full bg-blue-200/80 px-2 py-1 text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
              >
                Iniciar sesión
              </button></RouterLink
            >
          </div>
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
