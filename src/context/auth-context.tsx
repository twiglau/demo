import React, { ReactNode, useCallback } from 'react'
import * as auth from 'context/auth-provider'
import { User } from 'types/user'
import { AuthForm } from 'types'
import { http } from 'utils/http';
import useMount from 'hooks/useMount';
import { useAsync } from 'hooks/useAsync';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';

import * as authStore from 'store/auth.slice'
import { useSelector, useDispatch } from 'store'


// 初始化用户，防止刷新又没了，除非登出
export const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user
}


export const AuthProvider = ({children}:{children:ReactNode}) => {
    
    const {
        isIdle, 
        isLoading, 
        isError,
        error,
        run
    } = useAsync<User|null>()

    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()


    useMount(() => {
        run(dispatch(authStore.bootstrap()))
    })
    if(isIdle || isLoading) {
        return <FullPageLoading />
    }
    if(isError) {
        return <FullPageErrorFallback error={error} />
    }

    return <div>{children}</div>
}

export const useAuth = () => {
    // 触发派发时间 react-thunk 都是异步的
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
    // 获取state的值
    const user = useSelector(authStore.selectUser)

    return { user, login, register, logout }
}