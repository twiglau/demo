import { useState } from "react";
import { useKanbansQueryKey, useProjectIdInUrl } from "./kanban-utils";
import { useAddKanban } from "hooks/kanban";
import { ColumnsContainer } from "./kanban-column";
import { Input } from "antd";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <ColumnsContainer>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </ColumnsContainer>
  );
};
