import axios from 'axios'       

const api = axios.create({
    baseURL: "http://8595-2804-56c-c205-9100-1dd4-7e9d-4d9e-379c.ngrok.io"
})

export default api