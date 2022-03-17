import { useQuery, useMutation } from "react-query";
import * as apiLoans from "api/loans";

const key = "loans";

export const useLoans = () => {
  return useQuery([key], () => apiLoans.getLoans());
};

export const useLoan = (id) => {
  return useQuery([key, id], () => apiLoans.getLoan(id));
};

export const useCreateLoan = () => {
  return useMutation(apiLoans.createLoan);
};

export const useSetLoanStatus = () => {
  return useMutation(apiLoans.setLoanStatus);
};
