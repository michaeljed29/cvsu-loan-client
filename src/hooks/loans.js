import { useQuery, useMutation } from "react-query";
import * as apiLoans from "api/loans";

const key = "loans";

export const useLoans = (pageInfo) => {
  return useQuery([key], () => apiLoans.getLoans(pageInfo));
};

export const useLoan = (id, options) => {
  return useQuery([key, id], () => apiLoans.getLoan(id), options);
};

export const useCreateLoan = () => {
  return useMutation(apiLoans.createLoan);
};

export const useSetLoanStatus = () => {
  return useMutation(apiLoans.setLoanStatus);
};

export const useSetLoanMonthly = () => {
  return useMutation(apiLoans.setLoanMonthly);
};

export const useSetLoanProceeds = () => {
  return useMutation(apiLoans.setLoanProceeds);
};
