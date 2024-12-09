
import React from "react"
import styled from "@emotion/styled"

/**
 * grid 和 flex 各自因公场景
 * 1. 要考虑，一维布局，还是二维布局
 * 一般来说，一维布局用 flex, 二维布局用 grid
 * 2. 是从内容触发还是从布局出发？
 * 从内容出发： - flex
 * 先有一组内容（数量一般不固定），然后希望均匀分布在容器，
 * 由内容自己大小决定占据的空间
 * 从布局出发：- grid
 * 先规划网格（数量一般比较固定），然后再把元素往里填充
 * @returns 
 */
export const Demo = () => {
    return <Container>
        <Header />
        <Nav />
        <Main />
        <Aside />
        <Footer />
    </Container>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem; // 从上到下 Header Main Footer
    grid-template-columns: 20rem 1fr 20rem;  // 从左到右 , 主要限制： nav main aside
    grid-template-areas: // 元素如何排列
    "header header header" // header 独占一行
    "nav main aside"  // 中间： 左-nav 中-main 右-aside
    "footer footer footer" // footer 独占一行
    ;
    height: 100vh;
    grid-gap: 10rem; // 间距
`

// grid-area 用来给 grid 子元素起名字
const Header = styled.header`grid-area: header`
const Main = styled.main`grid-area: main`
const Nav = styled.nav`grid-area: nav`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer`
