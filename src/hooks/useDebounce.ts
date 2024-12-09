import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay?:number):T {
    const [ debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // 每次在value变化后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次在上一个 useEffect 处理完后，再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

// export const debounce = (func:() => void, delay?:number) => {
//     let timeout:any;
//     return (...args) => {
//         if(timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(function() {
//             func(...args)
//         }, delay)
//     }
// }