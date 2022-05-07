import { useQuery, useMutation } from "react-query";
import * as apiPayments from "api/payments";

const key = "payments";

export const usePayments = (pageInfo) => {
  return useQuery(
    [
      key,
      {
        userId: pageInfo.userId,
        loanId: pageInfo.loanId,
        officialReceipt: pageInfo.officialReceipt,
      },
    ],
    () => apiPayments.getPayments(pageInfo),
    {
      keepPreviousData: true,
    }
  );
};

export const useCreatePayment = () => {
  return useMutation(apiPayments.createPayment);
};
