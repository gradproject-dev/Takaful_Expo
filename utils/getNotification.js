import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { registerForPushNotificationsAsync } from './notifications';

export default function Notifications() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);

      // 👉 Send the token to your backend to save it
      await fetch('http://YOUR_BACKEND_URL/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Push Token:</Text>
      <Text selectable>{expoPushToken}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
});
