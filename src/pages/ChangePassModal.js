import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormModal from "components/FormModal";
import Link from "@mui/material/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ChangePassModal = (props) => {
  const {
    isOpen,
    title = "Add",
    onClose,
    onSubmit,
    size = "md",
    loading,
  } = props;

  const [info, setInfo] = React.useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isShow, setIsShow] = React.useState(false);

  const resetForm = () => {
    setInfo({});
    setIsShow(false);
  };

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  return (
    <FormModal
      fullWidth
      size={size}
      open={isOpen}
      onClose={onClose}
      title={title}
      onSubmit={() => onSubmit(info, { resetForm })}
      onClose={() => {
        resetForm();
        onClose();
      }}
      loading={loading}
      addLabel="Update"
    >
      <TextField
        style={{ marginTop: 0 }}
        margin="normal"
        name="newPassword"
        label="New Password"
        type={isShow ? "text" : "password"}
        fullWidth
        variant="filled"
        value={info.newPassword}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        name="confirmNewPassword"
        label="Confirm New Password"
        type={isShow ? "text" : "password"}
        fullWidth
        variant="filled"
        value={info.confirmNewPassword}
        onChange={handleChange}
      />

      <div style={{ textAlign: "center" }}>
        <Link
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 15,
          }}
          href=""
          onClick={handleToggle}
          underline="none"
        >
          {isShow ? (
            <>
              <span>Hide</span>
              <VisibilityOffIcon style={{ marginLeft: 5 }} />
            </>
          ) : (
            <>
              <span>Show</span>
              <VisibilityIcon style={{ marginLeft: 5 }} />
            </>
          )}
        </Link>
      </div>
    </FormModal>
  );
};

export default ChangePassModal;
