import React from 'react'
import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'

export const LoginScreen = () => {
    const { login } = useAuth()
    
    const __handleSubmit = (values: {username: string, password: string}) => {

        login(values)
    }
    return <Form onFinish={__handleSubmit}>
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名'}]}>
            <Input placeholder={'用户名'} type='text' id={'username'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type='password' id={'password'} />
        </Form.Item>
        <LongButton type={'primary'} htmlType={'submit'}>登录</LongButton>
    </Form>
}