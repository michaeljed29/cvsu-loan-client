import api from "./util";

export const getPayments = async ({ userId = "", loanId = "" }) => {
  try {
    const { data } = await api.get(
      `/payments?userId=${userId}&loanId=${loanId}`
    );

    return data;
  } catch (error) {
    return error.message;
  }
};

export const createPayment = async (value) => {
  try {
    const { data } = await api.post("/payments", value);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
