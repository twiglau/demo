import { User } from "types/user"
import { http } from 'utils/http'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: { user: User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = async (data: { username: string, password: string}) => {
    
    return http('login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data
    }).then(async res => {
        return handleUserResponse(res)
    })
}

export const register = async (data: { username: string, password: string}) => {

    return http('register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data
    }).then(async res => {
        return handleUserResponse(res)
    })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)