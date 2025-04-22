import { Charity } from "@/types/charity.types";
import { registerForPushNotificationsAsync } from "@/utils/registerPushToken";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, Text } from "react-native";

type CharityItemProps = {
  charity: Charity;
};

const CharityItem = ({ charity }: CharityItemProps) => {
  return (
    <Link href={`/CharityDetails/${charity.id}`} asChild>
      <Pressable
        onPress={() => {
          registerForPushNotificationsAsync(16);
        }}
      >
        <Text>asdasdsa</Text>
        <Image
          source={{ uri: charity.imgUrl }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      </Pressable>
    </Link>
  );
};

export default CharityItem;
