import styled from '@emotion/styled'
import { Popover, Typography, List, Divider } from 'antd'
import { useProjects } from 'hooks/project'
import {ButtonNoPadding} from './lib'
import React from 'react'
import { useDispatch } from 'react-redux'
import { projectListActions } from 'screens/project-list/project-list.slice'

export const ProjectPopover = () => {
    const dispatch = useDispatch()
    const { data: projects, isLoading } = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)

    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(proj => <List.Item>
                    <List.Item.Meta title={proj.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding type={'link'} onClick={() => dispatch(projectListActions.openModel({}))}>创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}


const ContentContainer = styled.div`
    min-width: 30rem;
`