import React, { useContext } from "react";
import { AlertContext } from "context/AlertContext";
import Snackbar from "@mui/material/Snackbar";
import AlertMui from "@mui/material/Alert";

const Alert = () => {
  const {
    message,
    type = "success",
    isOpen,
    closeAlert,
  } = useContext(AlertContext);

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={closeAlert}
    >
      <AlertMui severity={type} sx={{ width: "100%" }} elevation={6}>
        {message}
      </AlertMui>
    </Snackbar>
  );
};

export default Alert;
