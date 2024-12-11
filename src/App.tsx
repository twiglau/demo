import React from "react";
import "./App.css";

import { useAuth } from "context/auth-context"
import { AuthenticatedApp } from "authenticated-app"
import { UnauthenticatedApp } from "unauthenticated-app"
import { FullPageLoading } from "components/lib";

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <React.Suspense fallback={<FullPageLoading />}>
         { user ? <AuthenticatedApp /> :<UnauthenticatedApp />}
      </React.Suspense>
    </div>
  );
}

export default App;
