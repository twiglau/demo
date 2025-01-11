import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useConfig = <T>(
  queryKey: QueryKey,
  callback: (target: T, old: T[]) => T[],
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
    onMutate: async (target: T) => {
      const perviousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: T[]) => {
        return callback(target, old);
      });
      return { perviousItems };
    },
    onError: (
      error: Error,
      newItem: T,
      context:
        | {
            perviousItems: unknown;
          }
        | undefined,
    ) => {
      queryClient.setQueryData(queryKey, context?.perviousItems);
    },
  };
};

export const useDeleteConfig = <T extends { id?: number }>(
  queryKey: QueryKey,
) =>
  useConfig<T>(
    queryKey,
    (target, old) => old.filter((item) => item.id !== target.id) || [],
  );
export const useEditConfig = <T extends { id?: number }>(queryKey: QueryKey) =>
  useConfig<T>(
    queryKey,
    (target, old) =>
      old.map((item) =>
        item.id === target.id ? { ...item, ...target } : item,
      ) || [],
  );
export const useAddConfig = <T>(queryKey: QueryKey) =>
  useConfig<T>(queryKey, (target, old) => (old ? [...old, target] : []));
