import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import MoneyIcon from "@mui/icons-material/Money";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getInterest, getServiceFee, getInsurance } from "./util";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    // flexDirection: "column",
  },
  paper: {
    // marginTop: 20,
    padding: 30,
    marginBottom: 20,
    flex: 1,
  },
  instruction: {
    // fontStyle: "italic",
    fontSize: 18,
    marginBottom: 20,
    color: "",
  },
  btnCalculate: {
    marginTop: 20,
  },
  results: {
    flex: 1,
    padding: 20,
  },
  list: {
    listStyle: "none",
  },
  item: {
    display: "flex",
    "&:not(:last-child)": {
      marginBottom: 8,
    },
    color: "#909090",
  },
  label: {
    width: 200,

    "&.emphasize": {
      fontSize: 19,
      color: "initial",
    },
  },
  value: {
    fontWeight: 600,
    "&.emphasize": {
      fontSize: 20,
      color: "initial",
    },
  },
}));

const CalculatorPage = () => {
  const classes = useStyles();

  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState("");
  const [monthsCount, setMonthsCount] = useState("");
  const [interest, setInterest] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [monthData, setMonthData] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const disabled =
    parseFloat(amount) < 0 ||
    parseFloat(amount) === 0 ||
    amount === "" ||
    period === "" ||
    monthsCount === "";

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

  const handleCalculate = () => {
    const parsedAmount = parseFloat(amount || 0);
    const interest = getInterest(parsedAmount, period);
    const serviceFee = getServiceFee(parsedAmount);
    const insurance = getInsurance(parsedAmount, monthsCount);

    const estimatedMonthly =
      (parsedAmount + interest + serviceFee + insurance) / monthsCount;

    setInterest(interest);
    setServiceFee(serviceFee);
    setInsurance(insurance);
    setMonthly(estimatedMonthly);
    setShowResult(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={6}>
        <Paper className={classes.paper} elevation={2}>
          <p className={classes.instruction}>
            Please fill up all needed information
          </p>

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
          />

          <FormControl
            style={{ marginBottom: 20 }}
            fullWidth
            variant="filled"
            margin="none"
          >
            <InputLabel id="demo-simple-select-label">
              Payment Period
            </InputLabel>
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
            <InputLabel id="demo-simple-select-label">
              Number of Months
            </InputLabel>
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

          <Button
            className={classes.btnCalculate}
            variant="contained"
            onClick={handleCalculate}
            disabled={disabled}
            fullWidth
          >
            Calculate
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
        {showResult && (
          <div className={classes.results}>
            <Typography
              style={{ marginBottom: 10 }}
              variant="h5"
              component="h5"
            >
              Results:
            </Typography>
            <ul className={classes.list}>
              <li className={classes.item}>
                <div className={classes.label}>Interest</div>
                <div className={classes.value}>{`₱ ${interest.toFixed(
                  2
                )}`}</div>
              </li>
              <li className={classes.item}>
                <div className={classes.label}>Service Fee</div>
                <div className={classes.value}>{`₱ ${serviceFee.toFixed(
                  2
                )}`}</div>
              </li>
              <li className={classes.item}>
                <div className={classes.label}>Insurance</div>
                <div className={classes.value}>{`₱ ${insurance.toFixed(
                  2
                )}`}</div>
              </li>
              <li className={classes.item}>
                <div className={`${classes.label} emphasize`}>
                  Estimated Monthly
                </div>
                <div className={`${classes.value} emphasize`}>
                  {`₱ ${monthly.toFixed(2)}`}
                </div>
              </li>
            </ul>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default CalculatorPage;
