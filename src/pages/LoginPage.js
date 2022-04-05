import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import loginImage from "./../images/login.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useLogin } from "../hooks/users";
import { get } from "lodash";
import { useNavigate, Navigate } from "react-router-dom";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  box: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E5E5E5",
  },
  paper: {
    borderRadius: "0px !important",
    width: 1174,
    maxWidth: 1174,
    height: 600,
  },
  container: {
    height: "inherit",
  },
  left: {
    background: "#155906",
    borderRadius: "0",
    height: "inherit",
    display: "flex",
    flexDirection: "column !important",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
  },
  form: {
    padding: 62,
  },
  formTitle: {
    marginBottom: "40px !important",
  },
  textField: {
    "&:not(:last-of-type)": {
      marginBottom: 40,
    },
    "& .MuiInputAdornment-root": {
      marginTop: "0 !important",
    },
  },
  notice: {
    marginTop: "25px !important",
    color: "#008F00",
  },
  loginBtn: {
    marginTop: "30px !important",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const loginResult = useLogin();
  const navigate = useNavigate();

  const login = get(loginResult, "mutate");
  const isLoading = get(loginResult, "isLoading");

  const handleLogin = (e) => {
    e.preventDefault();
    if (isEmpty(username) || isEmpty(password)) {
      setIsOpenAlert(true);
      setMessage("All fields are required");
      return;
    }
    login(
      {
        username,
        password,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("user", JSON.stringify(data));

          if (data.type !== "admin") {
            window.location.href = "/loans";
            // navigate("/loans");
            return;
          }
          window.location.href = "/";
          // navigate("/");
        },
        onError: (error) => {
          setIsOpenAlert(true);
          setMessage(error.message);
        },
      }
    );
  };

  useEffect(() => {
    if (isOpenAlert) {
      setTimeout(() => {
        setIsOpenAlert(false);
        setMessage("");
      }, 5000);
    }
  }, [isOpenAlert]);

  if (localStorage.getItem("user")) return <Navigate to="/" replace={true} />;

  return (
    <Box
      className={classes.box}
      sx={{
        display: "flex",
      }}
    >
      <Paper className={classes.paper} elevation={3}>
        <Grid className={classes.container} container>
          <Grid className={classes.left} item xs={12} sm={6}>
            <Typography
              className={classes.title}
              variant="h4"
              gutterBottom
              component="div"
            >
              LOGIN
            </Typography>
            <div>
              <img src={loginImage} />
            </div>
          </Grid>
          <Grid
            className={classes.form}
            container
            item
            xs={12}
            sm={6}
            alignItems="center"
            justifyContent="center"
          >
            <div style={{ width: "100%" }}>
              <Fade in={isOpenAlert}>
                <Alert
                  // action={
                  //   <IconButton
                  //     aria-label="close"
                  //     color="inherit"
                  //     size="small"
                  //     onClick={() => {
                  //       setOpen(false);
                  //     }}
                  //   >
                  //     <CloseIcon fontSize="inherit" />
                  //   </IconButton>
                  // }
                  sx={{ mb: 2 }}
                  severity="error"
                >
                  {message}
                </Alert>
              </Fade>
              <form onSubmit={handleLogin}>
                <Typography
                  className={classes.formTitle}
                  variant="h5"
                  gutterBottom
                  component="div"
                >
                  Get’s Started
                </Typography>
                <TextField
                  className={classes.textField}
                  id="filled-basic"
                  label="Username"
                  type="text"
                  variant="filled"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  className={classes.textField}
                  id="filled-basic"
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Typography className={classes.notice} variant="body2">
                  Please login using your credentials provided by the admin
                </Typography>
                <Button
                  className={classes.loginBtn}
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  {isLoading ? "Logging In..." : " Login"}
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LoginPage;
