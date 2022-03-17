import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textValue: {},
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: "#757575",
    marginBottom: 0,
  },
  value: {
    fontSize: 16,
  },
}));

const ViewItem = (props) => {
  const classes = useStyles();
  const { className, label, children } = props;
  return (
    <div className={`${className} ${classes.textValue}`}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{children}</div>
    </div>
  );
};

export default ViewItem;
