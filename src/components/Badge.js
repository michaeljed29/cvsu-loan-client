import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3px 7px",
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 600,
    background: (props) => {
      if (props.type === "success") return theme.palette.success.light;
      if (props.type === "info") return theme.palette.info.main;
      if (props.type === "warning") return theme.palette.warning.light;
      if (props.type === "danger") return theme.palette.error.light;
      return "#888888";
    },
    color: (props) => {
      if (props.type === "success") return "#fff";
      if (props.type === "info") return "#fff";
      return "#fff";
    },
    textTransform: "capitalize",
  },
}));

const Badge = (props) => {
  const classes = useStyles(props);

  return <span className={`badge ${classes.root}`}>{props.children}</span>;
};

export default Badge;
