import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'autorizacion': '123456' 
  }
})


instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data.error || 'Error en la solicitud')
    }
    return Promise.reject('Error de conexión')
  }
)

export default instance