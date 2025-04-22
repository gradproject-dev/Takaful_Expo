import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export function useNotificationListener() {
  useEffect(() => {
    const receivedListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("📩 Notification received:", notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("🔔 Notification tapped:", response);
      });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, []);
}
