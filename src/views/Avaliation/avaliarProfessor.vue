<script setup>
import NavBar from "@/components/NavBar.vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
import AvaliacaoController from "@/controllers/AvaliacaoController";
import {RouterLink} from 'vue-router'
import {onMounted, reactive} from "vue";
const {authenticationValidation} = useAuthenticationController()
const {getDepartamentos, departamentos, buscarProfessores, professores,avaliacoes,abrirModalAvaliacaoProfessor, CadastrarAvaliacaoProfessor} = AvaliacaoController()

onMounted(() => {
  authenticationValidation();
  getDepartamentos();
});

</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>
  <div class="container">
    <div class="text-center mt-3">
      <div class="formulario">
        <h2 class="text-3xl font-medium text-violet-900 p-5">Filtros para encontrar o projedos</h2>
        <div class="flex1 p-5">
          <div class="tamanho123">
            <label for="codDepartamento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Departamento</label>
            <select id="id_codDepartamento" class=" block w-full teste" @change="buscarProfessores()">
              <option v-for="departamento in departamentos"  :value="departamento.id_codDepartamento">{{departamento.st_nomeDepartamento}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="LinkTurmas mb-20">
      <div class="DivAvaliacao" v-for="professor in professores">
        <div class="tituloAvaliacao">
          <div>
            Professor: {{professor.st_nomeProfessor}}
          </div>
          <div class="AdicionarComentario">
            <!-- Modal toggle -->
            <button @click="abrirModalAvaliacaoProfessor(professor.st_nomeProfessor)" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div v-bind:id="professor.st_nomeProfessor" class="p-6 space-y-6 none">
          <form class="space-y-4 md:space-y-6" @submit.prevent="CadastrarAvaliacaoProfessor(professor.st_nomeProfessor)">
            <div class="none" id="id_professorAvaliacao"></div>
            <div>
              <label for="st_avaliacao" class="block mb-2 text-sm font-medium text-gray-900">Comentário</label>
              <input v-bind:id="'st_comentário'+professor.st_nomeProfessor" type="text" placeholder="Digite sua Avaliação" class="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div>
              <label for="int_estrelas" class="block mb-2 text-sm font-medium text-gray-900">Estrelas</label>
              <input v-bind:id="'int_estrelas'+professor.st_nomeProfessor" type="number" placeholder="Digite de 1 a 5 sua avaliação" class="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flexBtn">
              <button data-modal-hide="staticModal" type="submit" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800">Enviar Avaliação</button>
            </div>
          </form>
        </div>
        <div v-for="avaliacao in avaliacoes">
          <div class="p-4" v-if="avaliacao.st_nomeProfessor === professor.st_nomeProfessor && avaliacao.st_avaliacao" >
            <div class="flexAvaliacao">
              <div class="p-2">
                <img class="tamanhoImagemAvaliacao" src="/src/assets/img/img2.jpg">
              </div>
              <div class="divRelative">
                <div class="p-2">
                  {{avaliacao.st_avaliacao}}
                </div>

                <div class="divAbsolut">
                  <div class="flex" v-if="avaliacao.int_estrelas === 1">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                  </div>
                  <div class="flex" v-if="avaliacao.int_estrelas === 2">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                  </div>
                  <div class="flex" v-if="avaliacao.int_estrelas === 3">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                  </div>
                  <div class="flex" v-if="avaliacao.int_estrelas === 4">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                  </div>
                  <div class="flex" v-if="avaliacao.int_estrelas === 5">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                    <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>