import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const ButtonLoader = (props) => {
  const theme = useTheme();
  const { loading, children, ...rest } = props;

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Button disabled={loading} {...rest}>
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: theme.palette.primary.main,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default ButtonLoader;
