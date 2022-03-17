import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonLoader from "components/ButtonLoader";

const FormDialog = (props) => {
  const {
    open,
    title = "Add",
    onClose,
    onSubmit,
    size = "md",
    children,
    addLabel = "Add",
    loading,
    buttonProps = {},
  } = props;

  return (
    <div>
      <Dialog fullWidth size={size} open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: 20 }}>
            Please fill up all needed information
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <ButtonLoader
            variant="contained"
            onClick={onSubmit}
            loading={loading}
            {...buttonProps}
          >
            {addLabel}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
