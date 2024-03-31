import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

// Transition component for the Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogueComponent = ({ openDialog, setterFun, handlerDelete }) => {
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setterFun(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Are You Sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this task? This action cannot be
          undone. Deleting it will remove all associated information and cannot
          be recovered. Please confirm your decision.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <button
          onClick={() => setterFun(false)}
          className="py-2 px-3 btn btn-outline-secondary"
        >
          Cancel
        </button>
        <button
          onClick={() => handlerDelete()}
          className="py-2 px-4 btn btn-outline-primary"
        >
          Yes
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogueComponent;
