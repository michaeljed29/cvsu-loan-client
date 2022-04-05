import { useQuery, useMutation } from "react-query";
import * as apiNotifications from "api/notifications";

const key = "notifications";

export const useNotifications = (pageInfo) => {
  return useQuery([key, { userId: pageInfo.userId }], () =>
    apiNotifications.getNotifications(pageInfo)
  );
};

export const useNewNotifications = (pageInfo) => {
  return useQuery([key + "count", { userId: pageInfo.userId }], () =>
    apiNotifications.getNewNotifications(pageInfo)
  );
};

export const useSetNotificationStatus = () => {
  return useMutation(apiNotifications.setNotificationStatus);
};
