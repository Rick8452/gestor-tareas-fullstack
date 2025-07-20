<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ id ? 'Editar Tarea' : 'Nueva Tarea' }}</h1>
    
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">Título *</label>
        <input type="text" class="form-control" v-model="form.titulo"
               :class="{ 'is-invalid': v$.titulo.$error }">
        <div v-for="error in v$.titulo.$errors" :key="error.$uid" class="invalid-feedback">
          {{ error.$message }}
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" v-model="form.descripcion" rows="3"></textarea>
      </div>
      
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="form.completada">
        <label class="form-check-label">Completada</label>
      </div>
      
      <div class="mb-3">
        <label class="form-label">Archivo adjunto</label>
        <input type="file" class="form-control" @change="handleFileUpload">
        <div v-if="form.archivoNombre" class="form-text">
          Archivo seleccionado: {{ form.archivoNombre }}
        </div>
        <div v-if="tareaExistente?.archivo" class="mt-2">
          <a :href="`http://localhost:3000/uploads/${tareaExistente.archivo}`" 
             target="_blank" 
             class="btn btn-sm btn-outline-secondary">
            Ver archivo actual
          </a>
        </div>
      </div>
      
      <div class="d-flex justify-content-between">
        <router-link to="/" class="btn btn-secondary">
          Cancelar
        </router-link>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
          {{ id ? 'Actualizar' : 'Crear' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { tareaRules } from '@/validations/tareaRules'
import { useTareasStore } from '@/stores/tareas'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const store = useTareasStore()

const id = ref(route.params.id)
const loading = ref(false)
const tareaExistente = ref(null)

// Formulario
const form = reactive({
  titulo: '',
  descripcion: '',
  completada: false,
  archivo: null,
  archivoNombre: ''
})

// Validación
const rules = computed(() => tareaRules)
const v$ = useVuelidate(rules, form)

// Manejar archivo
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.archivo = file
    form.archivoNombre = file.name
  }
}

// Cargar tarea existente para edición
onMounted(async () => {
  if (id.value) {
    try {
      loading.value = true
      await store.fetchTareas()
      const tarea = store.tareas.find(t => t._id === id.value)
      
      if (tarea) {
        tareaExistente.value = tarea
        form.titulo = tarea.titulo
        form.descripcion = tarea.descripcion
        form.completada = tarea.completada
      }
    } finally {
      loading.value = false
    }
  }
})

// Enviar formulario
const submitForm = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  try {
    loading.value = true
    const tareaData = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      completada: form.completada,
      archivo: form.archivo
    }

    if (id.value) {
      await store.updateTarea(id.value, tareaData)
      Swal.fire('¡Actualizada!', 'Tarea actualizada correctamente', 'success')
    } else {
      await store.createTarea(tareaData)
      Swal.fire('¡Creada!', 'Tarea creada correctamente', 'success')
    }
    
    router.push('/')
  } catch (error) {
    Swal.fire('Error', error.message || 'Ocurrió un error', 'error')
  } finally {
    loading.value = false
  }
}
</script>