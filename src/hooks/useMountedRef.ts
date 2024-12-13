import { useEffect, useRef } from "react"
/**
 * 组件挂载状态
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