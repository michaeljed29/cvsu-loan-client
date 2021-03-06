import React, { useState } from "react";
import { get } from "lodash";
import DashboardPage from "pages/dashboard/DashboardPage";
import LoansPage from "pages/loans/LoansPage";
import LoanPage from "pages/loans/view/LoanPage";
import PaymentsPage from "./pages/payments/PaymentsPage";
import UsersPage from "pages/users/UsersPage";
import UserPage from "./pages/users/view/UserPage";
import CalculatorPage from "pages/calculator/CalculatorPage";
import ProfilePage from "pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";
import FaqsPage from "./pages/FaqsPage";
import NotificationsPage from "pages/notifications/NotificationsPage";
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
import { useNewNotifications } from "hooks/notifications";
import { isEmpty } from "lodash";
import { isAdmin, userLoggedIn } from "util/index";
import { borderRadius } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import icon from "images/cvsu.jpg";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useUser } from "hooks/users";
import PaymentsIcon from "@mui/icons-material/Payments";

const drawerWidth = 240;
const pathTitles = {
  "/": "Dashboard",
  "/loans": "Loans",
  "/payments": "Payments",
  "/users": "Users",
  "/calculator": "Calculator",
  "/reports": "Reports",
  "/faqs": "FAQs",
  "/notifications": "Notifications",
  "/profile": "Profile",
};

const App = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userQuery = useUser(userLoggedIn._id);

  const matches = useMediaQuery("(max-width:600px)");

  const newNotificationsQuery = useNewNotifications({
    userId: isAdmin() ? "" : userLoggedIn._id,
  });

  const user = get(userQuery, "data", {});
  const newNotificationCount = get(newNotificationsQuery, "data.count", 0);
  const isLoading = get(newNotificationsQuery, "isLoading");

  const handleDrawerToggle = (e) => {
    if (matches) setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar style={{ background: "#ffc810" }}>
        <img style={{ height: 50, margin: "0 auto" }} src={icon} />
      </Toolbar>
      <Divider />
      <List>
        {isAdmin() && (
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
        )}

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
          selected={pathname.includes("/payments")}
          button
          key="Payments"
          component={Link}
          to="/payments"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <PaymentsIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>

        {isAdmin() && (
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
        )}

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

          {newNotificationCount > 0 && !isLoading && (
            <span
              style={{
                background: "#175a08",
                padding: "2px 8px",
                color: "#fff",
                borderRadius: "50%",
                fontSize: 13,
              }}
            >
              {newNotificationCount}
            </span>
          )}
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          selected={pathname.includes("/profile")}
          button
          key="Profile"
          component={Link}
          to="/profile"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        {isAdmin() && (
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
        )}

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

  if (isEmpty(userLoggedIn)) return <Navigate to="/login" replace={true} />;

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
          <p style={{ margineLeft: "auto" }}>{`Hello, ${
            isAdmin() ? "Admin" : get(user, "firstName", "")
          }`}</p>
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
            {<Route path="/" element={<DashboardPage />} />}

            <Route path="/loans/:id" element={<LoanPage />} />
            <Route path="/loans" element={<LoansPage />} />

            <Route path="/payments" element={<PaymentsPage />} />

            {isAdmin() && (
              <>
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="/users" element={<UsersPage />} />
              </>
            )}

            <Route path="/calculator" element={<CalculatorPage />} />

            <Route path="/profile" element={<ProfilePage />} />

            {isAdmin() && <Route path="/reports" element={<ReportsPage />} />}

            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
