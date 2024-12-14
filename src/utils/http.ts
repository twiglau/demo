import { apiUrl } from "utils";
import qs from 'qs';
import * as auth from 'context/auth-provider'
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

interface Config extends RequestInit {
    token?:string,
    data?:object
}
export const http = async (
    endpoint: string, 
    {data, token, headers, ...customConfig}: Config = {}
) => {

    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if(config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
        
        if(response.status === 401) {
            await auth.logout()
            // window.location.reload()
            return Promise.reject({message: '请重新登录'})
        }
        const data = await response.json()
        if(response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

/**
 * JS 中的 typeof,是在 runtime时运行的
 * return typeof 1 === 'number'
 * TS 中的 typeof, 是在静态环境运行的
 * 在整个 useHttp 处理请求
 * @returns 
 */
export const useHttp = () => {
    const { user } = useAuth()

    // utility type 的用法：
    // 用泛型给它传入一个其他类型，然后 utility type 对这个类型进行某种操作
    return useCallback( (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token}), [user?.token]) //useCallback()
}

// TODO: 类型别名, Utility Type 讲解
type Person = {
    name: string;
    age: number;
    height: string;
}

// 类型属性都是可选中，可以不传入
const optionalPerson: Partial<Person> = {}
// 既没有age，也没有name
const partPerson: Omit<Person, 'name'|'age'> = { height: '180cm'}
// 把对象类型的键取出来
type PersonKeys = keyof Person;
// 在原有类型中 选几个
type PersonOnlyProperty = Pick<Person, 'name' | 'age'>
const proPerson: PersonOnlyProperty = { name: '李', age: 19}
// 再把name从原来过滤掉
type OthersPerson = Exclude<PersonKeys, 'name'>;
const othPerson: OthersPerson = "age"



console.log('测试TS:', optionalPerson, partPerson, proPerson, othPerson)