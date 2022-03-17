import React from "react";
import { get } from "lodash";
import { useLoans } from "hooks/loans";
import Table from "components/Table";
import Loader from "components/Loader";
import moment from "moment";
import Badge from "components/Badge";

const LoansPage = () => {
  const loansQuery = useLoans();

  const loans = get(loansQuery, "data", []);
  const isLoading = get(loansQuery, "isLoading");

  if (isLoading) return <Loader />;

  return (
    <Table
      rows={loans}
      title={"Loans Table"}
      columns={[
        {
          field: "firstName",
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
          field: "duration",
          label: "Duration",
          renderCell: (row) => {
            const monthsCount = row.monthsCount;
            const isPlural = monthsCount > 1;
            if (row.duration === "short") {
              return `${monthsCount} month${isPlural ? "s" : ""} (Short Term)`;
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
                ? "sucess"
                : row.status === "processing"
                ? "warning"
                : undefined;

            return <Badge type={type}>{row.status}</Badge>;
          },
        },
        {
          field: "amount",
          label: "Amount",
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
    />
  );
};

export default LoansPage;
