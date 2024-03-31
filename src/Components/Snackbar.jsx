import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const TransitionsSnackbar = ({ openSnack, setterFun, message }) => {
  return (
    <div>
      <Snackbar
        open={openSnack}
        onClose={() => setterFun(false)}
        TransitionComponent={SlideTransition}
        message={message}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};

export default TransitionsSnackbar;
