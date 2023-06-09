<script setup>
import useAuthenticationController from "@/controllers/AuthenticationController";
import {onMounted} from "vue";
import NavBar from "@/components/NavBar.vue";
const {usuarios,authenticationValidation,getUsuarios} = useAuthenticationController()
onMounted(() => {
  authenticationValidation();
  getUsuarios();
});

</script>

<template>
  <div>
    <nav-bar></nav-bar>
  </div>

  <div class="my-10">
    <table class="container w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr class="">
        <th scope="col" class="px-6 py-3">
          id
        </th>
        <th scope="col" class="px-6 py-3">
          nome
        </th>
        <th scope="col" class="px-6 py-3">
          email
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="usuario in usuarios" :key="usuario.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py-4">
          {{usuario.id}}
        </td>
        <td class="px-6 py-4">
          {{usuario.name}}
        </td>
        <td class="px-6 py-4 space-x-2">
          {{usuario.email}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>


</template>