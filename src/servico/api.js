import axios from 'axios'       

const api = axios.create({
    baseURL: "http://cbdc-2804-56c-d707-6f00-4460-3307-22ec-467e.ngrok.io"
})

export default api