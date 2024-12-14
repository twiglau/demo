
import React from 'react'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { ProjectListScreen } from 'screens/project-list'
import { Dropdown, Button } from 'antd'
import type {MenuProps} from 'antd'
// 可以把 svg 当做组件使用 
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { useAuth } from 'context/auth-context'
import { Test } from 'components/test-closure'
import {Navigate, Route, Routes} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import { ProjectScreen } from 'screens/projects'
import { resetRoute } from 'utils'
import { ProjectPopover } from 'components/project-popover'
import { ButtonNoPadding } from 'components/lib'

export const AuthenticatedApp = () => {
    let throwError: any = undefined
    return <Container>
        <PageHeader />
        <Main>
            {/* TODO: 测试异常 */}
            {/* {throwError.testFunc()} */}

            {/* 测试代码 */}
            {/* <Test /> */}
            <Router>
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen />} />
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}/>
                    {/* 如果以上路由没有匹配到，默认跳转到 projects 中 */}
                    <Route path='*' element={<Navigate to="/projects" replace={true} />} />
                </Routes>
            </Router>
        </Main>
    </Container>
}


const PageHeader = () => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={'link'} onClick={resetRoute}>
                     <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                </ButtonNoPadding>
                <ProjectPopover />
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}


const User = () => {
    const { user, logout } = useAuth()

    const items: MenuProps['items'] = [
        {
            key:'1',
            label: (
                <Button type={ 'link' } onClick={ logout }>
                  登出
                </Button>
            )
        }
    ]

    return (
        <Dropdown menu={{items}}>
            <Button type={'link'} onClick={e => e.preventDefault()}>
                Hi, {user?.name}
            </Button>
        </Dropdown>
    )
}

// 暂时性死区
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``