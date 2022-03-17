import React, { useState, useContext } from "react";
import { get } from "lodash";
import { useLoans, useCreateLoan } from "hooks/loans";
import Table from "components/Table";
import Loader from "components/Loader";
import moment from "moment";
import Badge from "components/Badge";
import LoanModal from "./LoanModal";
import Alert from "components/Alert";
import { AlertContext } from "context/AlertContext";
import { useNavigate } from "react-router-dom";

const LoansPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const loansQuery = useLoans();
  const createLoanResult = useCreateLoan();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const { setAlert } = useContext(AlertContext);

  const loans = get(loansQuery, "data", []);
  const refetchLoans = get(loansQuery, "refetch");
  const isLoading = get(loansQuery, "isLoading");

  const createLoan = get(createLoanResult, "mutate");
  const isAdding = get(createLoanResult, "isLoading");

  const onAdd = () => setIsFormOpen(true);
  const handleSubmit = (value, { resetForm }) => {
    createLoan(value, {
      onSuccess: () => {
        refetchLoans();
        setIsFormOpen(false);
        resetForm();
        setAlert("Loan has been successfully requested.");
      },
    });
  };

  const handleClickRow = (value) => navigate(`/loans/${value._id}`);

  if (isLoading) return <Loader />;

  return (
    <>
      <Alert />
      <LoanModal
        title={"Request Loan"}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
        loading={isAdding}
        userId={user._id}
      />
      <Table
        rows={loans}
        title={"Loans Table"}
        columns={[
          {
            field: "userId.firstName",
            label: "Name",
            renderCell: (row) => {
              const user = get(row, "userId", {});
              return `${user.firstName} ${user.lastName}`;
            },
          },
          {
            field: "userId.position",
            label: "Position",
          },
          {
            field: "monthsCount",
            label: "Duration",
            numeric: true,
            renderCell: (row) => {
              const monthsCount = row.monthsCount;
              const isPlural = monthsCount > 1;
              if (row.duration === "short") {
                return `${monthsCount} month${
                  isPlural ? "s" : ""
                } (Short Term)`;
              }

              return `${monthsCount} month${isPlural ? "s" : ""} (Long Term)`;
            },
          },
          {
            field: "status",
            label: "Status",
            renderCell: (row) => {
              const type =
                row.status === "approved"
                  ? "success"
                  : row.status === "processing"
                  ? "warning"
                  : row.status === "rejected"
                  ? "danger"
                  : undefined;

              return <Badge type={type}>{row.status}</Badge>;
            },
          },
          {
            field: "amount",
            label: "Amount",
            numeric: true,
            renderCell: (row) => `₱ ${row.amount}`,
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
          "userId.position",
          "duration",
          "monthsCount",
          "createdAt",
          "status",
        ]}
        onAdd={onAdd}
        onClickRow={handleClickRow}
      />
    </>
  );
};

export default LoansPage;
