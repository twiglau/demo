import React, { FormEvent } from 'react'
import { apiUrl } from 'utils'

export const LoginScreen = () => {
    const __login = (param: { username: string, password: string}) => {

        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }).then(async res => {
            if(res.ok) {}
        })
    }
    const __handleSubmit = (evt: FormEvent<HTMLFormElement>) => {

        evt.preventDefault()
        const username = (evt.currentTarget.elements[0] as HTMLFormElement).value
        const password = (evt.currentTarget.elements[1] as HTMLFormElement).value
        __login({username, password})
    }
    return <form onSubmit={__handleSubmit}>
        <div>
            <label htmlFor='username'>用户名</label>
            <input type='text' id={'username'} />
        </div>
        <div>
            <label htmlFor='password'>密码</label>
            <input type='password' id={'password'} />
        </div>
        <button type={'submit'}>登录</button>
    </form>
}