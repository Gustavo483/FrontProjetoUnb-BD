<script setup>
import {onMounted, reactive} from "vue";
  import useAuthenticationController from "@/controllers/AuthenticationController";
  const {register,authenticationValidation, errors } = useAuthenticationController()
  onMounted(() => authenticationValidation());
  const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation:"",
  })
</script>

<template>
  <div class="ImgBackgroud">
    <div class="backgroud">
      <section class="">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-12 h-12 mr-2" src="/src/assets/img/unb.svg" alt="logo">
            Me salva
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-3 sm:p-8">
              <h1 class="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Registre-se
              </h1>
              <form class="space-y-4 md:space-y-4" @submit.prevent="register(form)">
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                  <input v-model="form.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" minlength="10">
                  <div v-if="errors.name">
                  <span class="text-sm text-red-400">
                    {{ errors.name[0]}}
                  </span>
                  </div>
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email</label>
                  <input v-model="form.email" type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  <div v-if="errors.email">
                    <span class="text-sm text-red-400">
                      {{ errors.email[0]}}
                    </span>
                  </div>
                </div>

                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                  <input v-model="form.password" type="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" minlength="8">
                    <div v-if="errors.password">
                      <span class="text-sm text-red-400">
                        {{ errors.password[0]}}
                      </span>
                    </div>
                </div>

                <div>
                  <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme sua senha</label>
                  <input v-model="form.password_confirmation" type="password" id="password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" minlength="8">
                  <div v-if="errors.password">
                    <span class="text-sm text-red-400">
                      {{ errors.password[0]}}
                    </span>
                  </div>
                </div>
                <div>
                  <button type="submit"  class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

