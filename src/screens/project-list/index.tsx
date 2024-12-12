import React, { useState} from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import useDebounce from 'hooks/useDebounce'
import styled from '@emotion/styled'
import { useProjects } from 'hooks/project'
import { ErrorBox } from 'components/lib'
import { useUsers } from 'hooks/user'
import { useDocumentTitle } from 'hooks/useDocumentTitle'

const initialData = {
    name: '',
    personId: ''
}

export const ProjectListScreen = () => {
    const [ param, setParam ] = useState(initialData)
    useDocumentTitle('项目列表', false)

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

const Container = styled.div`
   flex: 1;
   padding: 3.2rem;
`