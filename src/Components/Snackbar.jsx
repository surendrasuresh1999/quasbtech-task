import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const TransitionsSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(Fade);

  const handleClick = (Transition) => () => {
    setOpen(true);
    setTransition(Transition);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
      <Button onClick={handleClick(Fade)}>Fade Transition</Button>
      <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition.name}
        autoHideDuration={1200}
      />
    </div>
  );
};

export default TransitionsSnackbar;
