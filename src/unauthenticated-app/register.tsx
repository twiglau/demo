import React from 'react'
import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'hooks/useAsync'

export const RegisterScreen = ({onError}:{onError:(error: Error) => void}) => {
    const { register } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    
    //TODO： 使用参数的方式
    const __handleSubmit = async ({cPwd, ...params}: {cPwd:string,password:string,username:string}) => {
        try {
            if(cPwd !== params.password) {
                throw new Error('密码不一致')
            }
            await run(register(params))
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
        <Form.Item name={'cPwd'} rules={[{required: true, message: '请确认密码'}]}>
            <Input placeholder={'确认密码'} type='password' id={'cPwd'} />
        </Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>注册</LongButton>
    </Form>
}