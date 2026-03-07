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
    <div class="flex items-center justify-center gap-6">
      

      <div class="bg-white px-4 py-6 rounded-xl w-1/6 border-l-8 border-blue-300/80 hover:border-blue-400/80 hover:scale-105 transition-all ease-in-out duration-350">
        <span class="text-3xl font-semibold">Tarjeta 1</span>
        <ul class="mt-5 text-lg">
          <li class="mb-2 bg-gray-200 rounded-sm px-2 py-1 hover:scale-102 transition-transform duration-200 ease-in-out">Lo primero</li>
          <li class="mb-2 bg-gray-200 rounded-sm px-2 py-1 hover:scale-102 transition-transform duration-200 ease-in-out">Lo segundo</li>
          <li class="mb-2 bg-gray-200 rounded-sm px-2 py-1 hover:scale-102 transition-transform duration-200 ease-in-out">Lo tercero</li>
        </ul>
        <button class="w-full mx-auto text-gray-400 rounded-sm bg-gray-100 px-2 py-1 mt-2 hover:cursor-pointer hover:scale-103 transition-transform duration-200 ease-in-out hover:bg-gray-200/80 hover:text-gray-500">+ Añadir tarea</button>
      </div>


      
      <div class="bg-gray-100 px-4 py-2 rounded-xl max-h-12 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out hover:bg-gray-200/80 hover:text-gray-500">
        <span class="text-xl text-gray-400 ">+ Añadir tarjeta</span>
      </div>
    </div> 
  </div>
</template>
