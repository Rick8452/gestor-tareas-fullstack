<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title" :class="{ 'text-decoration-line-through': tarea.completada }">
          {{ tarea.titulo }}
        </h5>
        <span class="badge" :class="tarea.completada ? 'bg-success' : 'bg-warning'">
          {{ tarea.completada ? 'Completada' : 'Pendiente' }}
        </span>
      </div>
      
      <p class="card-text">{{ tarea.descripcion }}</p>
      
      <div v-if="tarea.archivo" class="mb-2">
        <a :href="`http://localhost:3000/uploads/${tarea.archivo}`" 
           target="_blank" 
           class="btn btn-sm btn-outline-primary">
          Ver archivo adjunto
        </a>
      </div>
      
      <div class="d-flex justify-content-between">
        <small class="text-muted">
          {{ new Date(tarea.fechaCreacion).toLocaleDateString() }}
        </small>
        <div>
          <button @click="$emit('edit', tarea)" class="btn btn-sm btn-outline-secondary me-2">
            Editar
          </button>
          <button @click="$emit('delete', tarea._id)" class="btn btn-sm btn-outline-danger">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tarea: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>