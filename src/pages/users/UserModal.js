import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormModal from "components/FormModal";

const UserModal = (props) => {
  const {
    isOpen,
    title = "Add",
    onClose,
    onSubmit,
    size = "md",
    loading,
  } = props;

  const [department, setDepartment] = React.useState("");

  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    mobileNumber: "",
    department: "",
    position: "",
  });

  const resetForm = () => setUser({});

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <FormModal
      fullWidth
      size={size}
      open={isOpen}
      onClose={onClose}
      title={title}
      onSubmit={() => onSubmit(user, { resetForm })}
      onClose={onClose}
      loading={loading}
    >
      <TextField
        margin="normal"
        name="firstName"
        label="First Name"
        type="text"
        fullWidth
        variant="filled"
        value={user.firstName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        name="lastName"
        label="Last Name"
        type="text"
        fullWidth
        variant="filled"
        value={user.lastName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        name="username"
        label="Username"
        type="text"
        fullWidth
        variant="filled"
        value={user.username}
        onChange={handleChange}
      />

      <TextField
        margin="normal"
        name="mobileNumber"
        label="Mobile Number"
        type="text"
        fullWidth
        variant="filled"
        value={user.mobileNumber}
        onChange={handleChange}
      />

      <TextField
        margin="normal"
        name="address"
        label="Address"
        type="text"
        fullWidth
        variant="filled"
        value={user.address}
        onChange={handleChange}
      />
      <FormControl fullWidth variant="filled" margin="normal">
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user.department}
          label="Department"
          name="department"
          onChange={handleChange}
        >
          <MenuItem value={"Operations"}>Operations</MenuItem>
          <MenuItem value={"IT"}>IT</MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        name="position"
        label="Position"
        type="text"
        fullWidth
        variant="filled"
        value={user.position}
        onChange={handleChange}
      />
    </FormModal>
  );
};

export default UserModal;
