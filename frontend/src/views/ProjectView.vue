<script setup>
import { Trash2, Check, Columns3, Plus, BrushCleaning, ChevronUp, BadgeQuestionMark } from "lucide-vue-next";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import "../styles/scrollbar.css";
import "../styles/project.css";
import Navbar from "../components/Navbar.vue";
import Informacion from "../components/Informacion.vue"
import draggable from "vuedraggable";

import { cargarProyecto, actNombreProyecto, actDescProyecto } from "../../../backend/api/projects";
import { crearTarjetaAPI, cargarTarjetas, borrarTarjetaAPI, actTituloTarjeta, borrarTodasAPI, crearPET, reordenarTAPI } from "../../../backend/api/cards";
import { crearTareaAPI, borrarTareaAPI, actualizarTarea, actualizarCompletadaAPI, moverTareaAPI, limpiarTareasCompletadas } from "../../../backend/api/tasks";

// Declarar
const route = useRoute();
const usuario = ref(null);
const proyecto = ref(null);
const IDproyecto = route.params.id;
const hoverTarea = ref("");

// edicion
const editando = ref(null);

const mostrarOpTodas = ref(false);

const mostrarOpPET = ref(false);
// definir TARJETAS
const tarjetas = ref([
  {
    id: 1,
    titulo: "",
    tareas: [],
  },
]);


// Contenedor general para referenciar las tarjetas y tareas
const mostrarPapelera = ref(null);

// CARGAR
// al cargar..
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


// TARJETAS
// Crear Tarjeta
async function crearTarjeta() {

  const nuevaTarjeta = await crearTarjetaAPI(IDproyecto);

  tarjetas.value.push({
    id: nuevaTarjeta.id,
    titulo: nuevaTarjeta.title,
    tareas: []
  });
}
// Borrar tarjeta
const mostrarBT = ref(false);
const tituloBT = ref("");

async function borrarTarjeta(idTarjeta) {

  if (!idTarjeta) return;

  const tarjetaBorrada = await borrarTarjetaAPI(idTarjeta);

  if (!tarjetaBorrada) return;

  tarjetas.value = tarjetas.value.filter(
    tarjeta => tarjeta.id !== idTarjeta
  );

}

// Borrar todas las tarjetas
async function borrarTodas() {

  const resultado = await borrarTodasAPI(IDproyecto);

  if (!resultado) return;

  tarjetas.value = [];
}

// Crear plantilla PET
async function crearPlantillaPET() {

  await borrarTodas();

  const nuevasTarjetas = await crearPET(IDproyecto);

  if (!nuevasTarjetas) return;

  // reemplazar todas las tarjetas
  tarjetas.value = nuevasTarjetas.map(card => ({
    id: card.id,
    titulo: card.title,
    tareas: [] // luego puedes recargar tareas si quieres
  }));

  tarjetas.value = await cargarTarjetas(IDproyecto);
}


// TAREAS 
// Crear Tarea
async function crearTarea(cardId) {

  const nuevaTarea = await crearTareaAPI(cardId, "Nueva tarea..");

  if (!nuevaTarea) return;

  const tarjeta = tarjetas.value.find(t => t.id === cardId);

  tarjeta.tareas.push(nuevaTarea);
}
// Borrar tarea
async function borrarTarea(idTarea) {

  if (!idTarea) return;

  const tareaBorrada = await borrarTareaAPI(idTarea);

  if (!tareaBorrada) return;

  // eliminar tarea del estado
  tarjetas.value.forEach((tarjeta) => {
    tarjeta.tareas = tarjeta.tareas.filter(
      (tarea) => tarea.id !== idTarea
    );
  });

  // limpiar estados
  mostrarPapelera.value = null;
  editando.value = null;
}

// Actualizar la tarea con check
async function actualizarCompletada(tarea) {

  const nuevoEstado = !tarea.completed;

  const resultado = await actualizarCompletadaAPI(
    tarea.id,
    nuevoEstado
  );

  if (!resultado) return;

  tarea.completed = nuevoEstado;
}
// MOVER TAREAS
async function moverTarea(evt, cardId) {

  if (!evt.added) return;

  const tarea = evt.added.element;

  // lo parseo para evitar errores
  await moverTareaAPI(
    Number(tarea.id),
    Number(cardId)
  );
}
// LIMPIAR TAREAS COMPLETADAS
// Borrar todas las tarjetas
async function limpiarTCompletadas() {

  const borradas = await limpiarTareasCompletadas(IDproyecto);

  if (borradas === null) return;

  // recargar
  tarjetas.value = await cargarTarjetas(IDproyecto);

  console.log(`eliminadas ${borradas} tareas`);
}


// DOWNBAR
const downBar = ref(true);

// GUARDAR NOMBRE PROYECTO, mejor que controlar en el blur..
const errorNombreProyecto = ref("");
function guardarNombreProyecto() {
  if (proyecto.value.name.trim().length < 1) {
    errorNombreProyecto.value = "El título del proyecto no puede quedar vacío";
    return;
  }

  errorNombreProyecto.value = "";
  editando.value = false;

  actNombreProyecto(proyecto.value.id, proyecto.value.name);
}

watch(proyecto.value?.name, () => {
  errorNombreProyecto.value = "";
});

// GUARDAR NOMBRE TARJETA
const errorNombreTarjeta = ref({});

function guardarNombreTarjeta(id) {
  const tarjeta = tarjetas.value.find(t => t.id === id);

  if (!tarjeta) return;

  if (tarjeta.titulo.trim().length < 1) {
    errorNombreTarjeta.value[id] = "El título de la tarjeta no puede quedar vacío";
    return;
  }

  errorNombreTarjeta.value[id] = "";
  editando.value = null;

  actTituloTarjeta(tarjeta.id, tarjeta.titulo);
}

// GUARDAR TEXTO TAREA
const errorTextoTarea = ref({});

function guardarTextoTarea(id) {
  let tareaEncontrada = null;

  for (const tarjeta of tarjetas.value) {
    const t = tarjeta.tareas.find(t => t.id === id);
    if (t) {
      tareaEncontrada = t;
      break;
    }
  }

  if (!tareaEncontrada) return;

  if (tareaEncontrada.text.trim().length < 1) {
    errorTextoTarea.value[id] = "El texto de la tarea no puede quedar vacío";
    return;
  }

  errorTextoTarea.value[id] = "";
  editando.value = null;

  actualizarTarea(tareaEncontrada.id, tareaEncontrada.text);
}


// FUNCION PARA MOVER LAS TARJETAS DE ORDEN
async function moverTarjeta(evt) {
  const orden = tarjetas.value.map((t, index) => ({
    id: Number(t.id),
    position: index
  }));

  await reordenarTAPI(orden);
}

</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>


<template>
  <div class="bg-neutral-300  min-h-screen flex justify-center relative ">

    <!-- HACER MODALES.VUE-->
    <!-- a) Borrar tarjeta -->
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

    <!-- b) Borrar todas las tarjetas -->
    <div v-if="mostrarOpTodas"
      class="z-100 shadow-xl hover:scale-105 font-semibold transition-all duration-200 ease-in-out rounded-xl border-2 border-gray-400 bg-neutral-200 px-8 py-6 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      ¿Estás seguro de eliminar todas las tarjetas?

      <div class="flex justify-center gap-3 text-sm mt-4">
        <button @click="
          borrarTodas();
        mostrarOpTodas = false;
        "
          class="bg-red-400 px-2 py-1 font-semibold rounded-full hover:scale-110 transition-all duration-200 ease-in-out hover:cursor-pointer">
          Eliminar
        </button>
        <button @click="mostrarOpTodas = false"
          class="bg-gray-400/80 px-2 py-1 font-semibold rounded-full hover:scale-110 transition-all duration-200 ease-in-out hover:cursor-pointer">
          Cancelar
        </button>
      </div>
    </div>

    <!-- c) Crear plantilla PET -->
    <div v-if="mostrarOpPET"
      class="z-100 shadow-xl hover:scale-105 font-semibold transition-all duration-200 ease-in-out rounded-xl border-2 border-gray-400 bg-neutral-200 px-8 py-6 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Se creará una plantilla PET, sustituyendo todas tus tarjetas.

      <div class="flex justify-center gap-3 text-sm mt-4">
        <button @click="
          crearPlantillaPET();
        mostrarOpPET = false;
        "
          class="bg-red-400 px-2 py-1 font-semibold rounded-full hover:scale-110 transition-all duration-200 ease-in-out hover:cursor-pointer">
          Confirmar
        </button>
        <button @click="mostrarOpPET = false"
          class="bg-gray-400/80 px-2 py-1 font-semibold rounded-full hover:scale-110 transition-all duration-200 ease-in-out hover:cursor-pointer">
          Cancelar
        </button>
      </div>
    </div>

    <div class="w-full max-w-7xl flex flex-col relative">
      <!-- NAV -->
      <Navbar class="mt-2 mr-1 z-999"></Navbar>
      <!-- 1. HACER CABECERA.VUE-->
      <!-- Cabecera -->
      <div v-if="proyecto"
        class="bg-neutral-100 shadow-xl flex flex-col justify-between p-8 rounded-xl mt-2 border-l-8 border-blue-300 z-30">
        <!-- Titulo -->
        <div class="flex flex-col text-gray-800">
          <span class="font-extralight text-2xl ">Nombre del proyecto: </span>
          <h1 v-if="!editando" @click="editando = true" class="font-semibold text-5xl border-b pb-7">
            {{ proyecto.name }}
          </h1>
          <input v-else v-model="proyecto.name" @blur="guardarNombreProyecto"
            class="w-full font-semibold text-5xl border-b pb-7">
          </input>
          <span v-if="errorNombreProyecto" class="text-red-400 text-[10px]">
            {{ errorNombreProyecto }}
          </span>
        </div>

        <!-- Descripcion -->
        <div class="flex flex-col sm:flex-row gap-2 mt-4 text-gray-800">
          <p class="font-semibold">Descripción:</p>
          <p v-if="!editando" @click="editando = true">
            {{ proyecto.description }}
          </p>
          <input v-else v-model="proyecto.description"
            @blur="editando = false; actDescProyecto(proyecto.id, proyecto.description)" class="w-full"></input>
        </div>

        <!-- Fecha y Miembros -->

        <div class="text-base mt-4 text-gray-800">
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
            <div class="flex  gap-2">
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

      <!-- 2. HACER OPCIONES.VUE -->
      <!-- Opciones -->
      <div v-if="proyecto"
        class="bg-neutral-400/50 mx-auto px-2  rounded-b-3xl ml-6 mr-6 md:ml-10 md:mr-10 z-10 border-b-2 border-neutral-500/70">

        <transition name="slide">
          <div :class="downBar
            ? 'max-h-40 opacity-100 py-1 pointer-events-auto'
            : 'max-h-0 opacity-0 py-1 -mt-2 pointer-events-none'"
            class="bg-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center md:flex-row rounded-b-2xl px-10 text-sm text-gray-500/80 font-semibold py-1 transition-all ease-in-out duration-300 select-none">
            <span @click="mostrarOpPET = true"
              class="select-none flex gap-1 hover:text-gray-800 hover:cursor-pointer transition-all duration-300 ease-in-out">Plantilla
              PET
              <Columns3 class="w-4 pb-0.5" />
            </span>

            <span @click="mostrarOpTodas = true"
              class="select-none flex gap-1 hover:text-gray-800 hover:cursor-pointer transition-all duration-300 ease-in-out">Borrar
              todas
              las tarjetas
              <Trash2 class="w-4 pb-0.5" />
            </span>
            <span @click="crearTarjeta"
              class="select-none flex gap-1 hover:text-gray-800 hover:cursor-pointer transition-all duration-300 ease-in-out">
              Añadir
              tarjeta

              <Plus class="w-4 pb-0.5" />
            </span>
            <span @click="limpiarTCompletadas"
              class="select-none flex gap-1 hover:text-gray-800 hover:cursor-pointer transition-all duration-300 ease-in-out">Limpiar completadas
              <BrushCleaning class="w-4 pb-0.5" />
            </span>
          </div>
        </transition>
        <div @click="downBar = !downBar" class="w-full flex justify-center m-0 p-0 hover:cursor-pointer">
          <ChevronUp class="text-neutral-500/70 transition-transform duration-300"
            :class="{ 'rotate-180': !downBar }" />
        </div>
      </div>

      <!-- LOCURA.VUE -->
      <!-- Contenedor Tarjetas -->
      <draggable v-model="tarjetas" item-key="id" @end="moverTarjeta" handle=".handle"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 overflow-x-auto h-full pb-20 relative">
        <!-- Tarjetas -->
        <template #item="{ element: tarjeta }">

          <div
            class="relative tarjeta shadow-lg h-fit bg-neutral-100 px-4 py-6 rounded-xl border-l-8 border-blue-300/80 hover:border-blue-400/80 hover:scale-101 transition-all ease-in-out duration-350 m-1">
            <!-- Titulo -->


            <div class="flex justify-between items-center">

              <span v-if="!editando" @click="editando = true" class="text-2xl font-semibold text-gray-800">
                {{ tarjeta.titulo }}
              </span>

              <input v-else v-model="tarjeta.titulo" @blur="guardarNombreTarjeta(tarjeta.id)"
                class="w-full text-2xl font-semibold text-gray-800" />




              <div @click="mostrarBT = true; tarjetaABorrar = tarjeta.id; tituloBT = tarjeta.titulo">
                <Trash2
                  class="papeleraTarjeta text-gray-400 w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out" />
              </div>

            </div>
            <span v-if="errorNombreTarjeta[tarjeta.id]" class="text-red-400 text-[10px]">
              {{ errorNombreTarjeta[tarjeta.id] }}
            </span>


            <!-- TAREAS -->
            <draggable @change="(evt) => moverTarea(evt, tarjeta.id)" v-model="tarjeta.tareas" group="tasks"
              item-key="id" class="mt-5 text-lg overflow-y-auto max-h-60 h-fit ">
              <template #item="{ element: tarea }">

                <li :class="[
                  'tarea group shadow-md relative mb-2 bg-gray-200 rounded-sm px-2 py-1 hover:border-2 border-neutral-800 ease-in-out flex items-center overflow-visible',
                  tarea.completed ? 'text-gray-400' : ''
                ]" @click.stop="mostrarPapelera = mostrarPapelera === tarea.id ? null : tarea.id"
                  @mouseenter="hoverTarea = tarea.id" @mouseleave="hoverTarea = null">

                  <!-- Check -->
                  <div @click.stop="actualizarCompletada(tarea)" :class="[
                    'flex flex-shrink-0 items-center justify-center border-2 rounded-full w-4 h-4 mr-2 hover:bg-blue-300 hover:border-blue-400 hover:cursor-pointer transition-all duration-200',
                    hoverTarea === tarea.id || tarea.completed ? 'opacity-100 ml-0' : 'opacity-0 -ml-4',
                    tarea.completed
                      ? 'bg-blue-400 border-blue-300'
                      : 'bg-gray-300 border-gray-400/50'
                  ]">
                    <Check v-if="tarea.completed" class="w-4 h-4 text-white" />
                  </div>

                  <div v-if="editando !== tarea.id" @click.stop="editando = editando === tarea.id ? null : tarea.id"
                    class="text-base ">
                    {{ tarea.text }}
                  </div>

                  <input v-else @blur="guardarTextoTarea(tarea.id)" @focus="errorNombreTarjeta[tarjeta.id] = ''"
                    v-model="tarea.text" class="w-full text-gray-800 mr-5 text-base z-20" />


                  <span v-if="errorTextoTarea[tarea.id]" class="text-red-400 text-[10px] absolute left-8">
                    {{ errorTextoTarea[tarea.id] }}
                  </span>

                  <div @click.stop="borrarTarea(tarea.id)" :class="{ mostrar: mostrarPapelera === tarea.id }"
                    class="papelera bg-gray-300/80 h-full absolute right-0 top-0 flex items-center px-1 rounded-xs">
                    <Trash2
                      class="text-gray-500 w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out" />
                  </div>

                </li>

              </template>
            </draggable>

            <!-- crear Tarea -->
            <button @click="crearTarea(tarjeta.id)"
              class="w-full mx-auto text-gray-400 rounded-sm bg-gray-200/50 px-2 py-1 mt-2 hover:cursor-pointer hover:scale-103 transition-transform duration-200 ease-in-out hover:bg-gray-200/80 hover:text-gray-500">
              + Añadir tarea
            </button>


            <div class="handle cursor-grab active:cursor-grabbin bg-neutral-400/50 p-1 w-42 rounded-b-full border-b-2 border-neutral-500/70 
            absolute left-1/2 -translate-x-1/2 -bottom-3.5
            ">
              <div class="mx-auto h-1 rounded-4xl w-1/2 bg-neutral-500/70">
              </div>
            </div>

          </div>


        </template>


      </draggable>



      <Informacion />
    </div>

  </div>
</template>
