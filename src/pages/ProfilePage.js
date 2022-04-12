import React, { useState, useEffect, useContext } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useUser, useChangePassword } from "hooks/users";
import { makeStyles } from "@mui/styles";
import { get } from "lodash";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Badge from "components/Badge";
import { isAdmin, userLoggedIn } from "util/index";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "@mui/material/Link";
import Loader from "components/Loader";
import ChangePassModal from "./ChangePassModal";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "components/Alert";
import { AlertContext } from "context/AlertContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
  nameWrapper: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    fontSize: 38,
    marginRight: 15,
    fontWeight: 300,
  },
  content: {
    marginTop: 25,
    maxWidth: 400,
    width: 400,
    marginBottom: 40,
  },
  label: {
    width: 200,
    fontSize: 18,
    color: "#757575",
    marginRight: 30,
  },
  value: {
    fontSize: 18,
    fontWeight: 600,
  },
  container: {
    "&:not(:last-child)": {
      marginBottom: 15,
    },
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const changePasswordResult = useChangePassword();
  const userQuery = useUser(userLoggedIn._id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const changePassword = get(changePasswordResult, "mutate");
  const isUpdating = get(changePasswordResult, "isLoading");

  const user = get(userQuery, "data", {});
  const isLoading = get(userQuery, "isLoading");

  const {
    _id,
    firstName,
    lastName,
    mobileNumber,
    address,
    department,
    position,
    type,
  } = user;

  const handleChangePass = (e) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  const handleSubmit = (value, { resetForm }) => {
    if (!value.newPassword || !value.confirmNewPassword) {
      setAlert("All fields are requried.", "error");
      return;
    }

    if (get(value, "newPassword", "").length < 6) {
      setAlert("Password must be at least 6 characters", "error");
      return;
    }

    if (value.newPassword !== value.confirmNewPassword) {
      setAlert("Password does not match", "error");
      return;
    }

    changePassword(
      {
        id: _id,
        password: value.newPassword,
      },
      {
        onSuccess: () => {
          setIsFormOpen(false);
          resetForm();
          setAlert("Password successfully updated.");
        },
      }
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div className={classes.root}>
      <Alert />
      <ChangePassModal
        title={"Change Password"}
        onClose={() => {
          setIsFormOpen(false);
        }}
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
        loading={isUpdating}
      />
      <AccountBoxIcon sx={{ fontSize: 200, color: "#155907" }} />
      <div className={classes.nameWrapper}>
        <h2 className={classes.name}>{`${firstName} ${lastName}`}</h2>
        <Badge type={type === "admin" ? "success" : "info"}>{type}</Badge>
      </div>

      <div className={classes.content}>
        <Grid className={classes.container} container>
          <Grid item xs={12} md={5} lg={5}>
            <span className={classes.label}>Mobile Number:</span>
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <span className={classes.value}>{mobileNumber}</span>
          </Grid>
        </Grid>
        <Grid className={classes.container} container>
          <Grid item xs={12} md={5} lg={5}>
            <span className={classes.label}>Position:</span>
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <span className={classes.value}>{position}</span>
          </Grid>
        </Grid>
        <Grid className={classes.container} container>
          <Grid item xs={12} md={5} lg={5}>
            <span className={classes.label}>Department:</span>
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <span className={classes.value}>{department}</span>
          </Grid>
        </Grid>
        <Grid className={classes.container} container>
          <Grid item xs={12} md={5} lg={5}>
            <span className={classes.label}>Address:</span>
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <span className={classes.value}>{address}</span>
          </Grid>
        </Grid>
      </div>

      <Link
        style={{ display: "flex", alignItems: "center" }}
        href=""
        onClick={handleChangePass}
      >
        <LockIcon style={{ marginBottom: 3, marginRight: 5 }} /> Change Password
      </Link>
    </div>
  );
};

export default ProfilePage;
