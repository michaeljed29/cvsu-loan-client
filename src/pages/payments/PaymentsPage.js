import React, { useState, useContext } from "react";
import { get } from "lodash";
import { usePayments, useCreatePayment } from "hooks/payments";
import { useUsers } from "hooks/users";
import { useLoans } from "hooks/loans";
import Table from "components/Table";
import moment from "moment";
import Loader from "components/Loader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import GroupIcon from "@mui/icons-material/Group";
import PaymentModal from "./PaymentModal";
import { AlertContext } from "context/AlertContext";
import Alert from "components/Alert";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { isAdmin, userLoggedIn } from "util/index";

const useStyles = makeStyles({
  total: {
    padding: "15px 15px",
    "& div": {
      fontSize: 16,

      "&:last-child": {
        fontWeight: 600,
      },
    },
  },
});

const PaymentsPage = () => {
  const usersQuery = useUsers();

  const classes = useStyles();

  const [user, setUser] = useState(isAdmin() ? "All Users" : userLoggedIn._id);
  const [loan, setLoan] = useState("All Loans");
  const [payment, setPayment] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const createPaymentResult = useCreatePayment();

  const users = get(usersQuery, "data", []);

  const createPayment = get(createPaymentResult, "mutate");
  const isAdding = get(createPaymentResult, "isLoading");

  const usersOption = [
    { label: "All Users", value: "All Users" },
    ...users.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id,
    })),
  ];

  const loansQuery = useLoans({
    userId: "",
  });

  const loans = get(loansQuery, "data", []).filter((loan) => loan.userId);
  const loansUser =
    user === "All Users"
      ? loans.filter((loan) => loan.status === "approved")
      : loans
          .filter((loan) => loan.status === "approved")
          .filter((loan) => loan.userId._id === user);

  const loansOptions = [
    { label: "All Loans", value: "All Loans" },
    ...loansUser.map((loan) => ({
      label: loan.verificationCode,
      value: loan._id,
    })),
  ];

  const loanEntry = loans.find((loanEntry) => loanEntry._id === loan) || {};

  const paymentsQuery = usePayments({
    userId: user === "All Users" ? "" : user,
    loanId: loan === "All Loans" ? "" : loan,
  });
  const payments = get(paymentsQuery, "data", []).filter(
    (payment) => payment.userId
  );
  const refetchPayment = get(paymentsQuery, "refetch");
  const isLoading = get(paymentsQuery, "isLoading");
  const isFetching = get(paymentsQuery, "isFetching");
  const isPreviousData = get(paymentsQuery, "isPreviousData", false);

  const { setAlert } = useContext(AlertContext);

  const totalAmountReleased = get(loanEntry, "amount", 0);
  const totalAmountPaid = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );
  const remainingBalance = totalAmountReleased - totalAmountPaid;
  const fullyPaid = remainingBalance <= 0;

  const handleSubmit = (amount, officialReceipt, { resetForm }) => {
    createPayment(
      {
        amount: parseFloat(parseFloat(amount).toFixed(2)),
        officialReceipt,
        userId: user,
        loanId: loan,
        createdAt: new Date(),
      },
      {
        onSuccess: () => {
          refetchPayment();
          setIsFormOpen(false);
          resetForm();
          setAlert("Payment successfully added");
        },
      }
    );
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Alert />
      <PaymentModal
        title={"Payment"}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
        loading={isAdding}
        monthly={payment}
      />
      <div style={{}}>
        {isAdmin() && (
          <FormControl
            style={{
              marginBottom: 20,
              maxWidth: 400,
              width: 400,
              marginRight: 20,
            }}
            // fullWidth
            variant="filled"
            margin="none"
          >
            <InputLabel id="demo-simple-select-label">Users</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="Type of Loan"
              name="loanType"
              onChange={(e) => {
                setUser(e.target.value);
                setLoan("All Loans");
              }}
            >
              {usersOption.map((user) => (
                <MenuItem value={user.value}>{user.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {(!(user === "All Users") || !isAdmin()) && (
          <FormControl
            style={{ marginBottom: 20, maxWidth: 400, width: 400 }}
            // fullWidth
            variant="filled"
            margin="none"
          >
            <InputLabel id="demo-simple-select-label">Loans</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={loan}
              label="Type of Loan"
              name="loanType"
              onChange={(e) => setLoan(e.target.value)}
            >
              {loansOptions.map((loan) => (
                <MenuItem value={loan.value}>{loan.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <Table
        rows={payments}
        title={"Payments Table"}
        isHideButton={
          user === "All Users" ||
          loan === "All Loans" ||
          fullyPaid ||
          !isAdmin()
        }
        columns={[
          {
            field: "userId.firstName",
            label: "Name",
            renderCell: (row) => {
              const user = get(row, "userId", {}) || {};
              return `${user.firstName || ""} ${user.lastName || ""}`;
            },
          },
          {
            field: "loanId.loanType",
            label: "Type of Loan",
          },

          {
            field: "loanId.verificationCode",
            label: "Verification Code",
          },
          {
            field: "remainingBalance",
            label: "Remaining Balance",
            numeric: true,
            renderCell: (row) => `₱ ${row.remainingBalance}`,
          },
          {
            field: "officialReceipt",
            label: "OR (Official Receipt)",
          },
          {
            field: "amount",
            label: "Amount",
            numeric: true,
            renderCell: (row) => <strong>{`₱ ${row.amount}`}</strong>,
          },

          {
            field: "createdAt",
            label: "Date",
            renderCell: (row) => moment(row.createdAt).format("YYYY-MM-DD"),
          },
        ]}
        searchKeys={[
          "userId.firstName",
          "userId.lastName",
          "monthsCount",
          "createdAt",
          "remainingBalance",
          "amount",
          "verificationCode",
          "loanId.loanType",
          "loanId.verificationCode",
          "officialReceipt",
        ]}
        onAdd={() => setIsFormOpen(true)}
        onClickRow={() => {}}
      />
      {user !== "All Users" &&
        loan !== "All Loans" &&
        !isFetching &&
        !isPreviousData && (
          <Paper elevation={2} className={classes.total}>
            <div>{`Total Amount Released: ${totalAmountReleased.toFixed(
              2
            )}`}</div>
            <div>{`Total Amount Paid: ${totalAmountPaid.toFixed(2)}`}</div>
            <div>{`Remaining Balance: ${remainingBalance.toFixed(2)}`}</div>
          </Paper>
        )}
    </>
  );
};

export default PaymentsPage;
