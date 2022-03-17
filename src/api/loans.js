import api from "./util";

export const getLoans = async () => {
  try {
    const { data } = await api.get("/loans");

    return data;
  } catch (error) {
    return error.message;
  }
};

export const getLoan = async (id) => {
  try {
    const { data } = await api.get(`/loans/${id}`);

    return data;
  } catch (error) {
    return error.message;
  }
};

export const createLoan = async (value) => {
  try {
    const { data } = await api.post("/loans", value);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setLoanStatus = async ({ id, value }) => {
  try {
    const { data } = await api.patch(`/loans/${id}`, value);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
