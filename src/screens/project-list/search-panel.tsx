

import { Form, Input, Select } from "antd";
import React from "react"
import { User } from 'types/user'

interface SearchPanelProps {
    users: User[],
    param: {
        name: string;
        personId: string;
    },
    setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {

    return <Form style={{marginBottom: '2rem'}} layout={'inline'}>
        <Form.Item>
            <Input type="text" placeholder={'项目名'} value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>负责人</Select.Option>
                {users.map(user => <Select.Option value={String(user.id)} key={user.id}>{user.name}</Select.Option>)}
            </Select>
        </Form.Item>
    </Form>
}