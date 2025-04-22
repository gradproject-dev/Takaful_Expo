import { View, Text } from "react-native";
import React from "react";
import { useJWT } from "@/contexts/authContext";
import { Redirect } from "expo-router";

const Profile = () => {
  const { jwt, isLoading } = useJWT();

  if (isLoading) return <Text>Shit is loading</Text>;
  if (!jwt) return <Redirect href="/Auth" />;
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
