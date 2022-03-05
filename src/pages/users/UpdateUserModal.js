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

const UpdateUserModal = (props) => {
  const {
    isOpen,
    title = "Add",
    onClose,
    onSubmit,
    size = "md",
    currentUser = {},
  } = props;
  // const [open, setOpen] = React.useState(false);

  console.log("currentUser", currentUser);

  const [user, setUser] = React.useState(currentUser);

  const resetForm = () => setUser({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  React.useEffect(() => setUser(currentUser), [currentUser]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog fullWidth size={size} open={isOpen} onClose={onClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill up all needed information
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(user, { resetForm })}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateUserModal;