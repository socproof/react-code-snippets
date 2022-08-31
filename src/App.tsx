import React, {StrictMode} from 'react';
import {ErrorBoundary} from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
