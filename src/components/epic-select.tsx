import { IdSelect } from "components/id-select";
import { useEpics } from "hooks/epic";

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: epics } = useEpics();
  return <IdSelect options={epics || []} {...props} />;
};
