<script setup>
import { Trash2, Pencil, Copy, Share2, House } from "lucide-vue-next";
import { ref, watch, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";

// ** onMounted para detectar usuario y proyectos para pasarlo de json a objeto **
const usuario = ref(null);
const proyectos = ref([]);

onMounted(async () => {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    usuario.value = JSON.parse(usuarioGuardado);
  }

  const respuesta = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query($userId: Int!) {
            proyectosUsuario(userId: $userId) {
              id
              name
              createdAt
            }
          }
        `,
      variables: {
        userId: Number(usuario.value.id),
      },
    }),
  });

  const data = await respuesta.json();

  console.log(data);

  proyectos.value = data.data.proyectosUsuario;
});

// crear proyectos, es asincrono, no necesita nombreProyecto como parametro pq nombreProyecto es reactivo
const nombreProyecto = ref("");
const errorNombreProyecto = ref("");

async function crearProyecto() {
  const nombre = nombreProyecto.value.trim();

  if (nombre !== "") {
    const respuesta = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation($name: String!, $ownerId: Int!) {
            createProject(name: $name, ownerId: $ownerId) {
              id
              name
              createdAt
            }
          }
        `,
        variables: {
          name: nombre,
          ownerId: Number(usuario.value.id),
        },
      }),
    });

    const data = await respuesta.json();

    // añadir proyecto nuevo a la tabla sin recargar
    proyectos.value.push(data.data.createProject);

    // limpiar
    nombreProyecto.value = "";
    errorNombreProyecto.value = "";

  } else {
    errorNombreProyecto.value = "El nombre del proyecto no puede quedar vacío";
  }
}

// Variables reactivas
const email = ref("");
const contrasena = ref("");

const errorEmail = ref("");
const errorContrasena = ref("");

// Limpiar el error cuando se escriba
watch(nombreProyecto, () => {
  errorNombreProyecto.value = "";
});

//
console.log(proyectos.value);
</script>

<template>
  <div
    class="bg-gradient-to-t from-gray-400/50 to-gray-300/50 h-screen flex items-center justify-center"
  >
    <div class="bg-gradient-to-t from-blue-300 to-blue-200/80 rounded-2xl flex items-center">
      <div
        class="relative ml-3 rounded-lg bg-neutral-100 flex flex-col items-center px-8 pt-8 gap-5 shadow-xl pb-5"
      >
        <Navbar></Navbar>

        <div class="pb-5 lg:pb-10">
          <h3 class="text-2xl font-bold pb-5">Panel de control</h3>
          <p class="font-light">
            Aquí podrás gestionar todos tus proyectos de manera rápida y sencilla.
          </p>

          <p class="font-light">Empieza seleccionando uno de tus proyectos o crea uno nuevo.</p>
        </div>

        <table class="w-full border-separate border-spacing-y-1">
          <thead>
            <tr class="">
              <th class="text-left w-1/2 font-semibold">Nombre</th>
              <th class="text-left w-1/4 font-semibold">Fecha</th>
              <th class="text-left w-1/4 font-semibold">Acción</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="proyecto in proyectos" :key="proyecto.id" class="hover:bg-blue-100/60">
              <td class="text-sm lg:text-base">{{ proyecto.name }}</td>
              <td class="text-sm lg:text-base">
                {{ new Date(Number(proyecto.createdAt)).toLocaleDateString("es-ES") }}
              </td>
              <td class="flex justify-between ml-1">
                <Pencil
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Copy
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Share2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
                <Trash2
                  class="w-4 cursor-pointer hover:scale-115 transition-all duration-200 ease-in-out"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex-col mt-6 mb-2 w-1/2">
          <!-- asigno nombreProyecto al input como v-model -->
          <div class="flex gap-3">
            <input
            v-model="nombreProyecto"
            type="text"
            placeholder="Nuevo proyecto"
            class="border border-neutral-400 rounded-lg text-sm w-full italic font-extralight focus:outline-blue-200 px-1"
          />
          <button
            @click="crearProyecto"
            class="rounded-full bg-blue-200/80 px-2 py-1 font-md text-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-500/40 hover:cursor-pointer hover:font-semibold"
          >
            Crear
          </button>
          </div>
          <span class="mb-5 text-red-400 text-[10px]">
            {{ errorNombreProyecto }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
