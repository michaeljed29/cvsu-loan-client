import React, { useState } from "react";
import { get, isEmpty } from "lodash";
import { useNotifications } from "hooks/notifications";
import Loader from "components/Loader";
import Pagination from "@mui/material/Pagination";
import Card from "./Card";

const NotificationsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationPerPage, setNotificationPerPage] = useState(10);

  const isAdmin = user.type === "admin";

  const notificationsQuery = useNotifications({
    userId: isAdmin ? "" : user._id,
  });

  const notifications = get(notificationsQuery, "data", []).filter(
    (notification) => notification.userId
  );
  const isLoading = get(notificationsQuery, "isLoading");

  const indexOfLastNotification = currentPage * notificationPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  if (isLoading) return <Loader />;

  if (isEmpty(notifications))
    return (
      <div
        style={{ margin: "30px auto", textAlign: "center", color: "#717171" }}
      >
        No notifcations to show
      </div>
    );

  return (
    <div>
      {currentNotifications.map((notification) => (
        <Card notification={notification} />
      ))}
      <Pagination
        style={{ marginTop: 25 }}
        shape="rounded"
        count={Math.ceil(notifications.length / notificationPerPage)}
        color="primary"
        onChange={(e, number) => {
          e.preventDefault();
          setCurrentPage(number);
        }}
      />
    </div>
  );
};

export default NotificationsPage;
