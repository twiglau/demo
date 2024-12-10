import React, { useState, useEffect} from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject } from 'utils'
import useMount from 'hooks/useMount'
import useDebounce from 'hooks/useDebounce'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'


const initialData = {
    name: '',
    personId: ''
}

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [ param, setParam ] = useState(initialData)
    const client = useHttp()

    const debounceParam = useDebounce(param, 2000)

    const [list, setList ] = useState([])

    useEffect(() => {
        client('projects', { data: cleanObject(debounceParam)}).then(setList)
        //TODO 1
        // eslint-disable-next-line
    }, [debounceParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </Container>
}

const Container = styled.div`
   flex: 1;
   padding: 3.2rem;
`