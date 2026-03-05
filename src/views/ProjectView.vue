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
    <h1 class="text-5xl lg:text-6xl font-extrabold pb-5 text-gray-800">ORGANIZER</h1>
    <div v-if="proyecto">
      <h1>{{ proyecto.name }}</h1>
      <p>Creado el: {{ proyecto.createdAt }}</p>
    </div>
  </div>
</template>
