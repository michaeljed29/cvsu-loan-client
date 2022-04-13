import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams, useNavigationType, useLocation } from "react-router-dom";
import { useLoan, useSetLoanStatus, useSetLoanMonthly } from "hooks/loans";
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
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MonthlyModal from "./MonthlyModal";

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
  const [isFormOpen, setIsFormOpen] = useState(false);

  const setLoanStatusResult = useSetLoanStatus();

  const setNotificationStatusResult = useSetNotificationStatus();
  const setNotificationStatus = get(setNotificationStatusResult, "mutate");

  const setLoanStatus = get(setLoanStatusResult, "mutate");
  const isUpdating = get(setLoanStatusResult, "isLoading");

  const setLoanMonthlyResult = useSetLoanMonthly();
  const setLoanMonthly = get(setLoanMonthlyResult, "mutate");
  const isUpdatingMonthly = get(setLoanMonthlyResult, "isLoading");

  const loan = get(loanQuery, "data", []);
  const refetchLoan = get(loanQuery, "refetch");
  const isLoading = get(loanQuery, "isLoading");

  const { setAlert } = useContext(AlertContext);

  const handleBack = () => navigate(-1);

  const {
    _id,
    amount,
    monthsCount,
    duration,
    status,
    createdAt,
    verificationCode,
    loanType,
    monthly,
  } = loan;

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

  const handleSubmit = (amount, { resetForm, setAmount }) => {
    setLoanMonthly(
      {
        id: _id,
        amount,
      },
      {
        onSuccess: (data) => {
          const newMonthly = get(data, "monthly", 0);
          refetchLoan();
          setIsFormOpen(false);
          resetForm();
          setAmount(newMonthly);
          setAlert("Loan monthly successfully updated.");
        },
      }
    );
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Alert />
      <MonthlyModal
        title={"Edit Monthly"}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
        loading={isUpdatingMonthly}
        monthly={monthly}
      />
      <div className={classes.root}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              marginRight: "auto",
              fontWeight: 700,
              fontSize: 19,
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2 className={classes.title}>Loan Details</h2>
            {verificationCode && (
              <Tooltip title="Verification Code" placement="right" arrow>
                <div
                  style={{
                    marginLeft: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #155907",
                    padding: "2px 5px",
                    borderRadius: 4,
                    background: "#ebffe7",
                    fontSize: 15,
                    cursor: "pointer",
                    color: "#155907",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 800,
                      letterSpacing: 1,
                    }}
                  >
                    {verificationCode}
                  </p>
                </div>
              </Tooltip>
            )}
          </div>

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
            <ViewItem label="Type of Loan:">{loanType}</ViewItem>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem label="Duration:">{durationString}</ViewItem>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ViewItem
              label={
                <div style={{ position: "relative" }}>
                  <span>Monthly:</span>
                  <Tooltip title="Edit Monthly" placement="right" arrow>
                    <IconButton
                      style={{ left: 55, top: -5, position: "absolute" }}
                      aria-label="delete"
                      size="small"
                      onClick={() => {
                        setIsFormOpen(true);
                      }}
                    >
                      <EditIcon sx={{ fontSize: 18, color: "#42a5f5" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              }
            >
              <div>
                <strong>{`₱ ${monthly}`}</strong>
              </div>
            </ViewItem>
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
            <ViewItem label="Amount:">{`₱ ${amount}`}</ViewItem>
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
