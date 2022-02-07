import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/users";
import { makeStyles } from "@mui/styles";
import { get } from "lodash";
import Grid from "@mui/material/Grid";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
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

const UsersPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const userQuery = useUser(id);

  const user = get(userQuery, "data", []);
  console.log("userQuery", userQuery);
  return (
    <div>
      <ScopedCssBaseline>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 30 }}
        >
          <h2 className={classes.title}>User Details</h2>
          <span
            style={{
              marginLeft: 15,
              background: user.type === "admin" ? "#4caf50" : "#42a5f5",
              padding: "3px 7px",
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              borderRadius: 15,
            }}
          >
            {user.type}
          </span>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>First Name:</div>
              <div className={classes.value}>{user.firstName}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>Last Name:</div>
              <div className={classes.value}>{user.lastName}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>Mobile Number:</div>
              <div className={classes.value}>{user.mobileNumber}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>Address:</div>
              <div className={classes.value}>{user.address}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>Department:</div>
              <div className={classes.value}>{user.department}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>Position:</div>
              <div className={classes.value}>{user.position}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>User Type:</div>
              <div className={classes.value}>{user.type}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <div className={classes.textValue}>
              <div className={classes.label}>Generated Password</div>
              <div className={classes.value}>{user.initialPassword}</div>
            </div>
          </Grid>
        </Grid>
      </ScopedCssBaseline>
    </div>
  );
};

export default UsersPage;
