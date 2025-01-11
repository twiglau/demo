import { useQuery } from "@tanstack/react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "utils/http";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>({
    queryKey: ["taskTypes"],
    queryFn: () => client("taskTypes"),
  });
};
