import { useCallback, useReducer, useState } from "react";
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback(
        (...args:T[]) => (mountedRef.current ? dispatch(...args) : void 0),
        [dispatch, mountedRef]
    )
}
// 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等
export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}
    
    const [ state, dispatch ] = useReducer(
        (state: State<T>,action: Partial<State<T>>) => ({...state, ...action}),
        {
            ...defaultInitialState,
            ...initialState
        }
    )

    const safeDispatch = useSafeDispatch(dispatch)
    const [retry, setRetry] = useState(() => () => {})

    const setData = useCallback((data: T) => safeDispatch({
        data,
        stat: 'success',
        error:null
    }), [safeDispatch])
    const setError = useCallback((error: Error) => safeDispatch({
        error,
        stat: 'error',
        data: null
    }), [safeDispatch])

    
    const run = useCallback(async (promise: Promise<T>, runConfig?: {retry: () => Promise<T>}) => {
        if(!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        
        setRetry(() => () => {
            if(runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })

        safeDispatch({ stat: 'loading'})

        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            if(config.throwOnError)  return Promise.reject(error)
            return error
        })
    }, [config.throwOnError, setData, setError, safeDispatch]) // state

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