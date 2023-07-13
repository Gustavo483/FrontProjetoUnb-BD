<script setup>
import NavBar from "@/components/NavBar.vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
import AdminController from "@/controllers/AdminController";
import {onMounted} from "vue";
const {authenticationValidation} = useAuthenticationController()
const {getDenunciasProfessor, denunciasProfessor, ignorarDenuncia, removerComentario, removerUsuario} = AdminController()

onMounted(() => {
  authenticationValidation();
  getDenunciasProfessor()
});

</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>
  <div v-for="denuncia in denunciasProfessor" class="shadow">
    <div class="p-4">
      <div class="cabecalho">
        Nome do professor: {{ denuncia.st_nomeProfessor }} / departamento: {{ denuncia.st_nomeDepartamento }}<br>
        Responsável pelo comentário : {{ denuncia.UserDenunciadoNome }} <br>
        Email: {{ denuncia.UserDenunciadoEmail }} <br>
        Matrícula: {{ denuncia.UserDenunciadoMatricula }}
      </div>
      <div class="flexAvaliacao">
        <div class="flex">
          <div class="p-2 ">
            <img class="tamanhoImagemAvaliacao" src="/src/assets/img/img2.jpg">
          </div>
          <div class="divRelative">
            <div class="p-2">
              {{ denuncia.st_avaliacao }}
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
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
              </div>
              <div class="flex" v-if="denuncia.int_estrelas === 4">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
              </div>
              <div class="flex" v-if="denuncia.int_estrelas === 5">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
                <img class="tamanhoEstrela" src="/src/assets/img/estrela.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flexOptions">
        <button @click="ignorarDenuncia(denuncia.id_denuncia,'DenunciaProfessor')" class="btnIgnorar">ignorar Denúncia
        </button>
        <button @click="removerComentario(denuncia.id_denuncia,denuncia.id_avaliacao,'DenunciaProfessor')"
                class="btnRemoverComentario">Remover comentário
        </button>
        <button
            @click="removerUsuario(denuncia.id_denuncia,denuncia.id_avaliacao, denuncia.UserDenunciadoID,'DenunciaProfessor')"
            class="btnRemoverAluno">Remover aluno da plataforma
        </button>
      </div>
    </div>
  </div>

</template>
