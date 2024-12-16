import { Project } from "types/project";
import { useHttp } from "utils/http";
import { useSetUrlSearchParam, useUrlQueryParam } from "hooks/useUrlQueryParam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// TODO: 如何使用参数
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>({
    queryKey: ["projects", param],
    queryFn: () => client("projects", { data: param }),
  });
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      }),
  });
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "POST",
        data: params,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      }),
  });
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery({
    queryKey: ["project", id],
    queryFn: () => client(`projects/${id}`),
    enabled: Boolean(id),
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
    setUrlParams({ projectCreate: "", editingProjectId: "" });
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
