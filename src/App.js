import React, { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoansPage from "pages/loans/LoansPage";
import LoanPage from "pages/loans/view/LoanPage";
import UsersPage from "pages/users/UsersPage";
import UserPage from "./pages/users/view/UserPage";
import CalculatorPage from "pages/calculator/CalculatorPage";
import ReportsPage from "./pages/ReportsPage";
import FaqsPage from "./pages/FaqsPage";
import NotificationsPage from "./pages/NotificationsPage";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import GroupIcon from "@mui/icons-material/Group";
import CalculateIcon from "@mui/icons-material/Calculate";
import AssessmentIcon from "@mui/icons-material/Assessment";
import QuizIcon from "@mui/icons-material/Quiz";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { isEmpty } from "lodash";

const drawerWidth = 240;
const pathTitles = {
  "/": "Dashboard",
  "/loans": "Loans",
  "/users": "Users",
  "/calculator": "Calculator",
  "/reports": "Reports",
  "/faqs": "FAQs",
  "/notifications": "Notifications",
};

const App = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem
          selected={pathname === "/"}
          button
          key="Dashboard"
          component={Link}
          to="/"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          selected={pathname.includes("/loans")}
          button
          key="Loans"
          component={Link}
          to="/loans"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Loans" />
        </ListItem>
        <ListItem
          selected={pathname.includes("/users")}
          button
          key="Users"
          component={Link}
          to="/users"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem
          selected={pathname.includes("/calculator")}
          button
          key="Calculator"
          component={Link}
          to="/calculator"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary="Calculator" />
        </ListItem>
        <ListItem
          selected={pathname.includes("/reports")}
          button
          key="Reports"
          component={Link}
          to="/reports"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem
          selected={pathname.includes("/faqs")}
          button
          key="FAQs"
          component={Link}
          to="/faqs"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <QuizIcon />
          </ListItemIcon>
          <ListItemText primary="FAQs" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          selected={pathname.includes("/notifications")}
          button
          key="Notifications"
          component={Link}
          to="/notifications"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button key="Logout" onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (isEmpty(user)) return <Navigate to="/login" replace={true} />;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pathTitles[pathname]}
          </Typography>
          <div style={{ flex: 1 }}></div>
          <p style={{ margineLeft: "auto" }}>{`Hello, ${user.firstName}`}</p>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/loans/:id" element={<LoanPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
