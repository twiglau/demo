import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router";
import { KanbanScreen } from "screens/kan-ban";
import { EpicScreen } from "screens/epic";
import styled from "@emotion/styled";
import { Menu } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};
export const ProjectScreen = () => {
  const selectKey = useRouteType();
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`../${e.key}`);
  };
  const items: MenuItem[] = [
    {
      key: "kanban",
      label: "看板",
    },
    {
      key: "epic",
      label: "任务组",
    },
  ];
  return (
    <Container>
      <Aside>
        <Menu
          mode={"inline"}
          onClick={onClick}
          selectedKeys={[selectKey]}
          items={items}
        />
      </Aside>
      <Main>
        <Routes>
          <Route path="*" element={<Navigate to="kanban" />} />
          {/* 使用 '/kanban', '/epic' 为什么路由匹配不到想要的： projects/3/kanban */}
          {/* /kanban 的意思是使用了 根路由，需要把 / 去掉 */}
          {/* projects/:projectId/kanban */}
          <Route path={"kanban"} element={<KanbanScreen />} />
          {/* projects/:projectId/epic */}
          <Route path={"epic"} element={<EpicScreen />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  overflow: hidden;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
