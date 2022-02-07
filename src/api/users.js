import api from "./util";

export const getUsers = async () => {
  try {
    const { data } = await api.get("/users");

    return data;
  } catch (error) {
    return error.message;
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}`);

    return data;
  } catch (error) {
    return error.message;
  }
};

export const createUser = async (value) => {
  try {
    const { data } = await api.post("/users", value);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async ({ id, value }) => {
  try {
    const { data } = await api.patch(`/users/${id}`, value);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`/users/${id}`);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (values) => {
  try {
    const { data } = await api.post("/users/login", values);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
