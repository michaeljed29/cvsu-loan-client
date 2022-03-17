import React, { useState } from "react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "hooks/users";
import { get } from "lodash";
import Table from "components/Table";
import FormDialog from "./UserModal";
import UpdateUserModal from "./UpdateUserModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningIcon from "@mui/icons-material/Warning";
import Loader from "components/Loader";

import { omit } from "lodash";

const UsersPage = () => {
  const usersQuery = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState("");
  const createUserResult = useCreateUser();
  const updateUserResult = useUpdateUser();
  const deleteUserResult = useDeleteUser();
  const navigate = useNavigate();

  const users = get(usersQuery, "data", []);
  const isLoading = get(usersQuery, "isLoading");
  const refetchUsers = get(usersQuery, "refetch");

  const createUser = get(createUserResult, "mutate");
  const updateUser = get(updateUserResult, "mutate");
  const deleteUser = get(deleteUserResult, "mutate");

  if (isLoading) return <Loader />;

  const onAdd = () => {
    console.log("adding");
    setIsFormOpen(true);
  };

  const onEdit = (value) => {
    console.log("edit");
    console.log("value", value);
    setCurrentUser(value);
    setIsFormEditOpen(true);
  };

  const onDelete = (value) => {
    console.log("delete");
    console.log("value", value);
    setCurrentUser(value);
    setIsConfirmationOpen(true);
  };

  const handleDelete = () => {
    deleteUser(currentUser._id, {
      onSuccess: () => {
        refetchUsers();
        setIsConfirmationOpen(false);
        setIsOpenSnackbar(true);
        setMessage("User has been successfully deleted.");
      },
    });
  };

  const handleSubmit = (value, { resetForm }) => {
    createUser(value, {
      onSuccess: () => {
        refetchUsers();
        setIsFormOpen(false);
        setIsOpenSnackbar(true);
        resetForm();
        setMessage("User has been successfully added.");
      },
    });
  };

  const handleEdit = (value, { resetForm }) => {
    console.log(
      'omit(value, ["password"]),',
      omit(value, ["password", "createdAt"])
    );
    updateUser(
      {
        id: value._id,
        value: value,
      },
      {
        onSuccess: () => {
          refetchUsers();
          setIsFormEditOpen(false);
          setIsOpenSnackbar(true);
          resetForm();
          setMessage("User has been successfully updated.");
        },
      }
    );
  };

  const handleClickRow = (value) => navigate(`/users/${value._id}`);

  return (
    <>
      <Snackbar
        open={isOpenSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={() => {
          setIsOpenSnackbar(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }} elevation={6}>
          {message}
        </Alert>
      </Snackbar>
      <FormDialog
        title={"Add user"}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
      />

      <UpdateUserModal
        onClose={() => setIsFormEditOpen(false)}
        isOpen={isFormEditOpen}
        onSubmit={handleEdit}
        currentUser={currentUser}
      />

      <div>
        <Dialog
          open={isConfirmationOpen}
          onClose={() => {
            setIsConfirmationOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete User?</DialogTitle>
          <DialogContent style={{ display: "flex", alignItems: "center" }}>
            <WarningIcon color="warning" fontSize="large" />
            <DialogContentText style={{ marginLeft: 15 }}>
              Are you sure you want to delete user? This action can not be
              revert
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsConfirmationOpen(false);
              }}
            >
              No
            </Button>
            <Button onClick={handleDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
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
