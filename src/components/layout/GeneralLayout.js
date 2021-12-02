import React from "react";
import SnackBar from "../shared/AlertMessage";
import LoaderComponent from "../shared/Loader";
import NavigationDrawer from "../shared/NavigationDrawer";

const GlobalLayout = ({ children }) => {
  return (
    <div className="general-layout">
      <LoaderComponent/>
      <SnackBar/>
      <NavigationDrawer>
        <div className="content-container">
          {children}
        </div>
      </NavigationDrawer>
    </div>
  );
};

export default GlobalLayout;