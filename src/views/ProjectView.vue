<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const proyecto = ref(null);
const IDproyecto = route.params.id;

// en el montaje..
onMounted(async () => {
  proyecto.value = await cargarProyecto(IDproyecto);
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
    <div class="text-5xl lg:text-6xl flex pb-5 text-gray-800 p-10">
      <span>Proyecto: </span>
      <h1 v-if="proyecto" class="font-bold pl-4">{{ proyecto.name }}</h1>
    </div>
    <div v-if="proyecto" class="p-10 text-lg">
      <p>Creado el: {{ new Date(Number(proyecto.createdAt)).toLocaleDateString("es-ES") }}</p>

      <p>Descripción: (toDo)</p>

      <p>Miembros: (toDo)</p>
    </div>
    <div class="bg-amber-200 flex items center justify-center">
      <div class="bg-white px-4 py-2 rounded-xl"><span class="text-2xl font-semibold">Tarjeta 1</span></div>
    </div>
  </div>
</template>
