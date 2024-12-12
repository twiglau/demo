
import { Button } from 'antd';
import useMount from 'hooks/useMount';
import { useEffect, useState } from 'react';

/**
 * 问题： 当点击按钮，+1 多次后，
 * 为什么 
 * 1. setInerval num 输出为 0。
 * 2. 当页面卸载时， num 输入也为 0.
 * 原因：
 * react hook 与 闭包， hook 与 闭包经典的坑。
 * 1 和 2 所属代码块
 * 1 => setInterval(...)
 * 2 => return () => {...}
 * 
 * 只有在页面加载时，会执行一次。所以会形成闭包，而闭包作用域引用的num,是页面加载时num的初始值。
 * 在后续， 无论页面怎么加载渲染，num值怎样变化。闭包内num值是不会更改的。
 * 
 * 解决：如何避免以上情况
 * 1. useEffect 加入 num 依赖。 这样每当 num 发生变化， useEffect 都会充值计算一遍。
 * useEffect遇到闭包问题， 一定是先检查依赖项 是否处理正确
 */
export const Test = () => {
    const [num, setNum] = useState(0)

    const add = () => setNum(num+1)

    useMount(() => {
        setInterval(() => {
            console.log('num in setInterval:', num) // 0
        }, 1000)
    })

    useEffect(() => {
        return () => {
            console.log(num) // 0
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
          <h5>测试代码</h5>
          <Button onClick={add}>+1</Button>
          <p>当前 num值：{num}</p>
        </>
    )
}

// 2. 改造正确Test
export const TestRightDemo = () => {
    const [num, setNum] = useState(0)

    const add = () => setNum(num+1)

    useEffect(() => {
        let id = setInterval(() => {
            console.log('num in setInterval:', num) // 0
        }, 1000)
        return () => {
            clearInterval(id)
        }
    },[num])

    useEffect(() => {
        return () => {
            console.log(num) // 0
        }
    }, [num])

    return (
        <>
          <h5>测试代码</h5>
          <Button onClick={add}>+1</Button>
          <p>当前 num值：{num}</p>
        </>
    )
}

// 1. 纯函数示例
const pureFuncTest = () => {
    let num = 0
    const effect = () => {
        num += 1
        const message = `现在num值:${num}`
        return function unmount() {
            console.log(message)
        }
    }
    return effect
}

// 执行 test, 返回 effect函数
const add = pureFuncTest()
// 执行effect函数，返回引用了 message 1 的 unmount 函数
const unmount = add()
// 再次执行effect函数，返回应用了message 2 的 unmount 函数
add()
// 再次执行effect函数，返回应用了message 3 的 unmount 函数
add()
// 再次执行effect函数，返回应用了message 4 的 unmount 函数
add()
// 执行 message 1 的 unmount 函数，message 1 被定义时， num 值为 1
// 所以返回 1
unmount() // Error 按照直觉： 应该打印 4