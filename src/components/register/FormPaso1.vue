<script setup>
</script>

<template>
    <!-- nombre  -->
          <div class="flex flex-col w-full">
            <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
              Nombre
            </span>
            <input
              type="text"
              placeholder="Pablo"
              class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
            />
          </div>

          <!-- apellidos -->
          <div class="flex flex-col w-full">
            <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
              Apellidos
            </span>
            <input
              type="text"
              placeholder="Monís Álvarez"
              class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
            />
          </div>

          <!-- correo -->
          <div class="flex flex-col w-full">
            <span class="font-semibold border-l-4 border-blue-400 leading-none pl-2 pb-0.5">
              Correo electrónico
            </span>
            <input
              type="email"
              placeholder="pma152402@gmail.com"
              class="mb-6 mt-2 border rounded-lg p-1 text-sm w-full italic font-extralight focus:outline-blue-200"
            />
          </div>
</template>