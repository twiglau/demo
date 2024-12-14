import { useState } from "react";

interface State<T> {
    error: Error | null;
    stat: 'idle' | 'loading' | 'error' | 'success',
    data: T | null;
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}
    const [state, setState] = useState<State<T>>({
        ...defaultInitialState,
        ...initialState
    })
    /**
     * 一. useState 保存状态
     * 惰性初始 state
     * initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
     * 如果初始 state 需要通过复杂计算获得，择可以传入一个函数
     * 在函数中计算并返回初始的 state, 此函数只在初始渲染时被调用；
     * const [state, setState] = useState(() => {
     *    const initialState = someExpensiveComputation(props)
     *    return initialState
     * })
     * 1. 当传入函数时，并不会认为是需要保存这个函数，
     * 而是认为需要执行这个函数计算初始值。
     * 2. useState直接传入一个函数是 惰性初始化， 会立马执行这个初始化函数
     * 用 useState保存函数不能直接写入 () => {}
     * 
     * const [retry, setRetry] = useState(() =>{})
     * 
     * 二. useRef 不是 useState. 
     * useRef 定义的值并不是本组件的状态，只是一个普通的变量。
     * useRef 这个容器中的值改变时：
     *  callbackRef.current = () => alert('change Value')
     * 由于并不是本组件的状态，值的改变也就不会触发这个组件重新渲染。
     * https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
     */
    const [retry, setRetry] = useState(() => () => {})

    const setData = (data: T) => setState({
        data,
        stat: 'success',
        error:null
    })
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    /**
     * async 函数
     * 1. return 正常返回值 =>相当于resolve到结果
     * 2. return Promise.reject(error)相当于reject掉错误
     * 3. 当用 try...catch 时， 就能捕获的 reject 的结果了
     */
    const run = async (promise: Promise<T>) => {
        if(!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setState({...state, stat: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            // TODO：catch会消化异常，如果不主动抛出， 外面是接收不到异常的
            setError(error)
            if(config.throwOnError)  return Promise.reject(error)
            return error
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }


}