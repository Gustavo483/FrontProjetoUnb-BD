<script setup>
import NavBar from "@/components/NavBar.vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
import AvaliacaoController from "@/controllers/AvaliacaoController";
import {RouterLink} from 'vue-router'
import {onMounted} from "vue";
const {authenticationValidation} = useAuthenticationController()
const {getAvaliacoesUsuario,turmas,idTurmas, deleteAvaliacao, EditarAvaliacao,UpdadateAvaliacao} = AvaliacaoController()

onMounted(() => {
  authenticationValidation();
  getAvaliacoesUsuario();
});

</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>

  <div class=" container LinkTurmas mb-20">
    <div class="DivAvaliacao" v-for="idturma in idTurmas">
      <div class="tituloAvaliacao">
        <div>
          Turma: {{idturma.id_turma}} Horario: {{idturma.st_horario}} Disciplina: {{idturma.st_nomeDisciplina}}
          Professor: {{idturma.st_nomeProfessor}}
        </div>
      </div>
      <div v-for="turma in turmas">
        <div class="p-4" v-if="turma.id_turma === idturma.id_turma && turma.st_avaliacao" >
          <div class="flexMostrarAvaliacoes">
            <div class="flex">
              <div class="p-2">
                <img class="tamanhoImagemAvaliacao" src="/src/assets/img/img2.jpg">
              </div>
              <div class="divRelative">
                <div class="p-2">
                  {{turma.st_avaliacao}}
                </div>
                <div class="divAbsolut">
                  <div class="flex" v-if="turma.int_estrelas === 1">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                  </div>
                  <div class="flex" v-if="turma.int_estrelas === 2">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                  </div>
                  <div class="flex" v-if="turma.int_estrelas === 3">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                  </div>
                  <div class="flex" v-if="turma.int_estrelas === 4">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                  </div>
                  <div class="flex" v-if="turma.int_estrelas === 5">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="pe-2">
                <div @click="EditarAvaliacao(turma.id_avaliacao,turma.st_avaliacao, turma.int_estrelas)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="blue" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                  </svg>
                </div>
              </div>
              <div @click="deleteAvaliacao(turma.id_avaliacao)">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
              </div>
            </div>
          </div>
          <div v-bind:id="'DivEdidAvaliacao'+turma.id_avaliacao" class="p-6 space-y-6 none">
            <form class="space-y-4 md:space-y-6" @submit.prevent="UpdadateAvaliacao(turma.id_avaliacao)">
              <div class="none" id="id_avaliacao"></div>
              <div>
                <label for="st_avaliacao" class="block mb-2 text-sm font-medium text-gray-900">Comentário</label>
                <input type="text"  v-bind:id="'st_avaliacaoEditar'+turma.id_avaliacao" placeholder="Digite sua Avaliação" class="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
              </div>
              <div>
                <label for="int_estrelas" class="block mb-2 text-sm font-medium text-gray-900">Estrelas</label>
                <input type="number"  v-bind:id="'int_estrelasEditar'+turma.id_avaliacao" placeholder="Digite de um a 5 sua avaliação" class="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
              </div>
              <div class="flexBtn">
                <button type="submit" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800">Editar avaliação</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>