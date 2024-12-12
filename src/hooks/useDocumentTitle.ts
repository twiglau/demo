import { useEffect, useRef } from "react"
/**
 * useRef 
 * 1. 返回一个可变的 ref 对象， 其 .current 属性被初始化为传入的参数 (initialValue) 
 * 2. 返回的ref对象在 组件的真个生命周期内 保持不变
 */
export const useDocumentTitle = (title:string, keepOnUnmount: boolean = true) => {
    // 在整个生命周期中，ref保持不变
    // 相当于一个容器，从一至终保持里面内容不变
    const oldTitle = useRef(document.title).current

    console.log('render oldTitle:', oldTitle)
    
    // 页面加载时： oldTitle === 'React App'(旧title)
    // 页面加载后(useEffect)： oldTitle === 'React App' (保持不变)
    
    // 1. 设置当前页面的标题
    useEffect(() => {
        document.title = title
    }, [title])

    // 2. 当前页面销毁时，将标题重置为之前的名称
    useEffect(() => {
        return () => {
            if(!keepOnUnmount) 
                console.log('unMounted oldTitle:', oldTitle)
                // 页面卸载后，读取 oldTitle
                document.title = oldTitle
        }
    }, [keepOnUnmount, oldTitle])
}

export const useDocumentTitleOldVersion = (title:string, keepOnUnmount: boolean = true) => {
    const oldTitle = document.title
    console.log('render oldTitle:', oldTitle)
    
    // 页面加载时： oldTitle === 'React App'(旧title)
    // 页面加载后(useEffect)： oldTitle === title:string(新title) 
    
    // 1. 设置当前页面的标题
    useEffect(() => {
        document.title = title
    }, [title])

    // 2. 当前页面销毁时，将标题重置为之前的名称
    useEffect(() => {
        return () => {
            if(!keepOnUnmount) 
                console.log('unMounted oldTitle:', oldTitle)
                // 页面卸载后，如果不指定依赖，读到的就是 （旧title）
                document.title = oldTitle
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}