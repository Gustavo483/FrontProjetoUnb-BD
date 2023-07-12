<script setup>
import NavBar from "@/components/NavBar.vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
import AvaliacaoController from "@/controllers/AvaliacaoController";
import {RouterLink} from 'vue-router'
import {onMounted, reactive} from "vue";
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

  <!-- Modal toggle -->
  <button id="btnModalEdit" data-modal-target="staticModal" data-modal-toggle="staticModal" class="none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Botão Cadastro avaliação
  </button>

  <!-- Main modal -->
  <div id="staticModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <div>
            <h3 id="TituloAvaliacao" class="text-xl font-semibold text-gray-900 dark:text-white"></h3>
            <h3 id="TituloAvaliacao2" class="text-xl font-semibold text-gray-900 dark:text-white"></h3>
          </div>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Fechar modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form class="space-y-4 md:space-y-6" @submit.prevent="UpdadateAvaliacao()">
            <div class="none" id="id_avaliacao"></div>
            <div>
              <label for="st_avaliacao" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comentário</label>
              <input type="text" id="st_avaliacaoEditar" placeholder="Digite sua Avaliação" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div>
              <label for="int_estrelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estrelas</label>
              <input type="number" id="int_estrelasEditar" placeholder="Digite de um a 5 sua avaliação" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flexBtn">
              <button data-modal-hide="staticModal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Atualizar Dados</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
            <div class="flexAvaliacao">
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
                <div @click="EditarAvaliacao(turma.int_estrelas,turma.st_avaliacao, turma.id_avaliacao,turma.st_turma,turma.st_nomeDisciplina)">
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
        </div>
      </div>
    </div>
  </div>

</template>