<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

const route = useRoute();
const usuario = ref(null);
const proyecto = ref(null);
const IDproyecto = route.params.id;

// TARJETAS
const tarjetas = ref([
  {
    id: 1,
    titulo: "Tarjetas 1",
    tareas: ["Lo primero", "Lo segundo", "Lo tercero"],
  },
]);
// tarjeta
async function crearTarjeta() {
  tarjetas.value.push({
    id: Date.now(),
    titulo: "Nueva tarjeta",
    tareas: [],
  });
}
// tarea (le paso la tarjeta en la que se hace)
function crearTarea(tarjeta) {
  const nuevaTarea = prompt("Nueva tarea...");

  if (nuevaTarea) {
    tarjeta.tareas.push(nuevaTarea);
  }
}

// en el montaje..
onMounted(async () => {
  // cargar proyecto
  proyecto.value = await cargarProyecto(IDproyecto);

  // cargar usuario
  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    usuario.value = JSON.parse(usuarioGuardado);
  }
});

// cargar el proyecto con la id de la ruta
async function cargarProyecto(IDproyecto) {
  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query($id: Int!) {
          project(id: $id) {
            id
            name
            createdAt
          }
        }
        `,
      variables: {
        id: Number(IDproyecto),
      },
    }),
  });

  const data = await respuesta.json();

  console.log(data);

  return data.data.project;
}
</script>

<style>
{
scrollbar-width: thin;
scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
transition: scrollbar-color 0.5s ease-in;

}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--scrollbar-thumb), #8c589c);
  border-radius: 10px;
  border: 2px solid var(--scrollbar-track);
  transition: background 0.3s ease;
}

*::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #c986da, #a268b3);
}

*::-webkit-scrollbar-corner {
  background: var(--scrollbar-track);
}
</style>
<template>
  <div
    class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 min-h-screen overflow-x-hidden flex justify-center"
  >
    <div class="max-w-6xl flex flex-col relative">
      <Navbar class="mt-2 mr-1"></Navbar>
      <!-- Cabecera -->
      <div
        class="bg-neutral-100 shadow-xl flex flex-col justify-between p-6 rounded-xl mt-2 border-l-6 border-blue-300"
      >
        <!-- Titulo -->
        <div class="flex flex-col pb-0 text-gray-800">
          <span class="font-extralight text-2xl">Nombre del proyecto: </span>
          <h1 v-if="proyecto" class="font-semibold text-4xl border-b pb-4">
            {{ proyecto.name }}
          </h1>
        </div>

        <!-- Descripcion -->
        <div class="flex gap-2 mt-4">
          <p class="font-semibold">Descripción:</p>
          <p>
            Aún no puedes modificar las descripciones de tus proyectos, pero es una función que se
            implementará en futuras actualizaciones
          </p>
        </div>

        <!-- Fecha y Miembros -->

        <div class="text-base mt-2">
          <div class="flex justify-between">
            <div class="flex gap-2">
              <p class="font-semibold">Miembros:</p>
              <p v-if="usuario">{{ usuario.name }}</p>
            </div>
            <div class="flex gap-2">
              <p class="font-semibold">Creado el:</p>
              <p v-if="proyecto">
                {{ new Date(Number(proyecto.createdAt)).toLocaleDateString("es-ES") }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenedor Tarjetas -->
      <div class="grid grid-cols-3 gap-6 mt-10 overflow-x-auto h-full pb-20">
        <!-- Tarjetas -->
        <div
          v-for="tarjeta in tarjetas"
          :key="tarjeta.id"
          class="h-fit bg-neutral-100 px-4 py-6 rounded-xl border-l-8 border-blue-300/80 hover:border-blue-400/80 hover:scale-101 transition-all ease-in-out duration-350 m-1"
        >
          <span class="text-3xl font-semibold">{{ tarjeta.titulo }}</span>

          <!-- lista de Tareas -->
          <ul class="mt-5 text-lg overflow-y-auto max-h-65 h-fit">
            <li
              v-for="(tarea, index) in tarjeta.tareas"
              :key="index"
              class="mb-2 bg-gray-200 rounded-sm px-2 py-1 hover:border-2 border-neutral-800 transition-all duration-150 ease-in-out"
            >
              {{ tarea }}
            </li>
          </ul>

          <!-- crear Tarea -->
          <button
            @click="crearTarea(tarjeta)"
            class="w-full mx-auto text-gray-400 rounded-sm bg-gray-200/50 px-2 py-1 mt-2 hover:cursor-pointer hover:scale-103 transition-transform duration-200 ease-in-out hover:bg-gray-200/80 hover:text-gray-500"
          >
            + Añadir tarea
          </button>
        </div>
      </div>

      <div
        @click="crearTarjeta"
        class="mb-6 bg-gray-100 px-4 py-2 rounded-xl max-h-12 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out hover:bg-white hover:text-gray-500 w-fit mx-auto"
      >
        <span class="text-xl text-gray-400">+ Añadir tarjeta</span>
      </div>
    </div>
  </div>
</template>
