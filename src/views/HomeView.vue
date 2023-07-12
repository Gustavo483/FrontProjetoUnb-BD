<script setup>
import NavBar from "@/components/NavBar.vue";
import {RouterLink} from 'vue-router'
</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>

  <div class="container">
    <div class="flex1 mt-2">
      <div class="tamanhoDivHome">
        <img class=" mr-2 w-100" src="/src/assets/img/imagemteste.webp" alt="logo">
      </div>
      <div class="tamanhoDivHome">
        <span class="titleHome">Avalie sua turma, e ajude futuros estudantes a encontrarem a turma ideal.</span>
        <div class="flex1 mt-3">
          <RouterLink class="linkAvaliar dark:bg-violet-800" to="/avaliarTurmas">Avaliar turma</RouterLink>
        </div>
      </div>
    </div>
    <div class="flex1 mt-2">
      <div class="tamanhoDivHome">
        <p class="titleHome text-center">Avalie também seu professor</p>
        <div class="flex1 mt-3">
          <RouterLink class="linkAvaliar dark:bg-violet-800" to="/avaliarProfessor">Avaliar professor</RouterLink>
        </div>
      </div>
      <div class="tamanhoDivHome">
        <img class=" mr-2 w-100" src="/src/assets/img/img2.jpg" alt="logo">
      </div>
    </div>
  </div>
</template>
