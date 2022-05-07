import React, { useState, useContext } from "react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "hooks/users";
import { get } from "lodash";
import Table from "components/Table";
import UserModal from "./UserModal";
import UpdateUserModal from "./UpdateUserModal";
import ConfirmModal from "components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import Loader from "components/Loader";
import Alert from "components/Alert";
import { AlertContext } from "context/AlertContext";

const UsersPage = () => {
  const usersQuery = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const createUserResult = useCreateUser();
  const updateUserResult = useUpdateUser();
  const deleteUserResult = useDeleteUser();
  const navigate = useNavigate();

  const { setAlert } = useContext(AlertContext);

  const users = get(usersQuery, "data", []);
  const isLoading = get(usersQuery, "isLoading");
  const refetchUsers = get(usersQuery, "refetch");

  const createUser = get(createUserResult, "mutate");
  const isAdding = get(createUserResult, "isLoading");
  const updateUser = get(updateUserResult, "mutate");
  const isUpdating = get(updateUserResult, "isLoading");
  const deleteUser = get(deleteUserResult, "mutate");
  const isDeleting = get(deleteUserResult, "isLoading");

  if (isLoading) return <Loader />;

  const onAdd = () => setIsFormOpen(true);

  const onEdit = (value) => {
    setCurrentUser(value);
    setIsFormEditOpen(true);
  };

  const onDelete = (value) => {
    setCurrentUser(value);
    setIsConfirmationOpen(true);
  };

  const handleDelete = () => {
    deleteUser(currentUser._id, {
      onSuccess: () => {
        refetchUsers();
        setIsConfirmationOpen(false);
        setAlert("User has been successfully deleted.");
      },
    });
  };

  const handleSubmit = (value, { resetForm }) => {
    createUser(
      {
        ...value,
        department: value.otherDepartment || value.department,
      },
      {
        onSuccess: () => {
          refetchUsers();
          setIsFormOpen(false);
          resetForm();
          setAlert("User has been successfully added.");
        },
      }
    );
  };

  const handleEdit = (value, { resetForm }) => {
    updateUser(
      {
        id: value._id,
        value: {
          ...value,
          department: value.otherDepartment || value.department,
        },
      },
      {
        onSuccess: () => {
          refetchUsers();
          setIsFormEditOpen(false);
          resetForm();
          setAlert("User has been successfully updated.");
        },
      }
    );
  };

  const handleClickRow = (value) => navigate(`/users/${value._id}`);

  return (
    <>
      <Alert />
      <UserModal
        title={"Add user"}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
        loading={isAdding}
      />

      <UpdateUserModal
        onClose={() => setIsFormEditOpen(false)}
        isOpen={isFormEditOpen}
        onSubmit={handleEdit}
        currentUser={currentUser}
        loading={isUpdating}
      />

      <div>
        <ConfirmModal
          open={isConfirmationOpen}
          title="Delete User?"
          text="Are you sure you want to delete user? This action can not be
          revert"
          icon={<WarningIcon color="warning" fontSize="large" />}
          loading={isDeleting}
          onClose={() => {
            setIsConfirmationOpen(false);
          }}
          onConfirm={handleDelete}
        />
      </div>
      <div>
        <Table
          rows={users}
          title={"Users Table"}
          columns={[
            {
              field: "firstName",
              label: "First Name",
            },
            {
              field: "lastName",
              label: "Last Name",
            },
            {
              field: "position",
              label: "Position",
            },
            {
              field: "department",
              label: "Department",
              renderCell: (row) => row.otherDepartment || row.department,
            },
          ]}
          searchKeys={["firstName", "lastName", "position", "department"]}
          onAdd={onAdd}
          onDelete={onDelete}
          onClickRow={handleClickRow}
          onEdit={onEdit}
        />
      </div>
    </>
  );
};

export default UsersPage;
