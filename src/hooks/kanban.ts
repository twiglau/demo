import { useQuery } from "@tanstack/react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "utils/http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>({
    queryKey: ["kanbans", param],
    queryFn: () => client("kanbans", { data: param }),
  });
};
