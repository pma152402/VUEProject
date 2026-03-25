<script setup>
    import { BadgeQuestionMark } from "lucide-vue-next";
</script>

<template>
    <div class="group fixed bottom-6 right-4 md:right-10 lg:right-20 w-18 h-18">

        <!-- padre que gira -->
        <div class="absolute inset-0 group-hover:animate-[spin_2s_linear_infinite]">

          <!-- fondo 1 -->
          <div class="absolute inset-0 bg-gray-200/40 rotate-15 rounded-lg">

            <!-- fondo 2 -->
            <div class="absolute inset-0 bg-neutral-200/80 rotate-23 rounded-lg">

              <!-- fondo 3 -->
              <div class="absolute inset-0 bg-neutral-200/50 rotate-31 rounded-lg">
                <!-- fondo 4 -->
                <div class="absolute inset-0 bg-neutral-200/90 rotate-18 rounded-lg">
                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- informacion -->
        <BadgeQuestionMark
          class="absolute inset-0 -rotate-1 w-18 h-18 text-neutral-600 bg-neutral-200 rounded-4xl border-4 border-blue-300/70 p-0.5 fill-gray-100 
        hover:border-blue-400/60 hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:text-neutral-800" />

      </div>
</template>