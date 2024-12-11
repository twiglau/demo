// TODO: 自React16起， 任何未被错误边界捕获的错误将导致整个 React 组件数被卸载。
// 错误边界， 必须要用 class 组件
// 遇到错误： 渲染备用UI方案
// https://github.com/bvaughn/react-error-boundary

import React from "react";

type FallbackRender = ( props: { error: Error|null } ) => React.ReactElement;

// props: children, fallbackRender
// {children: ReactNode, fallbackRender: FallbackRender} = React.PropsWithChildren<{ fallbackRender: FallbackRender }>
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender}>, { error: Error|null}> {
    state = { error: null };

    // 当子组件抛出异常，这里会接受到并且调用
    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    render(): React.ReactNode {
        const {error} = this.state
        const { fallbackRender, children } = this.props
        if(error) {
            return fallbackRender({ error })
        }
        return children
    }
}