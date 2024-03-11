import { $authost } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, passsword) => {
    const {data} = await $authost.post('api/auth', {login, passsword, role:'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const loginn = async (login, passsword) => {
    const {data} = await $authost.post('api/login', {login, passsword})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    try{
        const {data} = await $authost.get('api/auth', )
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        return null
    }
} 

export const getUser = async () => {
    const {data} = await $authost.get('api/user')
    return data
}

