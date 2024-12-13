import React from "react";
import {Link} from "react-router-dom"
import {Routes, Route, Navigate} from "react-router"
import {KanbanScreen} from "screens/kan-ban"
import {EpicScreen} from "screens/epic"

export const ProjectScreen = () => {
    return <div>
        <h1>ProjectScreen</h1>
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
        <Routes>
           {/* 使用 '/kanban', '/epic' 为什么路由匹配不到想要的： projects/3/kanban */}
           {/* /kanban 的意思是使用了 根路由，需要把 / 去掉 */}
            {/* projects/:projectId/kanban */}
            <Route path={"/kanban"} element={<KanbanScreen />} />
            {/* projects/:projectId/epic */}
            <Route path={"/epic"} element={<EpicScreen />} />
            {/* 如果以上都匹配不到，默认匹配到 看板 */}
            {/* <Route path='*' element={<Navigate to="/kanban" replace={true} />} /> */}
        </Routes>
    </div>
}