import { useKanbans } from "hooks/kanban";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import React from "react";
import { useKanbansSearchParams, useProjectInUrl } from "./kanban-utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <KanbanContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </KanbanContainer>
    </div>
  );
};

const KanbanContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10;
`;
