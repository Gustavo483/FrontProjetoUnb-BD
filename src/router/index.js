import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Authentication/login.vue'
import Profile from '../views/Authentication/profile.vue'
import Register from '../views/Authentication/register.vue'
import teste from '../views/Authentication/teste.vue'
import avaliarTurmas from '../views/Avaliation/avaliarTurmas.vue'
import listarAvaliacoes from '../views/Avaliation/listarAvaliacoes.vue'
import listarAvaliacoesProfessores from '../views/Avaliation/listarAvaliacoesProfessores.vue'
import avaliarProfessor from '../views/Avaliation/avaliarProfessor.vue'
import denunciasTurmas from '../views/adminViews/denunciasTurmas.vue'
import denunciasProfessores from '../views/adminViews/denunciasProfessores.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login/:blFeed',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile/:blFeed',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
      path: '/teste',
      name: 'teste',
      component: teste
    },
    {
      path: '/avaliarTurmas',
      name: 'avaliarTurmas',
      component: avaliarTurmas
    },
    {
      path: '/listarAvaliacoes',
      name: 'listarAvaliacoes',
      component: listarAvaliacoes
    },
    {
      path: '/avaliarProfessor',
      name: 'avaliarProfessor',
      component: avaliarProfessor
    },
    {
      path: '/listarAvaliacoesProfessores',
      name: 'listarAvaliacoesProfessores',
      component: listarAvaliacoesProfessores
    },
    {
      path: '/denunciasTurmas',
      name: 'denunciasTurmas',
      component: denunciasTurmas
    },
    {
      path: '/denunciasProfessores',
      name: 'denunciasProfessores',
      component: denunciasProfessores
    }
  ]
})
router.beforeEach((to,from,next) => {
  localStorage.setItem('route', to.name)
  next()
})
export default router
