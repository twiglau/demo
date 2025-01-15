import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { Task } from "types/task";
import { useHttp } from "utils/http";
import { useAddConfig } from "./useOptimisticOptions";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>({
    queryKey: ["tasks", param],
    queryFn: () => client("tasks", { data: param }),
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
