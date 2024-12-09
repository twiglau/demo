import React, { useState } from "react"
import { RegisterScreen } from "./register"
import { LoginScreen } from "./login"

export const UnauthenticatedApp = () => {
    const [ isRegister, setIsRegister ] = useState(false)

    return <div>
        { isRegister ? <RegisterScreen /> : <LoginScreen />}
        <button onClick={e => setIsRegister(!isRegister)}>切换到{isRegister ? '注册': '登录' }</button>
    </div>
}