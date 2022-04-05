import React from "react";
import { get } from "lodash";
import { isAdmin } from "util/index";
import { Navigate } from "react-router-dom";
import { useLoans } from "hooks/loans";
import Loader from "components/Loader";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import PendingIcon from "@mui/icons-material/Pending";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "55px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  number: {
    fontSize: 45,
  },
  iconCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    padding: 10,
    "&.pending": {
      background: "#888888",
    },

    "&.processing": {
      background: theme.palette.warning.light,
    },

    "&.approved": {
      background: theme.palette.success.light,
    },

    "&.rejected": {
      background: theme.palette.error.light,
    },
  },
}));

const DashboardPage = () => {
  const classes = useStyles();
  const loansQuery = useLoans({
    userId: "",
  });
  const loans = get(loansQuery, "data", []);
  const isLoading = get(loansQuery, "isLoading");

  const thisMonth = moment().format("YYYY-MM");

  const pendingData = loans.filter((loan) => {
    return (
      loan.status === "pending" &&
      moment(loan.date).format("YYYY-MM") === thisMonth
    );
  });
  const processingData = loans.filter((loan) => {
    return (
      loan.status === "processing" &&
      moment(loan.date).format("YYYY-MM") === thisMonth
    );
  });
  const approvedData = loans.filter((loan) => {
    return (
      loan.status === "approved" &&
      moment(loan.date).format("YYYY-MM") === thisMonth
    );
  });
  const rejectedData = loans.filter((loan) => {
    return (
      loan.status === "rejected" &&
      moment(loan.date).format("YYYY-MM") === thisMonth
    );
  });

  const shortTermData = loans.filter((loan) => {
    return (
      loan.duration === "short" &&
      moment(loan.date).format("YYYY-MM") === thisMonth
    );
  });
  const longTermData = loans.filter((loan) => {
    return (
      loan.duration === "long" &&
      moment(loan.date).format("YYYY-MM") === thisMonth
    );
  });

  if (!isAdmin()) return <Navigate to="/loans" />;

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1
        style={{
          marginBottom: 10,
          fontWeight: "normal",
          fontSize: 35,
          color: "initial",
        }}
      >
        Summary for the month
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper} elevation={3}>
            <div className={`${classes.iconCircle} pending`}>
              <PendingIcon sx={{ fontSize: 50, color: "#FFF" }} />
            </div>
            <span className={classes.number}>{pendingData.length}</span>
            Total number of pending
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper} elevation={3}>
            <div className={`${classes.iconCircle} processing`}>
              <HourglassTopIcon sx={{ fontSize: 50, color: "#FFF" }} />
            </div>
            <span className={classes.number}>{processingData.length}</span>
            Total number of processing
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper} elevation={3}>
            <div className={`${classes.iconCircle} approved`}>
              <ThumbUpAltIcon sx={{ fontSize: 50, color: "#FFF" }} />
            </div>
            <span className={classes.number}>{approvedData.length}</span>
            Total number of approved
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper} elevation={3}>
            <div className={`${classes.iconCircle} rejected`}>
              <ThumbDownAltIcon sx={{ fontSize: 50, color: "#FFF" }} />
            </div>
            <span className={classes.number}>{rejectedData.length}</span>
            Total number of rejected
          </Paper>
        </Grid>
      </Grid>
      <Paper
        style={{
          marginTop: 15,
          padding: 18,
          display: "flex",
          fontSize: 18,
          width: "auto",
        }}
      >
        <div style={{ color: "#888888" }}>
          Short Term:{" "}
          <span style={{ fontWeight: 700, color: "#000" }}>
            {shortTermData.length}
          </span>
        </div>
        <div style={{ marginLeft: 30, color: "#888888" }}>
          Long Term:{" "}
          <span style={{ fontWeight: 700, color: "#000" }}>
            {longTermData.length}
          </span>
        </div>
      </Paper>
    </div>
  );
};

export default DashboardPage;
