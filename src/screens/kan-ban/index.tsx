import { useKanbans } from "hooks/kanban";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import {
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./kanban-utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "hooks/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModel } from "./task-modal";
export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbansSearchParams(),
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban, index) => (
            <KanbanColumn key={index} kanban={kanban} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModel />
    </ScreenContainer>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
`;
