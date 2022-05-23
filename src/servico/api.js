import axios from 'axios'       

const api = axios.create({
    baseURL: "http://2d16-2804-56c-d707-6f00-5ca8-a227-1c2b-2f56.ngrok.io"
})

export default api