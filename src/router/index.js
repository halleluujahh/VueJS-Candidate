import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Misa Recruitment',
      component: () => import('@/views/candidate/Index.vue'),
    },
  ],
})

export default router
