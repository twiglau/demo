import React, { useState, useEffect} from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import qs from 'qs'
import { cleanObject, apiUrl } from 'utils'
import useMount from 'hooks/useMount'
import useDebounce from 'hooks/useDebounce'
import { useHttp } from 'utils/http'



export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [ param, setParam ] = useState({
        name: '',
        personId: ''
    })
    const client = useHttp()

    const debounceParam = useDebounce(param, 2000)

    const [list, setList ] = useState([])

    useEffect(() => {
        client('projects', { data: cleanObject(debounceParam)}).then(setList)
    }, [debounceParam, client])

    useMount(() => {
        client('users',{}).then(setUsers)
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}