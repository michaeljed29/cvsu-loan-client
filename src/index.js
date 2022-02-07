import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Theme, { GlobalStyles } from "./styles/Theme";
import CssBaseline from "@mui/material/CssBaseline";
import Provider from "./Provider";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <GlobalStyles />
      <Theme>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
