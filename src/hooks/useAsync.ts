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

export const useAsync = <T>(initialState?: State<T>) => {
    const [state, setState] = useState<State<T>>({
        ...defaultInitialState,
        ...initialState
    })

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
            setError(error)
            return Promise.reject(error)
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        ...state
    }


}