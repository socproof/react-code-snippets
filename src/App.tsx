import React, {StrictMode} from 'react';
import {FoldersList} from "./components/FoldersList/FoldersList";
import {CountryCapital} from "./components/CountryCapital/CountryCapital";
import {ErrorBoundary} from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <FoldersList />
        <CountryCapital />
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
