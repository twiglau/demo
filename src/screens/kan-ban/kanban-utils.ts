import { useProject } from "hooks/project";
import { useUrlQueryParam } from "hooks/useUrlQueryParam";
import { useMemo } from "react";
import { useLocation } from "react-router";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // 括号重点关照
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbansSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param],
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
