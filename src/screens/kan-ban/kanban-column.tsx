import styled from "@emotion/styled";
import { useTasks } from "hooks/task";
import { Kanban } from "types/kanban";
import { useTasksSearchParams } from "./kanban-utils";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <ColumnsContainer>
      <p>{kanban.name}</p>
      {tasks?.map((task) => <div key={task.id}>{task.name}</div>)}
    </ColumnsContainer>
  );
};
const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
