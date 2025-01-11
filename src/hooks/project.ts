import { Project } from "types/project";
import { useHttp } from "utils/http";
import { useSetUrlSearchParam, useUrlQueryParam } from "hooks/useUrlQueryParam";
import { useMutation, useQuery, QueryKey } from "@tanstack/react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./useOptimisticOptions";

// TODO: 如何使用参数
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>({
    queryKey: ["projects", param],
    queryFn: () => client("projects", { data: param }),
  });
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    ...useEditConfig<Partial<Project>>(queryKey),
  });
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    ...useAddConfig<Partial<Project>>(queryKey),
  });
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "DELETE",
      }),
    ...useDeleteConfig<Partial<Project>>(queryKey),
  });
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => client(`projects/${id}`),
    enabled: Boolean(id), // 希望id不存在时,就不用请求了
  });
};

export const useProjectModel = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId),
  );
  const setUrlParams = useSetUrlSearchParam();

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: undefined, editingProjectId: undefined });
    // setProjectCreate({ projectCreate: undefined });
    // 这样关闭不了弹框
    // setEditingProjectId({ editingProjectId: undefined });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  /**
   * 超过三个以上，返回对象
   * 元组变量命名更为方便
   */
  return {
    modalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
