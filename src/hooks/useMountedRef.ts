import { useEffect, useRef } from "react"
/**
 * 组件挂载状态
 * 案例： 页面在请求接口时，这个页面就销毁了。一旦接口请求成功，尝试给已经销毁的变量赋值，引起错误
 * react-dom.development.js:86 Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: SideEffect(NullComponent)
 * @returns 
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false)
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })

    return mountedRef
}