import { useKanbans } from "hooks/kanban";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useKanbansSearchParams, useProjectInUrl } from "./kanban-utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <KanbanContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </KanbanContainer>
    </ScreenContainer>
  );
};

const KanbanContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10;
`;
