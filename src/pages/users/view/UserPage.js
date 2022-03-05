import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/users";
import { makeStyles } from "@mui/styles";
import { get } from "lodash";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Loader from "components/Loader";
import ViewItem from "components/ViewItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .back-btn": {
      marginTop: 30,
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
}));

const UsersPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const userQuery = useUser(id);
  const navigate = useNavigate();

  const user = get(userQuery, "data", []);
  const isLoading = get(userQuery, "isLoading");

  const handleBack = () => navigate(`/users`);

  const {
    firstName,
    lastName,
    mobileNumber,
    address,
    department,
    position,
    type,
    initialPassword,
  } = user;

  if (isLoading) return <Loader />;

  return (
    <div className={classes.root}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
        <h2 className={classes.title}>User Details</h2>
        <span
          style={{
            marginLeft: 15,
            background: type === "admin" ? "#4caf50" : "#42a5f5",
            padding: "3px 7px",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            borderRadius: 15,
          }}
        >
          {type}
        </span>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="First Name:">{firstName}</ViewItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="Last Name:">{lastName}</ViewItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="Mobile Number:">{mobileNumber}</ViewItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="Address:">{address}</ViewItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="Department:">{department}</ViewItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="Position:">{position}</ViewItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="User Type:">{type}</ViewItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ViewItem label="Generated Password:">{initialPassword}</ViewItem>
        </Grid>
      </Grid>

      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        className="back-btn"
        variant="text"
      >
        Back
      </Button>
    </div>
  );
};

export default UsersPage;