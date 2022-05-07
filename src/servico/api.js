import axios from 'axios'       

const api = axios.create({
    baseURL: "http://17fb-2804-56c-c205-9100-4460-3307-22ec-467e.ngrok.io"
})

export default api