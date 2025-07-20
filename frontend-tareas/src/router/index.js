import { createRouter, createWebHistory } from 'vue-router'
import TareasView from '../views/TareasView.vue'
import NuevaTarea from '../views/NuevaTarea.vue'

const routes = [
  {
    path: '/',
    name: 'tareas',
    component: TareasView
  },
  {
    path: '/nueva',
    name: 'nueva-tarea',
    component: NuevaTarea
  },
  {
    path: '/editar/:id',
    name: 'editar-tarea',
    component: NuevaTarea,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router