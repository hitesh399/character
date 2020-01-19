import axios from 'axios'

const service = axios.create({
    baseURL: process.env.API_URL
})


service.defaults.headers.common['Accept'] = 'application/json';
service.defaults.headers.common['Content-Type'] = 'application/json';

service.interceptors.response.use(
    response => {
        return response.data
    }
)
window.$axios = service
