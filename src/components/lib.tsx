import React from "react";
import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import type { SpinProps } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
          ? "2rem"
          : undefined};
  }
`;

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const ScreenContainer = styled.div`
  flex: 1;
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <ErrorBox error={error} />
    </FullPage>
  );
};

// TODO: 类型守卫
// 当符合 value?.message 这个条件是true的话，
// value is Error （value就是Error这个类型）
const isError = (value: any): value is Error => value?.message;
export const ErrorBox = ({ error }: { error: Error | null }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};

export const FullPageLoading = (config?: Partial<SpinProps>) => (
  <FullPage>
    <Spin size={"large"} {...config} />
  </FullPage>
);

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
