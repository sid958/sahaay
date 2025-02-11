import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import DailyProgress from './components/DailyProgress.vue'
import Community from './components/Community.vue'
import Resources from './components/Resources.vue'
import ChatBuddy from './components/ChatBuddy.vue'

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
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources
  },
  {
    path: '/chat',
    name: 'ChatBuddy',
    component: ChatBuddy
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
