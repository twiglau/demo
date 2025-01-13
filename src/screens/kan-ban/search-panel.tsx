import { useSetUrlSearchParam } from "hooks/useUrlQueryParam";
import { useTasksSearchParams } from "./kanban-utils";
import { Row, Input } from "antd";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row>
      <Input
        style={{ width: "20rem" }}
        placeholder={"人物名"}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
    </Row>
  );
};
