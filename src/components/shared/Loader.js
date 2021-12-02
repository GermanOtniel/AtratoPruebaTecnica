import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoaderContext from "../../contexts/loaderScreen/LoaderContext";


const LoaderComponent = () => {
  const { loaderScreen } = useContext(LoaderContext);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => 1000000000 }}
      open={loaderScreen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoaderComponent;
