import React, { Component, useState} from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import useDebounce from 'hooks/useDebounce'
import styled from '@emotion/styled'
import { useProjects } from 'hooks/project'
import { ErrorBox, Row, ButtonNoPadding } from 'components/lib'
import { useUsers } from 'hooks/user'
import { useDocumentTitle } from 'hooks/useDocumentTitle'
import { useProjectsSearchParams } from './project-utils'
import {Button } from 'antd'
import { useDispatch } from 'store'
import { projectListActions } from './project-list.slice'

const initialData = {
    name: '',
    personId: ''
}

export const ProjectListScreen = () => {
    // const [, setParam ] = useState(initialData)
    useDocumentTitle('项目列表', false)
    const dispatch = useDispatch()
   
    const [param, setParam] = useProjectsSearchParams()
    const debounceParam = useDebounce(param, 2000)
    
    const { isLoading, error, data: list, retry } = useProjects(debounceParam)
    const { data: users } = useUsers()

    const defaultValue = 1



    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <ButtonNoPadding 
            type={'link'} 
            onClick={() => dispatch(projectListActions.openModel({}))}
            >创建项目</ButtonNoPadding>
        </Row>
        <select value={defaultValue} onChange={evt => {
            const value = evt.target.value
            console.log('value:', value, '类型：', typeof value)
        }}>
            <option value={0}>默认选项</option>
            <option value={1}>选项一</option>
        </select>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
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