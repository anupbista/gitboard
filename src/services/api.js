import axios from 'axios'
import history from './history';
import { BASE_URL, TIMEOUT } from '../environments/dev.env';

const API = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
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
            localStorage.clear();
            history.push('/')
            return Promise.reject(error.response)
        }else{
            return Promise.reject(error.response)
        }
    }

})

export default API