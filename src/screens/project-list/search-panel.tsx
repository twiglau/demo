

import { Form, Input, Select } from "antd";
import { UserSelect } from "components/use-select";
import React from "react"
import { Project } from "types/project";
import { User } from 'types/user'

interface SearchPanelProps {
    users: User[],
    param: Partial<Pick<Project, 'name'|'personId'>>,
    // param: {
    //     name: string;
    //     personId: string;
    // },
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
            <UserSelect 
            defaultOptionName="负责人"
            value={param.personId} 
            onChange={value => setParam({
                ...param,
                personId: value
            })} />
        </Form.Item>
    </Form>
}