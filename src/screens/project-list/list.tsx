import React from "react";
import { User } from "types/user";
import { Project } from "types/project";
import { Dropdown, Modal, Table, TableProps } from "antd";
import type { MenuProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router";
import { Pin } from "components/pin";
import {
  useDeleteProject,
  useEditProject,
  useProjectModel,
} from "hooks/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectQueryKey } from "./project-utils";
//TODO react-router和react-router-dom的关系
/**
 * 1. 类似于 react 和 react-dom/react-native/react-vr...
 * react 核心库： 处理虚拟计算的逻辑
 * react-dom: react记过计算结果，就会被 react-dom消费
 *
 * 2. react-router: 主要管理路由状态，在内存中就是变量，对象。计算此时此刻的路由树是什么样的
 * react-router-dom: 使用 react-router 计算结果，渲染路由树
 *
 */
interface ListProps extends TableProps<Project> {
  users: User[];
}

// React.memo 为高阶组件。默认情况下其只会对复杂对象做浅层对比.
/*
如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。
 */
export const List = React.memo(({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const { mutate: deleteMutate } = useDeleteProject(useProjectQueryKey());
  // 2. 方式二
  //   const pinProject = (id:number, pin: boolean) => mutate({id, pin})
  // 3. 方式三： 注意，id 已经确定， pin 是点击后确定   柯里化改造函数
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  const { startEdit } = useProjectModel();
  const editProject = (id: number) => startEdit(id);

  const itemOnClick =
    ({ record }: { record: Project }) =>
    ({ key }: { key: string }) => {
      if (key === String(1)) {
        editProject(record.id);
      } else {
        Modal.confirm({
          title: "确定删除这个项目吗?",
          okText: "确定",
          onOk() {
            deleteMutate(record);
          },
        });
      }
    };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <ButtonNoPadding type={"link"}>编辑</ButtonNoPadding>,
    },
    {
      key: "2",
      label: <ButtonNoPadding type={"link"}>删除</ButtonNoPadding>,
    },
  ];

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, record, index) {
            return (
              <Pin
                checked={record.pin}
                // 1. 方式一
                // onCheckedChange={pin => mutate({...record, pin})}
                // 2. 方式二
                // onCheckedChange={pin => pinProject(record.id, pin)}
                // 3. 方式三
                onCheckedChange={pinProject(record.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, record, index) {
            return <Link to={`${record.id}`}>{record.name}</Link>;
          },
        },
        { title: "部门", dataIndex: "organization" },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, record, index) {
            return (
              <span>
                {record.created
                  ? dayjs(record.created).format("YYYY/MM/DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          title: "操作",
          render(value, record) {
            return (
              <Dropdown menu={{ items, onClick: itemOnClick({ record }) }}>
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
});
