import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MoneyIcon from "@mui/icons-material/Money";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormModal from "components/FormModal";

const LoanModal = (props) => {
  const {
    isOpen,
    title = "Add",
    onClose,
    onSubmit,
    size = "md",
    loading,
    userId,
  } = props;

  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState("");
  const [monthsCount, setMonthsCount] = useState(0);
  const [monthData, setMonthData] = useState([]);

  const resetForm = () => {
    setAmount(0);
    setPeriod("");
    setMonthsCount(0);
    setMonthData([]);
  };

  const handleChange = (e) => {
    if (e.target.value === "short") {
      setMonthsCount("1");
      setMonthData([1, 2, 3, 4, 5, 6]);
    }
    if (e.target.value === "long") {
      setMonthsCount("7");
      setMonthData([
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      ]);
    }
    setPeriod(e.target.value);
  };

  const handleChangeMonthsCount = (e) => setMonthsCount(e.target.value);

  const handleChangeAmount = (e) => setAmount(e.target.value);

  const disabled =
    parseFloat(amount) < 0 ||
    parseFloat(amount) === 0 ||
    amount === "" ||
    period === "" ||
    monthsCount === "";

  return (
    <FormModal
      fullWidth
      size={size}
      open={isOpen}
      onClose={onClose}
      title={title}
      onSubmit={() =>
        onSubmit(
          {
            userId,
            amount: parseFloat(amount),
            duration: period,
            monthsCount: parseInt(monthsCount),
          },
          { resetForm }
        )
      }
      onClose={onClose}
      loading={loading}
      buttonProps={{ disabled: disabled || loading }}
    >
      <TextField
        style={{ marginBottom: 20 }}
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

      <FormControl
        style={{ marginBottom: 20 }}
        fullWidth
        variant="filled"
        margin="none"
      >
        <InputLabel id="demo-simple-select-label">Payment Period</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={period}
          label="Payment Period"
          name="duration"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MoneyIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={"short"}>SHORT TERM (1-6 months)</MenuItem>
          <MenuItem value={"long"}>LONG TERM (7-24 months)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth variant="filled" margin="none">
        <InputLabel id="demo-simple-select-label">Number of Months</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={monthsCount}
          label="Payment Period"
          name="monthsCount"
          onChange={handleChangeMonthsCount}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MoneyIcon />
              </InputAdornment>
            ),
          }}
        >
          {monthData.map((month, i) => (
            <MenuItem key={i} value={month}>
              {`${month} month${month === 1 ? "" : "s"}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormModal>
  );
};

export default LoanModal;
