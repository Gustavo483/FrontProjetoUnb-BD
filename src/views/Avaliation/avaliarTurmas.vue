<script setup>
import NavBar from "@/components/NavBar.vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
import AvaliacaoController from "@/controllers/AvaliacaoController";
import {RouterLink} from 'vue-router'
import {onMounted, reactive} from "vue";
const {authenticationValidation} = useAuthenticationController()
const {getDepartamentos,getDisciplinas, departamentos, disciplinas, buscarTurmas, turmas,idTurmas,AbrirModal, CadastrarAvaliacao} = AvaliacaoController()


onMounted(() => {
  authenticationValidation();
  getDepartamentos();
});
const form = reactive({
  id_codDisciplina:"",
  st_periodoletivo:"",
})

const formSalvarAvaliacao = reactive({
  st_avaliacao: "",
  int_estrelas: ""
})
</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>
  <div class="container">
    <div class="text-center mt-3">
      <form class="space-y-4 md:space-y-4" @submit.prevent="buscarTurmas(form)">
        <div class="formulario">
          <h2 class="text-3xl font-medium text-violet-900 p-5">Filtros para encontrar uma turma</h2>
          <div class="flex1">
            <div class="tamanho123">
              <label for="id_codDepartamento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Departamento</label>
              <select @change="getDisciplinas()" id="id_codDepartamento" class=" block w-full teste">
                <option v-for="departamento in departamentos"  :value="departamento.id_codDepartamento">{{departamento.st_nomeDepartamento}}</option>
              </select>
            </div>

            <div class="tamanho123">
              <label for="id_codDisciplina"  class="block mb-2 text-sm font-medium text-violet-900 dark:text-black">disciplinas</label>
              <select v-model="form.id_codDisciplina" class=" block w-full teste">
                <option v-for="disciplina in disciplinas"  :value="disciplina.id_codDisciplina">{{disciplina.st_nomeDisciplina}}</option>
              </select>
            </div>

            <div class="tamanho1233">
              <label for="st_periodoletivo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Periodo Letivo</label>
              <select v-model="form.st_periodoletivo" id="small" class="block w-full teste">
                <option value="2022.1">2022.1</option>
                <option value="2022.2">2022.2</option>
                <option value="2023.1">2023.1</option>
              </select>
            </div>
          </div>
          <div class="p-5">
            <button id="buscarDisciplina" type="submit"  class=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center dark:bg-violet-800">Buscar disciplinas</button>
          </div>
        </div>
      </form>
    </div>
    <!-- Modal toggle -->
    <button id="BotaoModel" data-modal-target="staticModal" data-modal-toggle="staticModal" class="none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
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
            <form class="space-y-4 md:space-y-6" @submit.prevent="CadastrarAvaliacao(formSalvarAvaliacao)">
              <div class="none" id="id_turma"></div>
              <div>
                <label for="st_avaliacao" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comentário</label>
                <input v-model="formSalvarAvaliacao.st_avaliacao" type="text" id="st_avaliacao" placeholder="Digite sua Avaliação" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
              </div>
              <div>
                <label for="int_estrelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estrelas</label>
                <input v-model="formSalvarAvaliacao.int_estrelas" type="number" id="int_estrelas" placeholder="Digite de um a 5 sua avaliação" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
              </div>
              <div class="flexBtn">
                <button data-modal-hide="staticModal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="LinkTurmas mb-20">
      <div class="DivAvaliacao" v-for="idturma in idTurmas">
        <div class="tituloAvaliacao">
          <div>
            Turma: {{idturma.id_turma}} Horario: {{idturma.st_horario}} Disciplina: {{idturma.st_nomeDisciplina}}
            Professor: {{idturma.st_nomeProfessor}}
          </div>
          <div class="AdicionarComentario">
            <!-- Modal toggle -->
            <button @click="AbrirModal(idturma.id_turma,idturma.st_nomeDisciplina,idturma.st_turma)" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div v-for="turma in turmas">
          <div class="p-4" v-if="turma.id_turma === idturma.id_turma && turma.st_avaliacao" >
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
          </div>
          <div class="p-4 text-center" v-if="turma.id_turma === idturma.id_turma && ! turma.st_avaliacao" >
            A turma ainda não tem nenhuma avaliação.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>