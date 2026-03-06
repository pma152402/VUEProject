<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const usuario = ref(null);
const proyecto = ref(null);
const IDproyecto = route.params.id;

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
  <div class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 h-screen overflow-x-hidden">
    <div class="text-5xl lg:text-6xl flex flex-col md:flex-row pb-5 text-gray-800 p-10">
      <span>Proyecto: </span>
      <h1 v-if="proyecto" class="font-bold pl-4">{{ proyecto.name }}</h1>
    </div>
    <div class="p-10 text-lg">
      <div class="flex gap-2">
        <p class="font-semibold">Descripción:</p>
        <p>Aún no puedes modificar las descripciones de tus proyectos</p>
      </div>
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
    <div class="bg-gray-100 flex items center justify-center gap-6">
      <div class="bg-white px-4 py-2 rounded-xl">
        <span class="text-2xl font-semibold border-b ">Tarjeta 1</span>
        <ul class="AQUI">
          <li class="mb-2">Lo primero</li>
          <li class="mb-2">Lo segundo</li>
          <li class="mb-2">Lo tercero</li>
        </ul>
        <button class="rounded-xl px-2 py-1 mt-2 bg-neutral-200">+ Añadir tarea</button>
      </div>
      <div class="bg-neutral-400/80 px-4 py-2 rounded-xl max-h-12">
        <span class="text-2xl font-semibold">+ Nueva tarjeta</span>
      </div>
    </div>
  </div>
</template>
