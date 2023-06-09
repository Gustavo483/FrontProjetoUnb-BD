import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Authentication/login.vue'
import Profile from '../views/Authentication/profile.vue'
import Register from '../views/Authentication/register.vue'
import teste from '../views/Authentication/teste.vue'

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
  ]
})
router.beforeEach((to,from,next) => {
  localStorage.setItem('route', to.name)
  next()
})
export default router
