import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonLoader from "components/ButtonLoader";
import Button from "@mui/material/Button";

const ConfirmModal = (props) => {
  const {
    open,
    title,
    text,
    icon,
    loading,
    onConfirm,
    onClose,
    children,
    yesLabel,
    noLabel,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent style={{ display: "flex", alignItems: "center" }}>
        {children ? (
          children
        ) : (
          <>
            {icon}
            <DialogContentText style={{ marginLeft: 15 }}>
              {text}
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{noLabel || "No"}</Button>
        <ButtonLoader onClick={onConfirm} loading={loading}>
          {yesLabel || "Yes"}
        </ButtonLoader>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
