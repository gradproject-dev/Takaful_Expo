import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { BACKENDURL } from "@/constants";

// 👇 Show alert in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync(userId: number) {
  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }

  let { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);

    // 👇 Send token to backend
    await fetch(`${BACKENDURL}/notifications/register-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, token }),
    });

    return token;
  } catch (err) {
    console.error("Failed to register push token", err);
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}
