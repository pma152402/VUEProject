<script setup>
import { BadgeQuestionMark, X, ChevronRight } from "lucide-vue-next";
import { ref } from "vue";
import aniadir_tarjeta from "../assets/aniadir_tarjeta.png";
import aniadir_tarea from "../assets/aniadir_tarea.png";
import pet from "../assets/pet.png";

const paso = ref(0);
</script>

<template>
    <!-- LO QUE SE VE SIEMPRE:-->
    <div class="group fixed bottom-6 right-4 md:right-10 lg:right-20 w-18 h-18">
        <!-- ANIMACION SPIN, padre que gira -->
        <div class="absolute inset-0 group-hover:animate-[spin_2s_linear_infinite]">
            <!-- fondo 1 -->
            <div class="absolute inset-0 bg-gray-200/40 rotate-15 rounded-lg">
                <!-- fondo 2 -->
                <div class="absolute inset-0 bg-neutral-200/80 rotate-23 rounded-lg">
                    <!-- fondo 3 -->
                    <div class="absolute inset-0 bg-neutral-200/50 rotate-31 rounded-lg">
                        <!-- fondo 4 -->
                        <div class="absolute inset-0 bg-neutral-200/90 rotate-18 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- informacion -->
        <BadgeQuestionMark @click="paso = 1"
            class="absolute inset-0 -rotate-1 w-18 h-18 text-neutral-600 bg-neutral-200 rounded-4xl border-4 border-blue-300/70 p-0.5 fill-gray-100 hover:border-blue-400/60 hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:text-neutral-800" />
    </div>

    <!-- LA VENTANA QUE SE VAN A MOSTRAR AL CLICKAR EN INFORMACION: -->
    <div v-if="paso >= 1" class="fixed inset-0 z-3000 bg-neutral-900/70 w-full h-full">
        <!-- Guia -->
        <div
            class="bg-neutral-200 rounded-lg px-8 pt-6 pb-4 flex flex-col items-start absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-130">
            <!-- X -->
            <div @click="paso = 0"
                class="absolute top-3 right-4 text-xl hover:cursor-pointer text-gray-400 hover:text-gray-800">
                <X />
            </div>
            <!-- -->
            <div>
                <h1 class="text-5xl font-bold">Guía rápida:</h1>

                <!-- Primer paso-->

                <div v-if="paso == 1">
                    <div class="max-w-md mt-8 border-l-4 border-blue-400 pl-2 pb-0.5 text-lg leading-relaxed">
                        <p class="inline">Bienvenido a tu proyecto, aquí puedes crear todas las</p>
                        <p class="inline font-semibold">tarjetas y tareas</p>
                        <p class="inline">que necesites:</p>
                    </div>

                    <div class="mt-6 w-full pr-10 pl-15 flex justify-between font-light text-sm italic">
                        <div>
                            En la barra de acciones:

                            <img class="rounded-md shadow-md" :src="aniadir_tarjeta" />
                        </div>
                        <div>
                            En cada tarjeta:

                            <img class="rounded-md shadow-md" :src="aniadir_tarea" />
                        </div>
                    </div>
                </div>

                <!-- Segundo paso-->
                <div v-if="paso == 2">
                    <div class="mb-6 max-w-md mt-8 border-l-4 border-blue-400 pl-2 text-lg leading-relaxed">
                        <p class="inline font-semibold">Plantilla PET:</p>
                        <p class="inline">Crea un layout básico de tres tarjetas</p>
                    </div>
                    <img class="rounded-xl shadow-md mb-2" :src="pet" />
                </div>

                <!-- Tercer paso-->
                <div v-if="paso == 3">
                    <div class="mb-6 max-w-md mt-8 border-l-4 border-blue-400 pl-2 text-lg leading-relaxed">
                        <p class="inline">Puedes cambiar tus tarjetas y tareas de posición</p>
                        <p class="inline">Prueba</p>
                    </div>
                    <img class="rounded-xl shadow-md mb-2" :src="pet" />
                </div>
            </div>

            <div class="w-full items-center flex justify-between px-20 mt-6">
                <span @click="paso = paso - 1" class="text-gray-400 hover:cursor-pointer">
                    <ChevronRight class="rotate-180" />
                </span>
                <span class="hover:cursor-default">{{ paso }}/3</span>
                <span @click="paso = paso + 1" class="hover:cursor-pointer">
                    <ChevronRight />
                </span>
            </div>
        </div>
    </div>
</template>
