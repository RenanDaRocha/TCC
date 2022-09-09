import axios from 'axios'       

const api = axios.create({
    baseURL: "http://192.168.1.27:8090"
})

export default api