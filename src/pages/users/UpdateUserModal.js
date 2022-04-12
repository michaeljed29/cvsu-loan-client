import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormModal from "components/FormModal";

const UpdateUserModal = (props) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    size = "md",
    currentUser = {},
    loading,
  } = props;

  const [user, setUser] = React.useState(currentUser);

  const resetForm = () => setUser({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  React.useEffect(() => setUser(currentUser), [currentUser]);

  return (
    <FormModal
      fullWidth
      size={size}
      open={isOpen}
      onClose={onClose}
      title={"Update User"}
      onSubmit={() => onSubmit(user, { resetForm })}
      onClose={onClose}
      loading={loading}
      addLabel="Update"
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
          <MenuItem
            value={
              "College Of Agriculture, Food, Environment And Natural Resources"
            }
          >
            College Of Agriculture, Food, Environment And Natural Resources
          </MenuItem>
          <MenuItem value={"College Of Arts And Science"}>
            College Of Arts And Science
          </MenuItem>
          <MenuItem value={"College Of Criminal Justice"}>
            College Of Criminal Justice
          </MenuItem>
          <MenuItem value={"College Of Education"}>
            College Of Education
          </MenuItem>
          <MenuItem
            value={"College Of Economics, Management And Development Studies"}
          >
            College Of Economics, Management And Development Studies
          </MenuItem>
          <MenuItem value={"College Of Engineering And Information Technology"}>
            College Of Engineering And Information Technology
          </MenuItem>
          <MenuItem value={"College Of Nursing"}>College Of Nursing</MenuItem>
          <MenuItem
            value={"College Of Sports, Physical Education And Recreation"}
          >
            College Of Sports, Physical Education And Recreation
          </MenuItem>
          <MenuItem
            value={"College Of Veterinary Medicine And Biomedical Sciences"}
          >
            College Of Veterinary Medicine And Biomedical Sciences
          </MenuItem>
          <MenuItem
            value={"Office Of The Graduate Studies / Open Learning College"}
          >
            Office Of The Graduate Studies / Open Learning College
          </MenuItem>
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

export default UpdateUserModal;
