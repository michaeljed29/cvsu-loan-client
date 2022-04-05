import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { get } from "lodash";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import PendingIcon from "@mui/icons-material/Pending";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import { useSetNotificationStatus } from "hooks/notifications";
import { useNavigate, useLocation, useNavigationType } from "react-router-dom";
import { isAdmin, userLoggedIn } from "util/index";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:not(:last-child)": {
      marginBottom: 15,
    },
  },
  paper: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    borderLeft: (props) => {
      if (!props.notification.seen) return `4px solid #168000`;
      return `4px solid #FFF`;
    },
    borderRadius: 0,
    background: (props) => {
      if (!props.notification.seen) return "#15590614";
      return "initial";
    },
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
  details: {
    marginLeft: 18,
  },
  name: {
    fontSize: 17,
    "& a": {
      fontWeight: 600,
      color: "#000",
      textDecoration: "underline",
      cursor: "pointer",
    },

    "& a.member": {
      fontWeight: 600,
      color: "#000",
      cursor: "text",
      pointerEvents: "none",
      textDecoration: "initial",
    },
  },
  description: {
    marginTop: 3,
    fontSize: 15,
    "& span": {
      fontWeight: 600,
      color: "#000",
    },
  },
  date: {
    marginTop: 5,
    display: "flex",
    alignItems: "center",

    "& span": {
      marginLeft: 5,
      fontSize: 13,
      fontWeight: 700,
      color: "#888",
      "&:first-of-type": {
        marginRight: 12,
      },
    },
  },
}));

const Card = (props) => {
  const classes = useStyles(props);
  const notification = get(props, "notification", {});
  const type = get(notification, "type", "");
  const user = get(notification, "userId", {});
  const approver = get(notification, "approverId", {});
  const loan = get(notification, "loanId", {});
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevPath = get(location, "state.prevPath", "");

  const setNotificationStatusResult = useSetNotificationStatus();

  const setNotificationStatus = get(setNotificationStatusResult, "mutate");

  const isPending = type === "pending";
  const isProcessing = type === "processing";
  const isApproved = type === "approved";
  const isRejected = type === "rejected";

  const icon = isPending ? (
    <PendingIcon sx={{ fontSize: 50, color: "#FFF" }} />
  ) : isProcessing ? (
    <HourglassTopIcon sx={{ fontSize: 50, color: "#FFF" }} />
  ) : isApproved ? (
    <ThumbUpAltIcon sx={{ fontSize: 50, color: "#FFF" }} />
  ) : isRejected ? (
    <ThumbDownAltIcon sx={{ fontSize: 50, color: "#FFF" }} />
  ) : (
    <PendingIcon sx={{ fontSize: 50, color: "#FFF" }} />
  );

  const text = isPending
    ? "is requesting for"
    : isProcessing
    ? "is processing your"
    : isApproved
    ? "approved your"
    : "rejected your loan";

  const name = isAdmin()
    ? `${user.firstName} ${user.lastName}`
    : `${approver.firstName} ${approver.lastName} (Admin)`;

  const handleClickName = (id) => (e) => {
    e.preventDefault();
    navigate(`/users/${id}`, {
      state: { notificationId: notification._id, prevPath: "notifications" },
    });
  };

  const handleClickLoan = (id) => (e) => {
    e.preventDefault();

    navigate(`/loans/${id}`, {
      state: { notificationId: notification._id, prevPath: "notifications" },
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={1}>
        <div className={`${classes.iconCircle} ${type}`}>{icon}</div>

        <div className={classes.details}>
          <p className={classes.name}>
            <a
              onClick={handleClickName(isAdmin() ? user._id : approver._id)}
              className={`${!isAdmin() ? "member" : ""}`}
            >
              {name}
            </a>{" "}
            {text} <a onClick={handleClickLoan(loan._id)}>loan</a>
          </p>
          <p className={classes.description}>
            With an amount ₱ <span>{loan.amount}</span> and payable for{" "}
            <span>
              {`${loan.monthsCount} month${loan.monthsCount > 0 ? "s" : ""}.`}
            </span>
          </p>
          <div className={classes.date}>
            <CalendarTodayIcon sx={{ fontSize: 20, color: "#888" }} />
            <span>{moment(notification.createdAt).format("YYYY-MM-DD")}</span>
            <AccessTimeIcon sx={{ fontSize: 20, color: "#888" }} />
            <span>{moment(notification.createdAt).format("hh:mm A")}</span>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Card;
