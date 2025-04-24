import { JWTProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationContext from "@/contexts/notificationContext";
const queryClient = new QueryClient();

// const RootStack = createNativeStackNavigator({
//   screens: {
//     LoggedIn: {
//       if: useIsSignedIn,
//       screen: signedInStack,
//       options: {
//         headerShown: false,
//       },
//     },
//     LoggedOut: {
//       if: useIsSignedOut,
//       screen: signedOutStack,
//       options: {
//         headerShown: false,
//       },
//     },
//   },
// });

export default function RootLayout() {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <JWTProvider>
          <NotificationContext />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth/index" />
            <Stack.Screen name="(main)" />
            <Stack.Screen name="EventDetails/[id]" />
            <Stack.Screen name="itemDetails/[id]/" />
            <Stack.Screen name="CharityDetails/[id]/" />
          </Stack>
        </JWTProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.log(error);
  }
}
