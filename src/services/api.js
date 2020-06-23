import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: process.env.REACT_APP_TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
})  

API.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error)

})

export default API