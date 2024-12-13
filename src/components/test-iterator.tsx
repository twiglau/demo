
/**
 * iterator 对象
 * 可以用 for...of 遍历循环
 * @returns 
 */

export const TestIterator = () => {
    return <div>iterator 测试</div>
}

const testA = [1, 2, 3];

const testAfunc = testA[Symbol.iterator];

const sth = testAfunc();

sth.next()
console.log(sth.next())