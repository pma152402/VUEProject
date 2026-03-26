<script setup>
import { BadgeQuestionMark } from "lucide-vue-next";
import { ref } from "vue";

const paso = ref(0);
</script>

<template>
  <!-- LO QUE SE VE SIEMPRE:-->
  <div class="group fixed bottom-6 right-4 md:right-10 lg:right-20 w-18 h-18">
    <!-- ANIMACION SPIN, padre que gira -->
    <div class="absolute inset-0 group-hover:animate-[spin_2s_linear_infinite]">
      <!-- fondo 1 -->
      <div class="absolute inset-0 bg-gray-200/40 rotate-15 rounded-lg">
        <!-- fondo 2 -->
        <div class="absolute inset-0 bg-neutral-200/80 rotate-23 rounded-lg">
          <!-- fondo 3 -->
          <div class="absolute inset-0 bg-neutral-200/50 rotate-31 rounded-lg">
            <!-- fondo 4 -->
            <div class="absolute inset-0 bg-neutral-200/90 rotate-18 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- informacion -->
    <BadgeQuestionMark
      @click="paso = 1"
      class="absolute inset-0 -rotate-1 w-18 h-18 text-neutral-600 bg-neutral-200 rounded-4xl border-4 border-blue-300/70 p-0.5 fill-gray-100 hover:border-blue-400/60 hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:text-neutral-800"
    />
  </div>

  <!-- LA VENTANA QUE SE VAN A MOSTRAR AL CLICKAR EN INFORMACION: -->
  <div v-if="paso >= 1" class="fixed inset-0 z-3000 bg-neutral-900/70 w-full h-full">
    <!-- Guia -->
    <div
      class="bg-neutral-200 rounded-lg px-6 pt-6 pb-4 flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <!-- X -->
      <div @click="paso = 0" class="absolute top-1 right-4 text-xl hover:cursor-pointer">x</div>
      <!-- -->
      <div>
        <h1 class="text-5xl font-bold">Guía rápida:</h1>

        <!-- Primer paso-->
        <p 
        v-if="paso == 1"
        class="max-w-md mt-6 border-l-4 border-blue-400 pl-2 pb-1.5 text-lg leading-relaxed">
          Bienvenido a tu proyecto, aquí puedes crear todas las tarjetas y tareas que necesites
        </p>
        <!-- Segundo paso-->
        <p 
        v-if="paso == 2"
        class="max-w-md mt-6 border-l-4 border-blue-400 pl-2 pb-1.5 text-lg leading-relaxed">
          Este es el paso dos
        </p>

      </div>

      <div class="w-full items-center flex justify-between px-20 mt-6">
        <span 
        @click="paso = paso - 1"
        class="text-gray-400 hover:cursor-pointer"><</span>
        <span class="hover:cursor-default">{{paso}}/3</span>
        <span 
        @click="paso = paso + 1"
        class="hover:cursor-pointer">></span>
      </div>
    </div>
  </div>
</template>
