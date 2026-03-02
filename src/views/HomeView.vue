<script setup>
import logo from "../assets/logo_3.png";
</script>

<template>
  <div class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 h-screen">
    <div class="flex flex-col max-w-7xl items-center mx-auto pt-20">
      <div class="flex flex-col items-center justify-center">
        <img :src="logo" class="w-lg lg:w-2xl" />

        <h1 class="text-5xl lg:text-6xl font-extrabold pb-5 text-gray-900 mt-[-40px] lg:mt-[-90px]">
          ORGANIZER
        </h1>
      </div>

      <div class="flex gap-3 mt-2">
        <RouterLink to="/register">
          <button
            class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-lg transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
          >
            Iniciar sesión
          </button></RouterLink
        >
        <RouterLink to="/register">
          <button
            class="rounded-full bg-blue-400/80 px-2 py-1 font-md text-lg transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
          >
            Registro
          </button></RouterLink
        >
      </div>
    </div>
  </div>
</template>
