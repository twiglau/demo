import { useCallback, useState } from "react";
import { useMountedRef } from "./useMountedRef";

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

/**
 * 
 * 如何避免调用 run 时，进入循环调用
 * useEffect(() => {
    run(fetchProjects(), {
        retry: fetchProjects
    })
}, [param, run])

 useMemo 和 useCallback 都是为了依赖，而存在的。
 具体就是，非基本类型依赖
 如果我们定义了 非基本类型依赖，就需要使用 useMemo, useCallback 把这个依赖 限制框住
 例如：
 useEffect(() => {
    run(fetchProjects(), {
        retry: fetchProjects
    })
}, [param, run, fetchProjects])

run, fetchProjects 函数需要用 useCallback 限制住
 */
export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}
    const [state, setState] = useState<State<T>>({
        ...defaultInitialState,
        ...initialState
    })

    /**
     * 阻止页面卸载时，进行赋值操作
     */
    const mountedRef = useMountedRef()
    
    const [retry, setRetry] = useState(() => () => {})

    const setData = useCallback((data: T) => setState({
        data,
        stat: 'success',
        error:null
    }), [])
    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])

    /**
     * 2. useCallback 缓存函数
     */
    const run = useCallback(async (promise: Promise<T>, runConfig?: {retry: () => Promise<T>}) => {
        if(!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        
        setRetry(() => () => {
            if(runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        // 1. 方案一
        // setState({...state, stat: 'loading'})
        // 2. 方案二：不依赖state: 解决循环依赖，调用
        setState(prevState => ({...prevState, stat: 'loading'}))

        return promise.then(data => {
            if(mountedRef.current) setData(data)
            return data
        }).catch(error => {
            if(mountedRef.current) setError(error)
            if(config.throwOnError)  return Promise.reject(error)
            return error
        })
    }, [ config.throwOnError, mountedRef, setData, setError]) // state

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