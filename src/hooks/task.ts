import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { Task } from "types/task";
import { useHttp } from "utils/http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./useOptimisticOptions";
import { useUrlQueryParam } from "./useUrlQueryParam";
import { useCallback } from "react";
import useDebounce from "./useDebounce";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debounceParam = { ...param, name: useDebounce(param?.name, 200) };
  return useQuery<Task[]>({
    queryKey: ["tasks", debounceParam],
    queryFn: () => client("tasks", { data: debounceParam }),
  });
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Task>) =>
      client("tasks", { data: params, method: "POST" }),
    ...useAddConfig(queryKey),
  });
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "DELETE",
      }),
    ...useDeleteConfig<Partial<Task>>(queryKey),
  });
};
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    ...useEditConfig<Partial<Task>>(queryKey),
  });
};
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => client(`tasks/${id}`),
    enabled: Boolean(id), // 希望id不存在时,就不用请求了
  });
};

export const useTaskModel = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId],
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: null });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    startEdit,
    close,
    editingTask,
    isLoading,
  };
};
