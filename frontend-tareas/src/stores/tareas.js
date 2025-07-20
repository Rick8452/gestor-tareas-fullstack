import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const useTareasStore = defineStore('tareas', {
  state: () => ({
    tareas: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 5,
      total: 0
    }
  }),
  actions: {
    async fetchTareas(page = 1) {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/tareas`, {
          params: {
            page,
            limit: this.pagination.limit
          }
        })
        this.tareas = response.data.tareas
        this.pagination = {
          page,
          limit: this.pagination.limit,
          total: response.data.total
        }
      } catch (error) {
        this.error = error.response?.data?.error || 'Error al cargar tareas'
      } finally {
        this.loading = false
      }
    },

    async createTarea(tareaData) {
      try {
        const formData = new FormData()
        formData.append('titulo', tareaData.titulo)
        formData.append('descripcion', tareaData.descripcion)
        formData.append('completada', tareaData.completada)
        if (tareaData.archivo) {
          formData.append('archivo', tareaData.archivo)
        }

        await axios.post(`${API_URL}/tareas`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return true
      } catch (error) {
        throw error.response?.data?.error || 'Error al crear tarea'
      }
    },

    async updateTarea(id, tareaData) {
      try {
        await axios.put(`${API_URL}/${id}`, tareaData)
        return true
      } catch (error) {
        throw error.response?.data?.error || 'Error al actualizar tarea'
      }
    },

    async deleteTarea(id) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        return true
      } catch (error) {
        throw error.response?.data?.error || 'Error al eliminar tarea'
      }
    }
  }
})