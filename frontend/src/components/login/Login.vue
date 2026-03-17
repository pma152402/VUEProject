<script setup>
defineProps(["email", "contrasena", "errorEmail", "errorContrasena"]);
defineEmits(["update:email", "update:contrasena"]);
</script>

<template>
  <!-- correo -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
      Correo electrónico
    </span>
    <input
      :value="email"
      type="email"
      
      @input="$emit('update:email', $event.target.value)"
      placeholder="pma152402@gmail.com"
      class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
    />
    <span class=" text-red-400 text-[10px]">
      {{ errorEmail }}
    </span>
  </div>
  <!-- contrasena -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
      Contraseña
    </span>
    <input
      :value="contrasena"
      type="password"
      
      @input="$emit('update:contrasena', $event.target.value)"
      placeholder="Contraseña"
      class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
    />
    <span class="mb-2 text-red-400 text-[10px]">
      {{ errorContrasena }}
    </span>
  </div>
</template>
