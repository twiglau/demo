import React, { Component, useState} from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import useDebounce from 'hooks/useDebounce'
import styled from '@emotion/styled'
import { useProjects } from 'hooks/project'
import { ErrorBox } from 'components/lib'
import { useUsers } from 'hooks/user'
import { useDocumentTitle } from 'hooks/useDocumentTitle'
import { useUrlQueryParam } from 'hooks/useUrlQueryParam'

const initialData = {
    name: '',
    personId: ''
}

export const ProjectListScreen = () => {
    // const [, setParam ] = useState(initialData)
    useDocumentTitle('项目列表', false)

    // TODO 避免循环调用 
    // https://codesandbox.io/p/sandbox/holy-monad-wsf5tv
    // 如何避免循环调用
    // 基本类型，组件状态：可以放到依赖里；
    // 非组件状态的对象：绝不可以放到依赖里；
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const debounceParam = useDebounce(param, 2000)
    
    const { isLoading, error, data: list } = useProjects(debounceParam)
    const { data: users } = useUsers()



    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

ProjectListScreen.whyDidYouRender = true
//相当于
// class Test extends Component<any,any> {
//     static whyDidYouRender = true
// }


const Container = styled.div`
   flex: 1;
   padding: 3.2rem;
`