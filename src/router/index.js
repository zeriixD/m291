import { createRouter, createWebHistory } from 'vue-router'
import LPView from '/src/views/LPView.vue'
import CoachView from '/src/views/CoachView.vue'
import SignupView from '/src/views/SignupView.vue'

const routes = [
  { path: '/', component: SignupView },
  { path: '/lp', component: LPView },
  { path: '/coach', component: CoachView },
]

// const currentPath = ref(window.location.hash)

// window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })

// const currentView = computed(() => {
//   return routes[currentPath.value.slice(1) || '/']
// })

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router