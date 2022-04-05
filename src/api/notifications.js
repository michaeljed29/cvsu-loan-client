import api from "./util";

export const getNotifications = async (pageInfo) => {
  const { userId } = pageInfo;
  try {
    const { data } = await api.get(`/notifications?userId=${userId}`);

    return data;
  } catch (error) {
    return error.message;
  }
};

export const getNewNotifications = async (pageInfo) => {
  const { userId } = pageInfo;
  try {
    const { data } = await api.get(`/notifications/count?userId=${userId}`);

    return data;
  } catch (error) {
    return error.message;
  }
};

export const setNotificationStatus = async ({ id, status }) => {
  try {
    const { data } = await api.patch(`/notifications/${id}?seen=${status}`);

    if (data.message) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
