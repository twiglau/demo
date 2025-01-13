import styled from "@emotion/styled";
import { useTasks } from "hooks/task";
import { Kanban } from "types/kanban";
import { useTasksSearchParams } from "./kanban-utils";
import { useTaskTypes } from "hooks/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((type) => type.id === id)?.name;
  if (!name) return <span></span>;
  return <img src={name === "task" ? taskIcon : bugIcon} alt={name} />;
};
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <ColumnsContainer>
      <p>{kanban.name}</p>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.id} />
          </Card>
        ))}
      </TasksContainer>
    </ColumnsContainer>
  );
};
const ColumnsContainer = styled.div`
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
