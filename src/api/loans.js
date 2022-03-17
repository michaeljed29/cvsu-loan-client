import api from "./util";

export const getLoans = async () => {
  try {
    const { data } = await api.get("/loans");

    return data;
  } catch (error) {
    return error.message;
  }
};

export const getLoan = async (id) => {};
