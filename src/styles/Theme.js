import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiGlobalStyles from "@mui/material/GlobalStyles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        h1 {
          color: grey;
        },
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
      `,
    },
  },
  palette: {
    primary: {
      main: "#155906",
    },
  },
});

const Theme = (props) => {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;

const global = { "*": { margin: 0, padding: 0, boxSizing: "border-box" } };

export const GlobalStyles = () => <MuiGlobalStyles styles={global} />;
