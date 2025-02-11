import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import DailyProgress from './components/DailyProgress.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/daily-progress',
    name: 'DailyProgress',
    component: DailyProgress
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
