<script setup>
import { ref } from "vue";

const paso = ref(1);

function siguiente() {
  paso.value++;
}

function volver() {
  paso.value--;
}
</script>

<template>
  <div class="bg-gradient-to-t from-gray-300 to-gray-100 h-screen flex items-center justify-center">
    <div
      class="border-b-4 border-r-3 border-neutral-300 rounded-2xl bg-neutral-100 flex flex-col items-center px-10 pt-8 pb-4 gap-5"
    >
      <div class="flex-col items-center mb-6">
        <h1 class="font-light text-2xl text-gray-900">Regístrate en</h1>
        <h1 class="font-bold text-5xl text-gray-900">ORGANIZER</h1>
      </div>

      <div v-if="paso === 1" class="flex-col w-full">
        <!-- nombre  -->
        <div class="flex flex-col w-full">
          <span class="font-semibold border-l-4 border-amber-400 leading-none pl-1 pb-0.5">
            Nombre
          </span>
          <input
            type="text"
            placeholder="Pablo"
            class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight"
          />
        </div>

        <!-- apellidos -->
        <div class="flex flex-col w-full">
          <span class="font-semibold border-l-4 border-amber-400 leading-none pl-1 pb-0.5">
            Apellidos
          </span>
          <input
            type="text"
            placeholder="Monís Álvarez"
            class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight"
          />
        </div>

        <!-- correo -->
        <div class="flex flex-col w-full">
          <span class="font-semibold border-l-4 border-amber-400 leading-none pl-1 pb-0.5">
            Correo electrónico
          </span>
          <input
            type="email"
            placeholder="pma152402@gmail.com"
            class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight"
          />
        </div>
      </div>

      <div v-if="paso === 2" class="flex-col w-full">
        <!-- Contraseña -->
        <div class="flex flex-col w-full">
          <span class="font-semibold border-l-4 border-amber-400 leading-none pl-1 pb-0.5">
            Contraseña
          </span>
          <input
            type="password"
            placeholder="Contraseña"
            class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight"
          />
        </div>

        <!-- Repetir contraseña -->
        <div class="flex flex-col w-full">
          <span class="font-semibold border-l-4 border-amber-400 leading-none pl-1 pb-0.5">
            Repetir ontraseña
          </span>
          <input
            type="password"
            placeholder="Repetir contraseña"
            class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight"
          />
        </div>
      </div>

      <div class="flex gap-2">
        <button
          v-if="paso > 1"
          @click="volver"
          class="rounded-full bg-amber-200/80 px-2 py-1 font-light text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-red-400/40 hover:cursor-pointer hover:font-semibold"
        >
          Volver
        </button>
        <button
          v-if="paso < 2"
          @click="siguiente"
          class="rounded-full bg-amber-400 px-2 py-1 font-light text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-lime-600/60 hover:cursor-pointer hover:font-semibold"
        >
          Avanzar
        </button>
      </div>
    </div>
  </div>
</template>
