<script setup>
import {onMounted} from "vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
const {authenticationValidation, errors, getUsuario, usuario, updateUsuario} = useAuthenticationController()
import NavBar from "@/components/NavBar.vue";
const props = defineProps({
  blFeed:{
    required:true,
    type: String,
  }
})
onMounted(() => {
  authenticationValidation();
  getUsuario();
});

</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>
  <div class="">
    <div class="">
      <section class="">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div v-if="props.blFeed == 1" id="alert-3" class="flex p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-violet-800 dark:text-green-400 mt-20" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium">
              Alterações salvas com sucesso.
            </div>
            <button onclick="myFunction()"  type="button" class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-violet-800 dark:text-green-400 dark:hover:bg-violet-700" data-dismiss-target="#alert-3" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-3 sm:p-8">
              <h1 class="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl">
                Editar perfil
              </h1>
              <form class="space-y-4 md:space-y-4" @submit.prevent="updateUsuario(usuario.id)">
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Nome</label>
                  <input v-model="usuario.name" type="text" id="name" class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" minlength="10">
                  <div v-if="errors.name">
                  <span class="text-sm text-red-400">
                    {{ errors.name[0]}}
                  </span>
                  </div>
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Seu email</label>
                  <input v-model="usuario.email" type="text" id="email"  class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  <div v-if="errors.email">
                    <span class="text-sm text-red-400">
                      {{ errors.email[0]}}
                    </span>
                  </div>
                </div>

                <div>
                  <label for="st_curso" class="block mb-2 text-sm font-medium text-gray-900 ">Seu curso</label>
                  <input v-model="usuario.st_curso" type="text" id="st_curso"  class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  <div v-if="errors.st_curso">
                    <span class="text-sm text-red-400">
                      {{ errors.st_curso[0]}}
                    </span>
                  </div>
                </div>

                <div>
                  <label for="matricula" class="block mb-2 text-sm font-medium text-gray-900 ">Sua matrícula</label>
                  <input v-model="usuario.matricula" type="number" id="matricula"  class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  <div v-if="errors.matricula">
                    <span class="text-sm text-red-400">
                      {{ errors.matricula[0]}}
                    </span>
                  </div>
                </div>

                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Senha</label>
                  <input v-model="usuario.password" type="password" id="password" placeholder="••••••••" class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <div v-if="errors.password">
                      <span class="text-sm text-red-400">
                        {{ errors.password[0]}}
                      </span>
                  </div>
                </div>

                <div>
                  <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 ">Confirme sua senha</label>
                  <input v-model="usuario.password_confirmation" type="password" id="password_confirmation" placeholder="••••••••" class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <div v-if="errors.password">
                    <span class="text-sm text-red-400">
                      {{ errors.password[0]}}
                    </span>
                  </div>
                </div>

                <div>
                  <button type="submit"  class=" mt-5 w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800">Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>