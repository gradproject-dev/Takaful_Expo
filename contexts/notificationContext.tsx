import { useRegisterPushToken } from "@/hooks/useRegisterPushToken";
import { useNotificationListener } from "@/hooks/useNotificationListener";

const NotificationContext = () => {
  useNotificationListener();
  useRegisterPushToken(); // uses jwt.id internally
  return null;
};

export default NotificationContext;
