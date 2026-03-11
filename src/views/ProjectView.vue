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
<template>
  <div class="bg-gradient-to-t from-gray-800/50 to-gray-500/50 h-screen overflow-x-hidden">
    <div class="max-w-7xl flex flex-col mx-auto">
      <Navbar></Navbar>
      <!-- Cabecera -->
      <div class="bg-neutral-100 shadow-xl flex flex-col justify-between p-4">


        <div class="flex flex-row justify-between">
          <!-- Titulo -->
          <div class="flex flex-col pb-0 text-gray-800">
            <span class="font-extralight text-2xl">Nombre del proyecto: </span>
            <h1 v-if="proyecto" class="font-semibold text-4xl border-b pb-4">
              {{ proyecto.name }}
            </h1>
          </div>

          <!-- Fecha y Miembros -->

          <div class="text-base py-2">
            <div class="flex gap-20">
              <div class="flex flex-col ">
                <p class="font-semibold">Creado el:</p>
                <p v-if="proyecto">
                  {{ new Date(Number(proyecto.createdAt)).toLocaleDateString("es-ES") }}
                </p>
              </div>
              <div class="flex flex-col">
                <p class="font-semibold">Miembros:</p>
                <p v-if="usuario">{{ usuario.name }}</p>
              </div>
            </div>
          </div>
        </div>


        <!-- Descripcion -->
        <div class="flex gap-2 mt-2">
          <p class="font-semibold">Descripción:</p>
          <p>
            Aún no puedes modificar las descripciones de tus proyectos, pero es una función que se
            implementará en futuras actualizaciones
          </p>
        </div>
      </div>

      <!-- Tarjetas -->
      <div class="flex items-start gap-6 mt-10 overflow-x-auto h-full pb-20">
        <div
          v-for="tarjeta in tarjetas"
          :key="tarjeta.id"
          class="bg-neutral-100 px-4 py-6 rounded-xl border-t-8 border-blue-300/80 hover:border-blue-400/80 hover:scale-105 transition-all ease-in-out duration-350 min-w-3xs"
        >
          <span class="text-3xl font-semibold">{{ tarjeta.titulo }}</span>
          <ul class="mt-5 text-lg">
            <li
              v-for="(tarea, index) in tarjeta.tareas"
              :key="index"
              class="mb-2 bg-gray-200 rounded-sm px-2 py-1 hover:scale-102 transition-transform duration-200 ease-in-out"
            >
              {{ tarea }}
            </li>
          </ul>
          <button
            @click="crearTarea(tarjeta)"
            class="w-full mx-auto text-gray-400 rounded-sm bg-gray-200/50 px-2 py-1 mt-2 hover:cursor-pointer hover:scale-103 transition-transform duration-200 ease-in-out hover:bg-gray-200/80 hover:text-gray-500"
          >
            + Añadir tarea
          </button>
        </div>

        <div
          @click="crearTarjeta"
          class="bg-gray-100 px-4 py-2 rounded-xl max-h-12 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out hover:bg-white hover:text-gray-500"
        >
          <span class="text-xl text-gray-400">+ Añadir tarjeta</span>
        </div>
      </div>
    </div>
  </div>
</template>
