import axios from 'axios'       

const api = axios.create({
    baseURL: "http://138.204.201.42:8080/arribadeskserver"
})

export default api