import { useQuery, useMutation } from "react-query";
import * as apiUsers from "../api/users";

const key = "users";

export const useUsers = () => {
  return useQuery([key], () => apiUsers.getUsers());
};

export const useUser = (id) => {
  return useQuery([key, id], () => apiUsers.getUser(id));
};

export const useCreateUser = () => {
  return useMutation(apiUsers.createUser);
};

export const useUpdateUser = () => {
  return useMutation(apiUsers.updateUser);
};

export const useDeleteUser = () => {
  return useMutation(apiUsers.deleteUser);
};

export const useLogin = () => {
  return useMutation(apiUsers.login);
};
