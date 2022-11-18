import axios from 'axios'       

const api = axios.create({
    baseURL: "http://44.211.145.96:8080/"
    //baseURL: "http://192.168.1.21:8080/"
})

export default api