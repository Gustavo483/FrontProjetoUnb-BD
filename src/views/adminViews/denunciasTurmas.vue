<script setup>
import NavBar from "@/components/NavBar.vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
import AdminController from "@/controllers/AdminController";
import {RouterLink} from 'vue-router'
import {onMounted, reactive} from "vue";
const {authenticationValidation} = useAuthenticationController()
const {getDenuncias, denuncias, ignorarDenuncia,removerComentario,removerUsuario} = AdminController()

onMounted(() => {
  authenticationValidation();
  getDenuncias()
});

</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>
  <div v-for="denuncia in denuncias" class="shadow">
    <div class="p-4">
      <div class="cabecalho">
        Dados na turma: Disciplina: {{denuncia.id_codDisciplina}}/ Departamento: {{denuncia.st_nomeDepartamento}} /turma: {{denuncia.st_turma}} / Período letivo: {{denuncia.st_periodoLetivo}}<br>
        Responsável pelo comentário : {{denuncia.UserDenunciadoNome}} <br>
        Email: {{denuncia.UserDenunciadoEmail}} <br>
        Matrícula: {{denuncia.UserDenunciadoMatricula}}
      </div>
      <div class="flexAvaliacao">
        <div class="flex">
          <div class="p-2 ">
            <img class="tamanhoImagemAvaliacao" src="/src/assets/img/img2.jpg">
          </div>
          <div class="divRelative">
            <div class="p-2">
              {{denuncia.st_avaliacao}}
            </div>
            <div class="divAbsolut">
              <div class="flex" v-if="denuncia.int_estrelas === 1">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
              </div>
              <div class="flex" v-if="denuncia.int_estrelas === 2">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
              </div>
              <div class="flex" v-if="denuncia.int_estrelas === 3">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
              </div>
              <div class="flex" v-if="denuncia.int_estrelas === 4">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png" >
              </div>
              <div class="flex" v-if="denuncia.int_estrelas === 5">
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
      <div class="flexOptions">
        <button @click="ignorarDenuncia(denuncia.id_denuncia,'DenunciaTurma')" class="btnIgnorar">ignorar Denúncia</button>
        <button @click="removerComentario(denuncia.id_denuncia,denuncia.id_avaliacao,'DenunciaTurma')" class="btnRemoverComentario">Remover comentário</button>
        <button @click="removerUsuario(denuncia.id_denuncia,denuncia.id_avaliacao, denuncia.UserDenunciadoID,'DenunciaTurma')" class="btnRemoverAluno">Remover aluno da plataforma</button>
      </div>
    </div>
  </div>

</template>
