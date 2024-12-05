import React from "react"

export const SearchPanel = ({users, param, setParam}) => {

    return <form>
        <div>
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <select value={param.parentId} onChange={evt => setParam({
                ...param,
                parentId: evt.target.value
            })}>
                {users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
            </select>
        </div>
    </form>
}