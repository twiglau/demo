import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "utils/http";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>({
    queryKey: ["kanbans", param],
    queryFn: () => client("kanbans", { data: param }),
  });
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Kanban>) =>
      client("kanbans", { data: params, method: "POST" }),
    ...useAddConfig(queryKey),
  });
};
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation({
    mutationFn: (params: Partial<Kanban>) =>
      client(`kanbans/${params.id}`, {
        method: "DELETE",
      }),
    ...useDeleteConfig<Partial<Kanban>>(queryKey),
  });
};
