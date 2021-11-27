import React, { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './components/pages/dashboard/Dashboard';
import LoaderContext from './contexts/loaderScreen/LoaderContext';

const App = (props) => {
  const [statusLoader, setStatusLoader] = useState(false);

  return (
    <BrowserRouter>
      <LoaderContext.Provider
        value={{
          loaderScreen: statusLoader,
          setLoaderScreen: (status) => {
            setStatusLoader(status);
          }
        }}
      >
      <Routes>
        <Route
          exact
          path="/"
          element={(<Dashboard/>)}
        />
      </Routes>
      </LoaderContext.Provider>
    </BrowserRouter>
  );
}

export default App;
