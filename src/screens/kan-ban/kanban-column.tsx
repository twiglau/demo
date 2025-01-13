import styled from "@emotion/styled";
import { useTasks } from "hooks/task";
import { Kanban } from "types/kanban";
import { useTasksSearchParams } from "./kanban-utils";
import { useTaskTypes } from "hooks/task-type";
import { ReactComponent as TaskIcon } from "assets/task.svg";
import { ReactComponent as BugIcon } from "assets/bug.svg";
import { Card } from "antd";

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
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <ColumnsContainer>
      <p>{kanban.name}</p>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card key={task.id}>
            <TaskItem>
              <span>{task.name}</span>
              <TaskTypeIcon id={task.typeId} />
            </TaskItem>
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

const TaskItem = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;
