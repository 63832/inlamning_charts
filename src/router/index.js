import { createRouter, createWebHistory } from 'vue-router'
import BetygView from '@/views/BetygView.vue'
import TempView from '@/views/TempView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Betyg',
      name: 'home',
      component: BetygView,
    },
    {
      path: '/Temp',
      name: 'temp',
      component: TempView,
    },
  ],
})

export default router
