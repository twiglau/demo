import styled from "@emotion/styled";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/use-select";
import { useAddProject, useEditProject, useProjectModel } from "hooks/project";
import { useEffect } from "react";
import { useProjectQueryKey } from "./project-utils";

export const ProjectModal = () => {
  const { modalOpen, close, editingProject, isLoading } = useProjectModel();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isPending: mutatePending,
  } = useMutateProject(useProjectQueryKey());

  const title = editingProject ? "编辑项目" : "创建项目";
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const onFinish = (values: FormData) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  const closeModal = () => {
    form.resetFields();
    close();
  };
  // forceRender: 不管显式或隐藏。都强制渲染
  return (
    <Drawer
      onClose={closeModal}
      open={modalOpen}
      width={"100%"}
      forceRender={true}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                label={"名称"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input type="text" id="name" placeholder={"请输入项目名"} />
              </Form.Item>
              <Form.Item
                name="organization"
                label={"部门名"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input
                  type="text"
                  id="organization"
                  placeholder={"请输入部门名"}
                />
              </Form.Item>
              <Form.Item
                name="personId"
                label={"负责人"}
                rules={[{ required: true, message: "请输入负责人名" }]}
              >
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={mutatePending}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
`;
