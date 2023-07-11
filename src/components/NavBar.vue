<script setup>
import useAuthenticationController from "@/controllers/AuthenticationController";
const {logout,Authentication,verificarLogin} = useAuthenticationController()
import {RouterLink} from 'vue-router'
import {onMounted} from "vue";
onMounted(() => {
  verificarLogin();
});
</script>

<template>
  <header>
      <nav class=" bg-white border-violet-200 dark:bg-violet-800">
        <div class=" flex flex-wrap items-center justify-between mx-auto p-4 container">
          <a href="/" class="flex items-center">
            <img class="w-10 h-10 mr-2" src="/src/assets/img/unb.svg" alt="logo">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Me salva</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-violet-500 rounded-lg md:hidden hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-200 dark:text-violet-400 dark:hover:bg-violet-700 dark:focus:ring-violet-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-violet-100 rounded-lg bg-violet-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-violet-800 md:dark:bg-violet-800 dark:border-violet-700">
              <li>
                <RouterLink v-if="Authentication" class="block py-2 pl-3 pr-4 text-violet-800 rounded hover:bg-violet-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-violet-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/">Home</RouterLink>
              </li>
              <li>
                <RouterLink v-if="!Authentication" class="block py-2 pl-3 pr-4 text-violet-800 rounded hover:bg-violet-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-violet-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/login/0">login</RouterLink>
              </li>
              <li>
                <RouterLink v-if="Authentication" class="block py-2 pl-3 pr-4 text-violet-800 rounded hover:bg-violet-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-violet-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/ListarAvaliacoes">listar Minhas avaliações</RouterLink>
              </li>
              <li>
                <RouterLink v-if="Authentication" class="block py-2 pl-3 pr-4 text-violet-800 rounded hover:bg-violet-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-violet-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/profile/0">Profile</RouterLink>
              </li>
              <li>
                <button v-if="Authentication" @click="logout()" type="submit" class="block py-2 pl-3 pr-4 text-violet-800 rounded hover:bg-violet-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-violet-700 dark:hover:text-white md:dark:hover:bg-transparent">logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  </header>
</template>