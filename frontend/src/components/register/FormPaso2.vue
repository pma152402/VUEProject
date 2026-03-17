<script setup>
  defineProps(["contrasena", "repetir", "errorContrasena", "errorRepetir"])
  defineEmits(["update:contrasena", "update:repetir"])
</script>

<template>
  <!-- Contraseña -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
      Contraseña
    </span>
    <input
      :value="contrasena"
      @input="$emit('update:contrasena', $event.target.value)"

      type="password"
      placeholder="Contraseña"
      class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
    />
    <span class="mb-5 text-red-400 text-[10px]">
      {{ errorContrasena }}
    </span>
  </div>

  <!-- Repetir contraseña -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
      Repetir contraseña
    </span>
    <input
      :value="repetir"
      @input="$emit('update:repetir', $event.target.value)"

      type="password"
      placeholder="Repetir contraseña"
      class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
    />
    <span class="mb-5 text-red-400 text-[10px]">
      {{ errorRepetir }}
    </span>
  </div>
</template>
