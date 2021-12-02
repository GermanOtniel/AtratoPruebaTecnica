import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ 
  open, handleClose, title,
  handleAction, dialogBody, labelAction
}) => {

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar 
          sx={{ 
            position: "relative", 
            backgroundColor: "#001866"
          }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              { title }
            </Typography>
            <Button autoFocus color="inherit" onClick={handleAction}>
              {labelAction}
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          { dialogBody }
        </div>
      </Dialog>
    </div>
  );
}

export default FullScreenDialog;