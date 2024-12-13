import React from 'react'
import { User } from 'types/user';
import { Project } from 'types/project'
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
//TODO react-router和react-router-dom的关系
/**
 * 1. 类似于 react 和 react-dom/react-native/react-vr...
 * react 核心库： 处理虚拟计算的逻辑
 * react-dom: react记过计算结果，就会被 react-dom消费
 * 
 * 2. react-router: 主要管理路由状态，在内存中就是变量，对象。计算此时此刻的路由树是什么样的
 * react-router-dom: 使用 react-router 计算结果，渲染路由树
 * 
 */
interface ListProps extends TableProps<Project> {
    users: User[]
}
export const List = ({users, ...props}: ListProps) => {
   return <Table 
   rowKey={"id"}
   pagination={false} 
   columns={[
    {title:'名称', dataIndex: 'name', sorter: (a,b) => a.name.localeCompare(b.name), render(value, record, index) {
        return <Link to={`${record.id   }`}>{record.name}</Link>
    }},
    {title:'部门', dataIndex: 'organization'},
    {title:'负责人',render(value,project){
        return <span>
            {users.find(user => user.id === project.personId)?.name || '未知'}
        </span>
    }},
    {title: '创建时间', render(value, record, index) {
        return <span>
            {record.created ? dayjs(record.created).format('YYYY/MM/DD'): '无'}
        </span>
    }}
    
   ]} 
   {...props}
   />
}