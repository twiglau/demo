import React from 'react'
import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'hooks/useAsync'


export const LoginScreen = ( { onError }: { onError: ( error: Error ) => void } ) => {
    const { login } = useAuth()
    const { run, isLoading } = useAsync()
    
    const __handleSubmit =async (values: {username: string, password: string}) => {
        try {
            await run(login(values))
        } catch (e) {
            onError(e as Error)
        }
    }
    return <Form onFinish={__handleSubmit}>
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名'}]}>
            <Input placeholder={'用户名'} type='text' id={'username'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type='password' id={'password'} />
        </Form.Item>
        <LongButton type={'primary'} loading={isLoading} htmlType={'submit'}>登录</LongButton>
    </Form>
}