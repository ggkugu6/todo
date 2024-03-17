import axios from 'axios'



const $authost = axios.create({
    baseURL: 'http://localhost:8080/'
    
})

const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authost.interceptors.request.use(authInterceptor)
export {
  
    $authost
}