import { View, Image, ImageSourcePropType, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { useJWT } from "@/contexts/authContext";
import mainIcon from "../../assets/images/main.png";
import profileIcon from "../../assets/images/profile.png";
import charityIcon from "../../assets/images/char.png";
import donationsIcon from "../../assets/images/donation.png";

type TabIconProps = {
  title: string;
  focused: boolean;
  iconSource: ImageSourcePropType;
};
const TabIcon = ({ title, focused, iconSource }: TabIconProps) => {
  return (
    <View className="items-center justify-center mt-4">
      <Image
        source={iconSource}
        className="size-10"
        style={{ transform: [{ scale: focused ? 1.3 : 1 }] }}
        resizeMode="contain"
      />
    </View>
  );
};

const _Layout = () => {
  const { jwt } = useJWT();
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#3DA9FC",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Events/index"
        options={{
          title: "Events/index",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon title="Events" focused={focused} iconSource={mainIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="Donations"
        options={{
          title: "donation",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              title="donation"
              focused={focused}
              iconSource={donationsIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Charities/index"
        options={{
          title: "charity",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              title="charity"
              focused={focused}
              iconSource={charityIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              title="Profile"
              focused={focused}
              iconSource={profileIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
