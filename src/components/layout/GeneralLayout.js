import React from 'react';
import '../pages/dashboard/dash.css';
import LoaderComponent from '../shared/Loader';
import NavigationDrawer from '../shared/NavigationDrawer';

const GlobalLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#f5f6f8', width:'100vw', height:'100vh', overflowX: 'hidden' }}>
      <LoaderComponent/>
      <NavigationDrawer>
        <div className='content-container'>
          {children}
        </div>
      </NavigationDrawer>
    </div>
  );
};

export default GlobalLayout;