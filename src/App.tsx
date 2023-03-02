import React, {StrictMode} from 'react';
import {ErrorBoundary} from "./components/ErrorBoundary/ErrorBoundary";
import {Todo} from "./components/ToDo/Todo";

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Todo />
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
