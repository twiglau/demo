import { useForm } from "antd/es/form/Form";
import { useDeleteTask, useEditTask, useTaskModel } from "hooks/task";
import { useTasksQueryKey } from "./kanban-utils";
import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/use-select";
import { TaskTypeSelect } from "components/task-type-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export const TaskModel = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTaskModel();
  const { mutateAsync: editTaskAction, isPending: editLoading } =
    useEditTask(useTasksQueryKey());
  const { mutateAsync: deleteTaskAction } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTaskAction({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  const startDelete = () => {
    Modal.confirm({
      title: "确认删除该任务吗?",
      onOk: () => {
        return deleteTaskAction({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      confirmLoading={editLoading}
      okText={"确认"}
      cancelText={"取消"}
      onCancel={onCancel}
      onOk={onOk}
      title={"编辑任务"}
      open={!!editingTaskId}
    >
      <Form initialValues={editingTask} form={form} {...layout}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        <Button type={"primary"} size={"small"} onClick={startDelete}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
