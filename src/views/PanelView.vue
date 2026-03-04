<script setup>
import { Trash2, Pencil, Copy, Share2, House } from "lucide-vue-next";
import { ref, watch } from "vue";
import Navbar from "../components/Navbar.vue";



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
</script>

<template>
  <div
    class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 h-screen flex items-center justify-center"
  >
    <div class="bg-gradient-to-t from-blue-300 to-blue-200/80 rounded-2xl flex items-center">
      <div
        class="relative ml-3 rounded-lg bg-neutral-100 flex flex-col items-center px-8 pt-8 gap-5 shadow-xl pb-5"
      >
        <Navbar></Navbar>

        <div class="pb-5 lg:pb-10">
          <h3 class="text-2xl font-bold pb-5">Panel de control</h3>
          <p class="font-light">
            Aquí podrás gestionar todos tus proyectos de manera rápida y sencilla.
          </p>

          <p class="font-light">Empieza seleccionando uno de tus proyectos o crea uno nuevo.</p>
        </div>

        <table class="w-full border-separate border-spacing-y-1">
          <thead>
            <tr class="">
              <th class="text-left w-1/2 font-semibold">Nombre</th>
              <th class="text-left w-1/4 font-semibold">Fecha</th>
              <th class="text-left w-1/4 font-semibold">Acción</th>
            </tr>
          </thead>

          <tbody>
            <tr class="hover:bg-blue-100/60">
              <td class="text-sm lg:text-base">Planing de mi casa</td>
              <td class="text-sm lg:text-base">13/06/2025</td>
              <td class="flex justify-between ml-1">
                <Pencil
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Copy
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Share2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Trash2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
              </td>
            </tr>
            <tr class="hover:bg-blue-100/60">
              <td class="text-sm lg:text-base">Proyecto de programación</td>
              <td class="text-sm lg:text-base">09/10/2025</td>
              <td class="flex justify-between ml-1">
                <Pencil
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Copy
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Share2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Trash2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
              </td>
            </tr>
            <tr class="hover:bg-blue-100/60">
              <td class="text-sm lg:text-base">Cumpleaños de Marta</td>
              <td class="text-sm lg:text-base">11/03/2026</td>
              <td class="flex justify-between ml-1">
                <Pencil
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Copy
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Share2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Trash2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex gap-3 mt-6 mb-2 w-1/2">
          <input
            type="text"
            placeholder="Nuevo proyecto"
            class="border border-neutral-400 rounded-lg text-sm w-full italic font-extralight focus:outline-blue-200 px-1"
          />
          <button
            class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
