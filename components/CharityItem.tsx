import { Charity } from "@/types/charity.types";
import { registerForPushNotificationsAsync } from "@/utils/registerPushToken";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, Text } from "react-native";

type CharityItemProps = {
  id: string;
  imgUrl: string;
};

const CharityItem = ({ imgUrl , id}: CharityItemProps) => {
  return (
    <Link href={`/CharityDetails/${id}`} asChild>
      <Pressable
        onPress={() => {
          registerForPushNotificationsAsync(16);
        }}
      >
        <Image
          source={{ uri: imgUrl }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      </Pressable>
    </Link>
  );
};

export default CharityItem;
