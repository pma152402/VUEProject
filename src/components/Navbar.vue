<script setup>
import { ref } from "vue";
import Usuario from "../assets/logo_organizer.png";
import { Menu } from "lucide-vue-next";

const estado = ref(false);

function mostrarOpciones() {
  estado.value = !estado.value;
}
</script>
<style scoped>
.item-enter-active {
  transition: all 0.3s ease;
}

.item-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.item-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.delay-1 {
  transition-delay: 0.15s;
}

.delay-2 {
  transition-delay: 0.3s;
}
</style>
<template>
  <div class="w-full flex absolute top-1 right-0 justify-end pr-2 pt-1">
    <div class="flex flex-col justify-end">
      <div
        @click="mostrarOpciones"
        class="text-xs flex gap-2 items-center hover:cursor-pointer"
      >
        <span class="text-neutral-400">Pablo Monís Álvarez</span>
        <Menu class="text-neutral-400 w-4"></Menu>
      </div>

      <div class="flex flex-col items-end justify-end">
        <Transition name="item">
          <RouterLink to="/" v-if="estado"
            ><span
              class="block text-xs text-neutral-400 hover:scale-110 transition-all ease-in-out hover:cursor-pointer hover:text-gray-900 duration-100"
              >Sobre mí</span
            ></RouterLink
          >
        </Transition>

        <Transition name="item">
          <RouterLink to="/panel" v-if="estado" class="delay-1">
            <span
              class="block  text-xs text-neutral-400 hover:scale-110 transition-all ease-in-out hover:cursor-pointer hover:text-gray-900 duration-100"
              >Panel de control
            </span>
          </RouterLink>
        </Transition>

        <Transition name="item">
          <RouterLink to="/" v-if="estado" class="delay-2">
            <span
              v-if="estado"
              class="block  text-xs text-neutral-400 hover:scale-110 transition-all ease-in-out hover:cursor-pointer hover:text-gray-900 duration-100"
            >
              Cerrar sesión
            </span>
          </RouterLink>
        </Transition>
      </div>
    </div>
  </div>
</template>
