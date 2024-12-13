import React, { Component, useState} from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import useDebounce from 'hooks/useDebounce'
import styled from '@emotion/styled'
import { useProjects } from 'hooks/project'
import { ErrorBox } from 'components/lib'
import { useUsers } from 'hooks/user'
import { useDocumentTitle } from 'hooks/useDocumentTitle'
import { useProjectsSearchParams } from './project-utils'

const initialData = {
    name: '',
    personId: ''
}

export const ProjectListScreen = () => {
    // const [, setParam ] = useState(initialData)
    useDocumentTitle('项目列表', false)

   
    const [param, setParam] = useProjectsSearchParams()
    const debounceParam = useDebounce(param, 2000)
    
    const { isLoading, error, data: list } = useProjects(debounceParam)
    const { data: users } = useUsers()

    const defaultValue = 1



    return <Container>
        <h1>项目列表</h1>
        <select value={defaultValue} onChange={evt => {
            const value = evt.target.value
            console.log('value:', value, '类型：', typeof value)
        }}>
            <option value={0}>默认选项</option>
            <option value={1}>选项一</option>
        </select>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

ProjectListScreen.whyDidYouRender = false
//相当于
// class Test extends Component<any,any> {
//     static whyDidYouRender = true
// }


const Container = styled.div`
   flex: 1;
   padding: 3.2rem;
`