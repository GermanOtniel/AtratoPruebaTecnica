import React from 'react';

const AlertMsgContext = React.createContext({
  showAlert: {},
  setShowAlert: () => {}
});

export default AlertMsgContext;