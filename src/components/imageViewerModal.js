import {
  makeStyles,
  Modal,
  Backdrop,
  Fade
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundcolor: "red"
    }
  },
  img: {
    outline: "none"
  }
}));

export default function ImageViewer(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.showImageViewer);

  const handleClose = () => {
    props.setImageViewerState(false);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open} timeout={500} className={classes.img}>
          <img
            src={props.imageUrl}
            alt="asd"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          />
        </Fade>
      </Modal>
    </div>
  );
}