import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormModal from "components/FormModal";
import InputAdornment from "@mui/material/InputAdornment";
import MoneyIcon from "@mui/icons-material/Money";

const MonthlyModal = (props) => {
  const {
    isOpen,
    title = "Add",
    onClose,
    onSubmit,
    size = "md",
    loading,
    monthly,
  } = props;

  const [amount, setAmount] = React.useState(monthly || 0);

  const resetForm = () => setAmount(monthly || 0);

  const handleChangeAmount = (e) => setAmount(e.target.value);

  return (
    <FormModal
      fullWidth
      size={size}
      open={isOpen}
      onClose={onClose}
      title={title}
      onSubmit={() => onSubmit(amount, { resetForm, setAmount })}
      onClose={() => {
        resetForm();
        onClose();
      }}
      loading={loading}
      addLabel="Update"
    >
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MoneyIcon />
            </InputAdornment>
          ),
        }}
        label="Amount"
        variant="filled"
        type="number"
        fullWidth
        onChange={handleChangeAmount}
        value={amount}
      />
    </FormModal>
  );
};

export default MonthlyModal;
