import styled from '@emotion/styled'
import { Popover, Typography, List, Divider } from 'antd'
import { useProjects } from 'hooks/project'
import {ButtonNoPadding} from './lib'
import React from 'react'

export const ProjectPopover = () => {

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
        <ButtonNoPadding type={'link'}>创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}


const ContentContainer = styled.div`
    min-width: 30rem;
`