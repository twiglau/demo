import React from 'react'
import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'

export const RegisterScreen = ({onError}:{onError:(error: Error) => void}) => {
    const { register } = useAuth()
    
    const __handleSubmit = async ({cpassword, ...params}: {cpassword:string,password:string,username:string}) => {
        try {
            if(cpassword !== params.password) {
                throw new Error('密码不一致')
            }
            await register(params)
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
        <Form.Item name={'cpassword'} rules={[{required: true, message: '请确认密码'}]}>
            <Input placeholder={'确认密码'} type='password' id={'cpassword'} />
        </Form.Item>
        <LongButton type={'primary'} htmlType={'submit'}>注册</LongButton>
    </Form>
}