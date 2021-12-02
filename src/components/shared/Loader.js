import React, { useContext } from "react";
import LoaderContext from "../../contexts/loaderScreen/LoaderContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


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
