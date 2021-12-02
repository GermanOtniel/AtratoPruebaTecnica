import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertMsgContext from "../../contexts/alertMessage/AlertMsgContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = () => {
  const { showAlert } = useContext(AlertMsgContext);
  const { variant, show, msg, duration, severity } = showAlert;
  const key = new Date();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: variant }}
      open={show}
      key={key.getMilliseconds()}
      autoHideDuration={duration}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;