<script setup>
import {RouterView} from 'vue-router'
import {onMounted} from "vue";
import useAuthenticationController from "@/controllers/AuthenticationController";
const {authenticationValidation} = useAuthenticationController()
onMounted(() => authenticationValidation());
</script>

<template>
  <main class="">
    <RouterView/>
  </main>
</template>
