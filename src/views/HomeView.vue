<script>
import login from "../assets/login_img.png";

export default {
    name: "HomeView",
};
</script>

<template>
<div class="bg-gradient-to-t from-gray-300 to-gray-100 h-screen flex items-center justify-center">


    <div class="border-b-4 border-r-3 border-neutral-300 rounded-2xl bg-neutral-100 flex flex-col items-center p-6 gap-5 max-w-md w-full">
        <div class="flex-col items-center">
            <h1 class="font-light text-2xl text-gray-900">Regístrate en</h1>
            <h1 class="font-bold text-4xl text-gray-900">ORGANIZER</h1>
        </div>

        <div class="w-full">
            <!-- nombre y apellidos -->
            <div class="flex gap-4">
                <div class="flex flex-col w-1/2">
                    <span class="font-semibold border-l-4 border-lime-400 leading-none pl-1 pb-0.5">
                        Nombre
                    </span>
                    <input type="text" placeholder="Pablo" class="mt-2 border rounded-lg p-1 text-sm w-full" />
                </div>

                <div class="flex flex-col w-1/2">
                    <span class="font-semibold border-l-4 border-lime-400 leading-none pl-1 pb-0.5">
                        Apellidos
                    </span>
                    <input type="text" placeholder="Monís Álvarez" class="mt-2 border rounded-lg p-1 text-sm w-full" />
                </div>
            </div>

            <!-- correo -->
            <div class="flex flex-col pt-6">
                <span class="font-semibold border-l-4 border-lime-400 leading-none pl-1 pb-0.5">
                    Correo electrónico
                </span>
                <input type="email" placeholder="pma152402@gmail.com" class="mt-2 border rounded-lg p-1 text-sm" />
            </div>
        </div>
        <div class="flex gap-2">
            
            <button class="rounded-full bg-red-400/20 border border-gray-900 px-2 py-1 font-light text-sm">
                Volver
            </button>
            <button class="rounded-full bg-lime-400/20 border border-gray-900 px-2 py-1 font-light text-sm">
                Avanzar
            </button>
        </div>
    </div>
</div>
</template>
