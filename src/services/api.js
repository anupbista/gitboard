import axios from 'axios'
import history from './history';

const API = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: process.env.TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
})  

API.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!error.response) {
        return Promise.reject('Network Error')
    } else {
        const status = error.response.status;
        if(status === 401){
            history.push('/')
            return Promise.reject(error.response)
        }else{
            return Promise.reject(error.response)
        }
    }

})

export default API