import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { BACKENDURL } from "@/constants";
import { useAuth } from "@/contexts/authContext";

export function useRegisterPushToken() {
  const { auth } = useAuth();
  const hasRun = useRef(false);
  useEffect(() => {
    if (!auth || hasRun.current) return;

    const registerToken = async () => {
      hasRun.current = true; // Prevent reruns

      if (!Device.isDevice) {
        alert("Must use physical device for Push Notifications");
        return;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Permission not granted for notifications");
        return;
      }

      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);

        await fetch(`${BACKENDURL}/notifications/register-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: auth.id, token }),
        });
      } catch (error) {
        console.error("Error getting or sending token:", error);
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    };

    registerToken();
  }, [auth]);
}
