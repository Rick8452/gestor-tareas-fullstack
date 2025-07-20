import { required, helpers } from '@vuelidate/validators'

export const tareaRules = {
  titulo: {
    required: helpers.withMessage('El título es obligatorio', required)
  },
  descripcion: {},
  completada: {},
  archivo: {}
}