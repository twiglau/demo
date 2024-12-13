/**
 * 解决：
 * 1. 默认值为 undefined 时， 选择后的值为描述字段，不是 undefined
 * 2. 不管初始化 option value 的值为 number 或 string 类型
 * 3. 选择后的值都是 string 类型。会造成与 服务器返回类型或者赋值时的值类型不匹配。
 */

import React from 'react'
import { Select } from 'antd'
import { Raw } from 'types';

//TODO: Select 所有的props 类型都扒出来
type SelectProps = React.ComponentProps<typeof Select>;

/**
 * 1. 需要自定义 ： value, onChange, options 属性，要排除掉
 * 2. 新增 defaultOptionName 属性
 */
interface IdSelectProps extends Omit<SelectProps, 'value'|'onChange'|'options'> {
    value?: Raw;
    onChange?:(value?:number) => void;
    //默认选项
    defaultOptionName?:string;
    options?: {name: string; id: number}[];
}


/**
 * 1. value 可以传入多种类型的值
 * 2  onChange 只会回调 number|undefined 类型
 * 3  当 isNaN(Number(value)) 为 true的时候， 代表选择默认类型
 * 4  当选择默认类型的时候， onChange会回调 undefined
 * @param props 
 * @returns 
 */
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return (
        <Select 
          value={ options?.length ? toNumber(value) : 0 }
          onChange={(value) => onChange?.(toNumber(value) || undefined)}
          // 可以穿透属性
          {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ):null}
            
            {options?.map(option => (
                <Select.Option 
                key={option.id} 
                value={option.id}>
                    {option.name}
                </Select.Option>))}
        </Select>
    )
}


const toNumber = (value: unknown) => ( isNaN(Number(value)) ? 0 : Number(value) )