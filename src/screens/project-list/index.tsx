import React, { useState, useEffect} from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import qs from 'qs'
import { cleanObject, apiUrl } from 'utils'
import useMount from 'hooks/useMount'
import useDebounce from 'hooks/useDebounce'



export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [ param, setParam ] = useState({
        name: '',
        personId: ''
    })

    const debounceParam = useDebounce(param, 2000)

    const [list, setList ] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
            if(res.ok) {
                setList(await res.json())
            }
        })
    }, [debounceParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async res => {
            if(res.ok) {
                setUsers(await res.json())
            }
        })
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}