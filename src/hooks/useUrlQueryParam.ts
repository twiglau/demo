import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        stateKeys.reduce(
          (prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || "" };
          },
          {} as { [key in K]: string },
        ),
      [searchParams, stateKeys],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // TODO 为什么这里要使用 Object.fromEntries(iterable)
      // components/test-iterator.tsx
      // iterator: https://codesandbox.io/p/sandbox/strange-panka-wsdgy5
      // 可以将 URLSearchParams 对象 转变为 普通对象， 然后再将 普通对象 解构出来。
      return setSearchParam(params);
    },
  ] as const;
};

/**
 * 3. 优化获取key对象，引起的循环渲染
 * 3.1. 把依赖项初始化为 state。
 * 3.2. searchParams 内部同样原理。
 *
 * 问题： 返回的 setParam, 传入 非 keys 值时，是没有错误提示的。
 * 如何限制 setParam 传参类型。
 * 如： const [param, setParam] = useUrlQueryParam(['name', 'personId'])
 *
 * setParam({name1: 'lau' })
 * 并没有提示报错
 *
 * 需要限制传参类型
 * 传入一个 对象，key 是 限制范围内的，value 是任何类型。
 */
export const useUrlQueryParamOld2 = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        stateKeys.reduce(
          (prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || "" };
          },
          {} as { [key in K]: string },
        ),
      [searchParams, stateKeys],
    ),
    setSearchParam,
  ] as const;
};

/**
 * 2. 改造返回值类型
 * 问题： 引起循环渲染，每次调用返回一个新的值
 * 解决： useMemo
 * 返回一个 memorized 值。
 *
 * 把 “创建” 函数和依赖项作为参数传入 useMemo, 它仅会在某个依赖项改变时，
 * 才重新计算 memoized 值，这种优化有助于避免在每次渲染时都进行高开销的计算。
 *
 * 记住， 传入 useMemo 的函数会在渲染期间执行。 请不要在这个函数内部执行与渲染无关的操作。
 * 诸如副作用这类的操作 =》 属于 useEffect 的使用范畴，而不是 useMemo
 *
 * 如果没有提供依赖项数组， useMemo 在每次渲染时都会计算新的值。
 *
 * 你可以把 useMemo 作为性能优化的手段， 但不要把它当成语义上的保证。
 */
export const useUrlQueryParamOld1 = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    keys.reduce(
      (prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      },
      {} as { [key in K]: string },
    ),
    setSearchParam,
  ] as const;
};

/**
 * 1. 返回页面中， 指定键的参数值， 获取 url 中的参数
 *
 *
 * params 类型为：
 * Type '{ [x: string]: string; }'
 * 当对 SearchPanel 赋值时，提示错误：
 * is missing the following properties from type '{ name: string; personId: string; }': name, personId
 *
 * 问题： 如何实现同过传入key数组，返回的是 以key为键 的 对象呢？
 */
export const useUrlQueryParamOld = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    keys.reduce(
      (prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      },
      {} as { [key in string]: string },
    ),
    setSearchParam,
  ] as const;
};

/**
 * as const 的作用？
 * 
 * 1. 如果没有转化为 as const, 函数的返回类型为：
    const useUrlQueryParam: (keys: string()) => {}[]
    当调用 该函数时，setSearchParam 就没有类型了。
 * 2. 解释：
 * 2.1 示例中：
 * const testA: (string | number | {
        gender: string;
    })[]
 * 这是因为在 TypeScript 中， 认为数组中每个元素的类型应该是一样的。
 * 那么，如何把数组中的每个类型推断为一样的，就会推断为：
 * 数组中类型为 字符串 或 数字 或 对象。
 * 
 * 3. 如何让 testA 对象保持最为原始的类型: 添加为 as const, 就保持
 * 为原始类型
 * const testA: readonly ["jack", 12, {
        readonly gender: "male";
    }]
 */

const testA = ["jack", 12, { gender: "male" }] as const;
console.log("testA:", testA);
