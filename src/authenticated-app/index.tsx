
import React from 'react'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { ProjectListScreen } from 'screens/project-list'
import { Button, Dropdown } from 'antd'
// 可以把 svg 当做组件使用 
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { useAuth } from 'context/auth-context'

export const AuthenticatedApp = () => {
    
    return <Container>
        <PageHeader />
        <Main></Main>
        <ProjectListScreen />
    </Container>
}


const PageHeader = () => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <Button type={'link'}>
                     <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                </Button>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { user, logout } = useAuth()
    return (
        <Dropdown>
            <Button >
                Hi, {user?.name}
            </Button>
        </Dropdown>
    )
}
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