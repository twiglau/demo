import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";
import { Epic } from "types/epic";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>({
    queryKey: ["epics", param],
    queryFn: () => client("epics", { data: param }),
  });
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Epic>) =>
      client(`epics`, { data: params, method: "POST" }),
    ...useAddConfig(queryKey),
  });
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Epic>) =>
      client(`epics/${params.id}`, {
        method: "DELETE",
      }),
    ...useDeleteConfig<Partial<Epic>>(queryKey),
  });
};
