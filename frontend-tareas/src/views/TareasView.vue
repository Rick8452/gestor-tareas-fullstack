<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Lista de Tareas</h1>
      <router-link to="/nueva" class="btn btn-primary">
        Nueva Tarea
      </router-link>
    </div>

   
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

   
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

  
    <div v-if="tareas.length > 0">
      <TareaCard 
        v-for="tarea in tareas" 
        :key="tarea._id" 
        :tarea="tarea"
        @edit="editarTarea"
        @delete="eliminarTarea"
      />
      
   
      <nav v-if="pagination.total > pagination.limit">
        <ul class="pagination justify-content-center mt-4">
          <li class="page-item" :class="{ disabled: pagination.page === 1 }">
            <button class="page-link" @click="cambiarPagina(pagination.page - 1)">
              Anterior
            </button>
          </li>
          
          <li v-for="page in totalPaginas" :key="page" class="page-item" 
              :class="{ active: pagination.page === page }">
            <button class="page-link" @click="cambiarPagina(page)">
              {{ page }}
            </button>
          </li>
          
          <li class="page-item" :class="{ disabled: pagination.page === totalPaginas }">
            <button class="page-link" @click="cambiarPagina(pagination.page + 1)">
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>

   
    <div v-else-if="!loading" class="alert alert-info">
      No hay tareas registradas
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTareasStore } from '@/stores/tareas'
import TareaCard from '@/components/TareaCard.vue'
import Swal from 'sweetalert2'

const store = useTareasStore()
const router = useRouter()


const tareas = computed(() => store.tareas)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const pagination = computed(() => store.pagination)
const totalPaginas = computed(() => 
  Math.ceil(pagination.value.total / pagination.value.limit)
)


const cambiarPagina = (page) => {
  if (page > 0 && page <= totalPaginas.value) {
    store.fetchTareas(page)
  }
}

const editarTarea = (tarea) => {
  router.push({ name: 'editar-tarea', params: { id: tarea._id } })
}

const eliminarTarea = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!'
  })

  if (result.isConfirmed) {
    try {
      await store.deleteTarea(id)
      await store.fetchTareas(pagination.value.page)
      
      Swal.fire(
        '¡Eliminada!',
        'La tarea ha sido eliminada.',
        'success'
      )
    } catch (error) {
      Swal.fire(
        'Error',
        error.message || 'Ocurrió un error al eliminar',
        'error'
      )
    }
  }
}


onMounted(() => {
  store.fetchTareas()
})
</script>