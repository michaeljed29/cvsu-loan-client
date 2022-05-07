import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormModal from "components/FormModal";
import InputAdornment from "@mui/material/InputAdornment";
import MoneyIcon from "@mui/icons-material/Money";

const PaymentModal = (props) => {
  const {
    isOpen,
    title = "Add",
    onClose,
    onSubmit,
    size = "md",
    loading,
    payment,
    officialReceipt: officialReceiptProp,
  } = props;

  const [amount, setAmount] = React.useState(payment || 0);
  const [officialReceipt, setOfficialReceipt] = React.useState(
    officialReceiptProp || ""
  );

  const resetForm = () => {
    setAmount(payment || 0);
    setOfficialReceipt(officialReceiptProp || "");
  };

  const handleChangeAmount = (e) => setAmount(e.target.value);
  const handleChangeReceipt = (e) => setOfficialReceipt(e.target.value);

  return (
    <FormModal
      fullWidth
      size={size}
      open={isOpen}
      onClose={onClose}
      title={title}
      onSubmit={() => onSubmit(amount, officialReceipt, { resetForm })}
      onClose={() => {
        resetForm();
        onClose();
      }}
      loading={loading}
      addLabel="Confirm"
    >
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MoneyIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: 20 }}
        label="Amount"
        variant="filled"
        type="number"
        fullWidth
        onChange={handleChangeAmount}
        value={amount}
      />
      <TextField
        label="OR (Official Receipt)"
        variant="filled"
        type="text"
        fullWidth
        onChange={handleChangeReceipt}
        value={officialReceipt}
      />
    </FormModal>
  );
};

export default PaymentModal;
