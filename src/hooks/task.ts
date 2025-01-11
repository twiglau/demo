import { useQuery } from "@tanstack/react-query";
import { Task } from "types/task";
import { useHttp } from "utils/http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>({
    queryKey: ["tasks", param],
    queryFn: () => client("tasks", { data: param }),
  });
};
