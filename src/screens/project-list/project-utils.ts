
import { useUrlQueryParam } from "hooks/useUrlQueryParam"
import { useMemo } from "react"



export const useProjectsSearchParams = () => {
    // TODO 避免循环调用 
    // https://codesandbox.io/p/sandbox/holy-monad-wsf5tv
    // 如何避免循环调用
    // 基本类型，组件状态：可以放到依赖里；
    // 非组件状态的对象：绝不可以放到依赖里；

    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        // 依赖了一个 被改造的 param 
        // 必须用 useMemo 
        // 否则可能循环渲染 
        useMemo(
            () => ({...param, personId: Number(param.personId) || undefined}),
            [param]
        ),
        setParam
    ] as const
}

export const useProjectQueryKey = () => {
    const [params] = useProjectsSearchParams()

    return ['projects', params]
}