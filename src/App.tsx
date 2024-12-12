import React from "react";
import "./App.css";

import { useAuth } from "context/auth-context"
import { AuthenticatedApp } from "authenticated-app"
import { UnauthenticatedApp } from "unauthenticated-app"
import { FullPageErrorFallback, FullPageLoading,  } from "components/lib";
import { ErrorBoundary } from "components/error-boundary";

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* TODO 错误边界 fallbackRender遇到错误的时候，需要渲染的UI FullPageErrorFallback */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/*TODO Suspense 有什么作用 */}
        <React.Suspense fallback={<FullPageLoading />}>
          { user ? <AuthenticatedApp /> :<UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
