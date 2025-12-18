import { createRouter, createWebHistory } from 'vue-router'
import RecruitmentView from '../views/candidate/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Misa Recruitment',
      component: RecruitmentView,
    },
  ],
})

export default router
