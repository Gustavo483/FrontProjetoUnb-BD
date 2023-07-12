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

    <div class="LinkTurmas mb-20">
      <div class="DivAvaliacao" v-for="idturma in idTurmas">
        <div class="tituloAvaliacao">
          <div>
            Turma: {{idturma.id_turma}} Horario: {{idturma.st_horario}} Disciplina: {{idturma.st_nomeDisciplina}}
            Professor: {{idturma.st_nomeProfessor}}
          </div>
          <div class="AdicionarComentario">
            <!-- Modal toggle -->
            <button @click="AbrirModal(idturma.id_turma)" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div v-for="turma in turmas">
          <div v-bind:id="turma.id_turma" class="p-6 space-y-6 none">
            <form class="space-y-4 md:space-y-6" @submit.prevent="CadastrarAvaliacao(turma.id_turma)">
              <div class="none" id="id_turma"></div>
              <div>
                <label for="st_avaliacao" class="block mb-2 text-sm font-medium text-gray-900 ">Comentário</label>
                <input v-bind:id="'st_avaliacao'+turma.id_turma" type="text" placeholder="Digite sua Avaliação" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
              </div>
              <div>
                <label for="int_estrelas" class="block mb-2 text-sm font-medium text-gray-900 ">Estrelas</label>
                <input v-bind:id="'int_estrelas'+turma.id_turma" type="number" placeholder="Digite de um a 5 sua avaliação" class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
              </div>
              <div class="flexBtn">
                <button type="submit" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800">Enviar Avaliação</button>
              </div>
            </form>
          </div>
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