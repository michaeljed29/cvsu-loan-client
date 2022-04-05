import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams, useNavigationType, useLocation } from "react-router-dom";
import { useLoan, useSetLoanStatus } from "hooks/loans";
import { makeStyles } from "@mui/styles";
import { get } from "lodash";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Loader from "components/Loader";
import ViewItem from "components/ViewItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Badge from "components/Badge";
import moment from "moment";
import ButtonLoader from "components/ButtonLoader";
import Alert from "components/Alert";
import { AlertContext } from "context/AlertContext";
import { isAdmin, userLoggedIn } from "util/index";
import { useSetNotificationStatus } from "hooks/notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .back-btn": {
      marginTop: 30,
    },

    "& .amount": {
      fontWeight: 600,
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
}));

const LoanPage = () => {
  const [isRejecting, setIsRejecting] = useState(false);
  const classes = useStyles();
  const { id } = useParams();
  const loanQuery = useLoan(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigationType = useNavigationType();
  const notificatioState = get(location, "state", {}) || {};

  const setLoanStatusResult = useSetLoanStatus();

  const setNotificationStatusResult = useSetNotificationStatus();
  const setNotificationStatus = get(setNotificationStatusResult, "mutate");

  const setLoanStatus = get(setLoanStatusResult, "mutate");
  const isUpdating = get(setLoanStatusResult, "isLoading");

  const loan = get(loanQuery, "data", []);
  const refetchLoan = get(loanQuery, "refetch");
  const isLoading = get(loanQuery, "isLoading");

  const { setAlert } = useContext(AlertContext);

  const handleBack = () => navigate(-1);

  const { _id, amount, monthsCount, duration, status, createdAt } = loan;

  const isPending = status === "pending";
  const isProcessing = status === "processing";
  const isApproved = status === "approved";
  const isRejected = status === "rejected";

  const user = get(loan, "userId", {});
  const { firstName, lastName, position } = user;

  const isPlural = monthsCount > 1;

  const durationString = `${monthsCount} month${isPlural ? "s" : ""} ${
    duration === "short" ? "(Short Term)" : "(Long Term)"
  }`;

  const type = isApproved
    ? "success"
    : isProcessing
    ? "warning"
    : isRejected
    ? "danger"
    : undefined;

  const handleSetStatus = (status) => () => {
    const newValue =
      status === undefined
        ? "rejected"
        : isPending
        ? "processing"
        : isProcessing
        ? "approved"
        : "";

    if (newValue === "rejected") setIsRejecting(true);

    setLoanStatus(
      {
        id: _id,
        value: {
          status: newValue,
          approverId: userLoggedIn._id,
        },
      },
      {
        onSuccess: () => {
          refetchLoan();
          setAlert(`Loan has been successfully set to ${newValue}.`);
          if (newValue === "rejected") setIsRejecting(false);
        },
      }
    );
  };

  const label = isPending
    ? "Set to processing"
    : isProcessing
    ? "Set to Approved"
    : "Approved";

  useEffect(() => {
    if (
      notificatioState.prevPath === "notifications" &&
      navigationType === "PUSH"
    ) {
      setNotificationStatus(
        {
          id: notificatioState.notificationId,
          status: true,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              "notificationscount",
              { userId: isAdmin() ? "" : userLoggedIn._id },
            ]);
          },
        }
      );
    }
  }, [notificatioState.prevPath]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Alert />
      <div className={classes.root}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <h2 style={{ marginRight: "auto" }} className={classes.title}>
            Loan Details
          </h2>
          {isAdmin() && !isApproved && !isRejected && (
            <ButtonLoader
              variant="outlined"
              onClick={handleSetStatus()}
              loading={isUpdating && isRejecting}
              color="error"
            >
              Set to Rejected
            </ButtonLoader>
          )}

          {isAdmin() && !isApproved && !isRejected && (
            <ButtonLoader
              variant="contained"
              onClick={handleSetStatus(status)}
              loading={isUpdating && !isRejecting}
            >
              {label}
            </ButtonLoader>
          )}
        </div>

        <Grid style={{ marginBottom: 24 }} container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem label="Name:">{`${firstName} ${lastName}`}</ViewItem>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem label="Position:">{position}</ViewItem>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem label="Duration:">{durationString}</ViewItem>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem label="Date:">
              {moment(createdAt).format("YYYY-MM-DD")}
            </ViewItem>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem label="Status:">
              <Badge type={type}>{status}</Badge>
            </ViewItem>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem
              className="amount"
              label="Amount:"
            >{`₱ ${amount}`}</ViewItem>
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
    </>
  );
};

export default LoanPage;
