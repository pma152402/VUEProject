<script setup>
import { ref } from "vue";
import { House } from "lucide-vue-next";
import FormPaso1 from "../components/register/FormPaso1.vue";
import FormPaso2 from "../components/register/FormPaso2.vue";

const paso = ref(1);

function siguiente() {
  paso.value++;
}

function volver() {
  paso.value--;
}
</script>

<template>
  <div class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 h-screen flex items-center justify-center">
    
    <div class="bg-gradient-to-t from-blue-300 to-blue-200/80 rounded-2xl flex items-center">
      <div
        class="relative ml-3 rounded-lg bg-neutral-100 flex flex-col items-center px-8 pt-8 pb-4 gap-5 shadow-xl"
      >

      <a class="absolute bottom-4 left-8 mr-20 font-semibold flex flex-nowrap transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"> < <House class="w-4" /> </a>
     
        <div class="flex-col items-center mb-6">
          <h1 class="font-light text-2xl text-gray-900">Regístrate en</h1>
          <h1 class="font-bold text-5xl text-gray-900">ORGANIZER</h1>
        </div>

        <div v-if="paso === 1" class="flex-col w-full">
          
          <!-- Nombre, Apellidos, Email -->
          <FormPaso1/>

        </div>

        <div v-if="paso === 2" class="flex-col w-full">

          <!-- Contraseña -->
          <FormPaso2/>
        </div>


        <div class="flex">
          <button
            v-if="paso > 1"
            @click="volver"
            class=" rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-400/40 hover:cursor-pointer hover:font-semibold"
          >
            Anterior
          </button>

          <button
            v-if="paso < 2"
            @click="siguiente"
            class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-400/40 hover:cursor-pointer hover:font-semibold"
          >
            Siguiente
          </button>
        </div>


      </div>
    </div>
  </div>
</template>
