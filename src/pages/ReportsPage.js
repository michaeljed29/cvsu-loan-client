import React from "react";
import { get } from "lodash";
import { isAdmin } from "util/index";
import { Navigate } from "react-router-dom";
import { useLoans } from "hooks/loans";
import Loader from "components/Loader";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { ColumnChart, PieChart } from "react-chartkick";
import "chartkick/chart.js";

const useStyles = makeStyles((theme) => ({}));

const ReportPage = () => {
  const classes = useStyles();
  const loansQuery = useLoans({
    userId: "",
  });
  const loans = get(loansQuery, "data", []);
  const isLoading = get(loansQuery, "isLoading");

  const thisYear = moment().format("YYYY");

  const pendingData = loans.filter((loan) => {
    return (
      loan.status === "pending" && moment(loan.date).format("YYYY") === thisYear
    );
  });
  const processingData = loans.filter((loan) => {
    return (
      loan.status === "processing" &&
      moment(loan.date).format("YYYY") === thisYear
    );
  });
  const approvedData = loans.filter((loan) => {
    return (
      loan.status === "approved" &&
      moment(loan.date).format("YYYY") === thisYear
    );
  });
  const rejectedData = loans.filter((loan) => {
    return (
      loan.status === "rejected" &&
      moment(loan.date).format("YYYY") === thisYear
    );
  });

  const shortTermData = loans.filter((loan) => {
    return (
      loan.duration === "short" && moment(loan.date).format("YYYY") === thisYear
    );
  });
  const longTermData = loans.filter((loan) => {
    return (
      loan.duration === "long" && moment(loan.date).format("YYYY") === thisYear
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
        Report for the year
      </h1>
      <div style={{ marginBottom: 60, marginTop: 60 }}>
        <h2>Loan Duration</h2>
        <PieChart
          colors={["#4caf50", "#ff9800"]}
          data={[
            ["Short Term", shortTermData.length],
            ["Long Term", longTermData.length],
          ]}
        />
      </div>
      <div>
        <h2>Loan Status</h2>
        <ColumnChart
          colors={["#888888", "#ff9800", "#4caf50", "#ef5350"]}
          data={[
            ["Pending", pendingData.length],
            ["Processing", processingData.length],
            ["Approved", approvedData.length],
            ["Rejected", rejectedData.length],
          ]}
        />
      </div>
    </div>
  );
};

export default ReportPage;
