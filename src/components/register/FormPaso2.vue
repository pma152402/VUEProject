<script setup></script>

<template>
  <!-- Contraseña -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
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
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
      Repetir contraseña
    </span>
    <input
      type="password"
      placeholder="Repetir contraseña"
      class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight"
    />
  </div>
</template>
