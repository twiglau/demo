// TODO: 自React16起， 任何未被错误边界捕获的错误将导致整个 React 组件树被卸载。
// 1. 错误边界， 必须要用 class 组件
// 遇到错误： 渲染备用UI方案
// 2. 点击事件的错误并不会渲染。
// 3. 第三方库： https://github.com/bvaughn/react-error-boundary

import React from "react";

type FallbackRender = ( props: { error: Error|null } ) => React.ReactElement;


/**
 * // 组件的 Props, State
  class Component <P, S> {
  }
1. props包含: children, fallbackRender
解释： {children: ReactNode, fallbackRender: FallbackRender} = React.PropsWithChildren<{ fallbackRender: FallbackRender }>
export class ErrorBoundary extends React.Component<{children: ReactNode, fallbackRender: FallbackRender}, any>
2. 进阶写法
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, any>
 */
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error|null}> {
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