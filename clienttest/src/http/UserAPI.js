import { guestInstance, authInstance } from './index.js'
import jwtDecode from 'jwt-decode'

export const signup = async (email, password) => {
    try {
        const response = await guestInstance.post('user/signup', {email, password, role: 'USER'})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

export const login = async (email, password) => {
    try {
        const response = await guestInstance.post('user/login', {email, password})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const check = async () => {
    let userToken, userData
    try {
        userToken = localStorage.getItem('token')
        // если в хранилище нет действительного токена
        if (!userToken) {
            return false
        }
        // токен есть, надо проверить его подлинность
        const response = await authInstance.get('user/check')
        userToken = response.data.token
        userData = jwtDecode(userToken)
        localStorage.setItem('token', userToken)
        return userData
    } catch(e) {
        localStorage.removeItem('token')
        return false
    }
}

export const fetchUsers = async () => {
    const { data } = await authInstance.get('user/getall')
    return data
}

export const deleteUser = async (id) => {
    const { data } = await authInstance.delete(`user/delete/${id}`)
    return data
}

export const createUser = async (user) => {
    const { data } = await authInstance.post('user/create', user)
    return data
}

export const fetchUser = async (id) => {
    const { data } = await authInstance.get(`user/getone/${id}`)
    return data
}

export const updateUser = async (id, user) => {
    const { data } = await authInstance.put(`user/update/${id}`, user)
    return data
}
