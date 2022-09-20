import axios from 'axios'       

const api = axios.create({
    //baseURL: "http://ec2-44-210-125-72.compute-1.amazonaws.com:8080/"
    baseURL: "http://192.168.1.24:8080/"
})

export default api