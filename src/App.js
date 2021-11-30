import React, { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './components/pages/dashboard/Dashboard';
import LoaderContext from './contexts/loaderScreen/LoaderContext';
import AlertMsgContext from './contexts/alertMessage/AlertMsgContext';

const App = (props) => {
  const [statusLoader, setStatusLoader] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false, variant: 'right', msg: '',
    duration: 5000, severity: 'success'
  });

  const handleSetShowAlert = (show, variant, msg, duration, severity) => {
    setShowAlert({show, variant, msg, duration, severity});
    setTimeout(() => {
      setShowAlert({
        show: false, 
        variant, 
        msg, 
        duration, 
        severity
      });
    }, duration);
  };

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
        <AlertMsgContext.Provider
          value={{
            showAlert: showAlert,
            setShowAlert: (show, variant, msg, duration, severity) => handleSetShowAlert(
              show, variant, msg, duration, severity)
          }}
        >
          <Routes>
            <Route
              exact
              path="/"
              element={(<Dashboard/>)}
            />
          </Routes>
        </AlertMsgContext.Provider>
      </LoaderContext.Provider>
    </BrowserRouter>
  );
}

export default App;
