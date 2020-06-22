import axios from 'axios'
import history from './history';

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
    if (!error.response) {
        return Promise.reject('Network Error Occured')
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