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
     *  1. 当data中某个item更新时，如何主动重新触发请求，
     * 这就需要保存触发更新函数
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
     * 2. 改造run函数,这样一种写法，并不能保存Promise最原始状态，只是存储了promise执行后的值。
     * setRetry(() => () => {
     *    run(promise)
     * })
     */
    const run = async (promise: Promise<T>, runConfig?: {retry: () => Promise<T>}) => {
        if(!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        
        setRetry(() => () => {
            if(runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        setState({...state, stat: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
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
        retry,
        ...state
    }


}