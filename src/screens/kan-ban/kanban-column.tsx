import styled from "@emotion/styled";
import { useTaskModel, useTasks } from "hooks/task";
import { Kanban } from "types/kanban";
import { useKanbansQueryKey, useTasksSearchParams } from "./kanban-utils";
import { useTaskTypes } from "hooks/task-type";
import { ReactComponent as TaskIcon } from "assets/task.svg";
import { ReactComponent as BugIcon } from "assets/bug.svg";
import { Button, Card, Dropdown, MenuProps, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { Row } from "components/lib";
import { useDeleteKanban } from "hooks/kanban";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((type) => type.id === id)?.name;
  if (!name) return null;
  return name === "task" ? (
    <TaskIcon color={"rgb(38, 132, 255)"} width={"1.8rem"} height={"1.8rem"} />
  ) : (
    <BugIcon color={"red"} width={"2rem"} height={"2rem"} />
  );
};
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModel();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card onClick={() => startEdit(task.id)} style={{ cursor: "pointer" }}>
      <TaskItem>
        <Mark name={task.name} keyword={keyword} />
        <TaskTypeIcon id={task.typeId} />
      </TaskItem>
    </Card>
  );
};
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <ColumnsContainer>
      <Row between={true}>
        <p>{kanban.name}</p>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => <TaskCard task={task} key={task.id} />)}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </ColumnsContainer>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      title: "确认删除该看板吗?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        return mutateAsync({ id: kanban.id });
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const ColumnsContainer = styled.div`
  min-width: 27rem;
  border-radius: 1rem;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0.7rem 0.7rem 2rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TaskItem = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;
