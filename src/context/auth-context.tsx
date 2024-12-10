import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'types/user'
import { http } from 'utils/http';
import useMount from 'hooks/useMount';

interface AuthForm {
    username: string;
    password: string
}

// 初始化用户，防止刷新又没了，除非登出
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User|null,
    register: (form: AuthForm) => Promise<void>,
    login: (form:AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)


AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [ user, setUser ] = useState<User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => {setUser(null)})

    useMount(() => {
        bootstrapUser().then(setUser)
    })

    return <AuthContext.Provider value={{user, login, register, logout }} children={children}  />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用')
    }
    return context
}