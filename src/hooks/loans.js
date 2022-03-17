import { useQuery, useMutation } from "react-query";
import * as apiLoans from "api/loans";

const key = "loans";

export const useLoans = () => {
  return useQuery([key], () => apiLoans.getLoans());
};

export const useCreateLoan = () => {
  return useMutation(apiLoans.createLoan);
};
