<script setup>
import { Trash2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import "../styles/scrollbar.css";
import Navbar from "../components/Navbar.vue";

const route = useRoute();
const usuario = ref(null);
const proyecto = ref(null);
const IDproyecto = route.params.id;

// definir TARJETAS
const tarjetas = ref([
  {
    id: 1,
    titulo: "Por hacer:",
    tareas: ["Tarea de ejemplo", "Crea todas las tareas que necesites"],
  },
]);

// CARGAR PROYECTO
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

// CARGAR TARJETAS
async function cargarTarjetas(IDproyecto) {

  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query($projectId: Int!) {
            cards(projectId: $projectId) {
              id
              title
              tasks {
                id
                text
              }
            }
          }
        `,
      variables: {
        projectId: Number(IDproyecto),
      },
    }),
  });

  const data = await respuesta.json();

  console.log(data);

  // Si hay error en GraphQL
  if (!data.data) {
    console.error(data.errors);
    return [];
  }

  // Transformar datos para el frontend
  return data.data.cards.map(card => ({
    id: card.id,
    titulo: card.title,
    tareas: card.tasks
  }));

}

// CREAR TARJETA
async function crearTarjeta() {

  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          mutation($title: String!, $projectId: Int!) {
          createCard(title: $title, projectId: $projectId) {
            id
            title
          }
        }
        `,
      variables: {
        title: "Nueva tarjeta",
        projectId: Number(IDproyecto),
      },
    }),
  });

  const data = await respuesta.json();

  console.log(data);

  tarjetas.value.push({
    id: data.data.createCard.id,
    titulo: data.data.createCard.title,
    tareas: []
  });
}

async function actTituloTarjeta(tarjeta) {

  await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($cardId: Int!, $title: String!) {
          updateCardTitle(cardId: $cardId, title: $title) {
            id
            title
          }
        }
      `,
      variables: {
        cardId: Number(tarjeta.id),
        title: tarjeta.titulo
      }
    })
  })

}

// CREAR TAREA
async function crearTarea(cardId) {

  const text = "Nueva tarea..";

  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($text: String!, $cardId: Int!) {
          createTask(text: $text, cardId: $cardId) {
            id
            text
          }
        }
      `,
      variables: {
        text: text,
        cardId: Number(cardId)
      }
    })
  })

  const data = await respuesta.json()

  // recargar tarjetas
  tarjetas.value = await cargarTarjetas(IDproyecto)
  console.log(data);
}

async function actualizarTarea(tarea) {

  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($taskId: Int!, $text: String!) {
          updateTask(taskId: $taskId, text: $text) {
            id
            text
          }
        }
      `,
      variables: {
        taskId: Number(tarea.id),
        text: tarea.text
      }
    })
  })

  const data = await respuesta.json()

  // recargar tarjetas
  tarjetas.value = await cargarTarjetas(IDproyecto);
  console.log(data);

}

// Contenedor general para referenciar las tarjetas y tareas
const mostrarPapelera = ref(null);
let tareaActiva = null;
let tarjetaActiva = null;

// AL CARGAR
onMounted(async () => {
  // proyecto
  proyecto.value = await cargarProyecto(IDproyecto);

  // usuario
  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    usuario.value = JSON.parse(usuarioGuardado);
  }

  // tarjetas
  tarjetas.value = await cargarTarjetas(IDproyecto);


});




// variables para poder cambiar nombres al momento
const editando = ref(null);
const descripcion = ref(
  "Aún no puedes modificar las descripciones de tus proyectos, pero es una función que se implementará en futuras actualizaciones",
);


// Borrar tarea
async function borrarTarea(idTarea) {

  if (!idTarea) return;

  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation($taskId: Int!) {
          deleteTask(taskId: $taskId) {
            id
          }
        }
      `,
      variables: {
        taskId: Number(idTarea),
      },
    }),
  });

  const data = await respuesta.json();
  console.log(data);

  // eliminar tarea del estado
  tarjetas.value.forEach((tarjeta) => {
    tarjeta.tareas = tarjeta.tareas.filter(
      (tarea) => tarea.id !== idTarea
    );
  });


  // limpiar estados de interfaz
  mostrarPapelera.value = null;
  editando.value = null;

}

// Controlar Blur para eliminar la tarea
function controlarBlur(tarea) {
  if (editando.value === tarea.id) {
    editando.value = null;
    actualizarTarea(tarea);
  }
}

// Borrar tarjeta
async function borrarTarjeta(idTarjeta) {

  if (!idTarjeta) return;

  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation($cardId: Int!) {
          deleteCard(cardId: $cardId) {
            id
          }
        }
      `,
      variables: {
        cardId: Number(idTarjeta),
      },
    }),
  });

  const data = await respuesta.json();
  console.log(data);


  tarjetas.value = tarjetas.value.filter((tarjeta) => tarjeta.id !== idTarjeta);

}


// Confirmar borrar tarjeta
const mostrarBT = ref(false);
const tituloBT = ref("");

</script>

<style>
/* PAPELERA TAREAS */
.tarea .papelera {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

/* escritorio */
.tarea:hover .papelera {
  opacity: 1;
  pointer-events: auto;
}

/* para movil */
.tarea .papelera.mostrar {
  opacity: 1;
  pointer-events: auto;
}


/* PAPELERA TARJETAS */
.tarjeta .papeleraTarjeta {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

/* escritorio */
.tarjeta:hover .papeleraTarjeta {
  opacity: 1;
  pointer-events: auto;
}

/* movil */
.tarjeta .papeleraTarjeta.mostrar {
  opacity: 1;
  pointer-events: auto;
}
</style>

<template>
  <div
    class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 min-h-screen overflow-x-hidden flex justify-center relative">

    <!-- Borrar tarjeta -->
    <div v-if="mostrarBT"
      class="z-100 shadow-xl hover:scale-105 font-semibold transition-all duration-200 ease-in-out rounded-xl border-2 border-gray-400 bg-neutral-200 px-8 py-6 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      ¿Eliminar la tarjeta: "<p class="italic inline">{{ tituloBT }}</p>" ?

      <div class="flex justify-center gap-3 text-sm mt-4">
        <button @click="
          borrarTarjeta(tarjetaABorrar);
          mostrarBT = false;
        "
          class="bg-red-400 px-2 py-1 font-semibold rounded-full hover:scale-110 transition-all duration-200 ease-in-out hover:cursor-pointer">
          Eliminar
        </button>
        <button @click="mostrarBT = false"
          class="bg-gray-400/80 px-2 py-1 font-semibold rounded-full hover:scale-110 transition-all duration-200 ease-in-out hover:cursor-pointer">
          Cancelar
        </button>
      </div>
    </div>

    <div class="lg:min-w-6xl max-w-6xl flex flex-col relative">
      <Navbar class="mt-2 mr-1"></Navbar>
      <!-- Cabecera -->
      <div
        class="bg-neutral-100 shadow-xl flex flex-col justify-between p-6 rounded-xl mt-2 border-l-6 border-blue-300">
        <!-- Titulo -->
        <div v-if="proyecto" class="flex flex-col pb-0 text-gray-800">
          <span class="font-extralight text-2xl">Nombre del proyecto: </span>
          <h1 class="font-semibold text-4xl border-b pb-4">
            {{ proyecto.name }}
          </h1>
        </div>

        <!-- Descripcion -->
        <div class="flex gap-2 mt-4">
          <p class="font-semibold">Descripción:</p>
          <p v-if="!editando" @click="editando = true">
            {{ descripcion }}
          </p>
          <input v-else v-model="descripcion" @blur="editando = false" class="w-full"></input>
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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 overflow-x-auto h-full pb-20">
        <!-- Tarjetas -->
        <div v-for="tarjeta in tarjetas" :key="tarjeta.id"
          class="tarjeta shadow-lg h-fit bg-neutral-100 px-4 py-6 rounded-xl border-l-8 border-blue-300/80 hover:border-blue-400/80 hover:scale-101 transition-all ease-in-out duration-350 m-1">
          <!-- Titulo -->
          <div class="flex justify-between items-center">

            <span v-if="editando !== tarjeta.id" @click="editando = tarjeta.id" class="text-3xl font-semibold">
              {{ tarjeta.titulo }}
            </span>

            <input v-else v-model="tarjeta.titulo" @blur="editando = null; actTituloTarjeta(tarjeta)"
              class="w-full text-3xl font-semibold " />




            <div @click="mostrarBT = true; tarjetaABorrar = tarjeta.id; tituloBT = tarjeta.titulo">
              <Trash2
                class="papeleraTarjeta text-gray-400 w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out" />
            </div>

          </div>





          <!-- lista de Tareas, point para ordenadores y click moviles -->
          <ul class="mt-5 text-lg overflow-y-auto max-h-65 h-fit">
            <li v-for="tarea in tarjeta.tareas" :key="tarea.id"
              class="tarea group shadow-md relative mb-2 bg-gray-200 rounded-sm px-2 py-1 hover:border-2 border-neutral-800 transition-all duration-150 ease-in-out"
              @click.stop="mostrarPapelera = mostrarPapelera === tarea.id ? null : tarea.id" :ref="elemento => {
                if (mostrarPapelera === tarea.id) {
                  tareaActiva = elemento;
                }
              }">

              <div v-if="editando !== tarea.id" @click.stop="editando = editando === tarea.id ? null : tarea.id">
                {{ tarea.text }}
              </div>
              <input v-else @blur="controlarBlur(tarea)" v-model="tarea.text" class="w-full" />



              <div @click.stop="borrarTarea(tarea.id)" :class="{ 'mostrar': mostrarPapelera === tarea.id }"
                class="papelera bg-gray-300/80 h-full absolute right-0 top-0 flex items-center px-1 rounded-xs">
                <Trash2
                  class="text-gray-500 w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out" />
              </div>
            </li>
          </ul>

          <!-- crear Tarea -->
          <button @click="crearTarea(tarjeta.id)"
            class="w-full mx-auto text-gray-400 rounded-sm bg-gray-200/50 px-2 py-1 mt-2 hover:cursor-pointer hover:scale-103 transition-transform duration-200 ease-in-out hover:bg-gray-200/80 hover:text-gray-500">
            + Añadir tarea
          </button>
        </div>
      </div>

      <div @click="crearTarjeta"
        class="mb-6 bg-gray-100 px-4 py-2 rounded-xl max-h-12 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out hover:bg-white hover:text-gray-500 w-fit mx-auto">
        <span class="text-xl text-gray-400">+ Añadir tarjeta</span>
      </div>
    </div>
  </div>
</template>
