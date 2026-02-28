<script setup>
defineProps(["nombre", "apellidos", "email", "errorNombre", "errorApellidos", "errorEmail"]);
defineEmits(["update:nombre", "update:apellidos", "update:email"]);
</script>

<template>
  <!-- nombre  -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5"> Nombre </span>
    <input
      :value="nombre"
      @input="$emit('update:nombre', $event.target.value)"
      type="text"
      placeholder="Pablo"
      class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
    />
    <span class="mb-5 text-red-400 text-[10px]">
      {{ errorNombre }}
    </span>
  </div>

  <!-- apellidos -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
      Apellidos
    </span>
    <input
      :value="apellidos"
      @input="$emit('update:apellidos', $event.target.value)"
      type="text"
      placeholder="Monís Álvarez"
      class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
    />
    <span class="mb-5 text-red-400 text-[10px]">
      {{ errorApellidos }}
    </span>
  </div>

  <!-- correo -->
  <div class="flex flex-col w-full">
    <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
      Correo electrónico
    </span>
    <input
      :value="email"
      @input="$emit('update:email', $event.target.value)"
      type="email"
      placeholder="pma152402@gmail.com"
      class="mt-2 border border-neutral-400 rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
    />
    <span class="mb-5 text-red-400 text-[10px]">
      {{ errorEmail }}
    </span>
  </div>
</template>
