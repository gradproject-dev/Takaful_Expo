import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import BenefitPayView, {
  Locale,
  TapCurrencyCode,
  ConfigSettings,
} from "benefit-pay-react-native";
import { BACKENDURL } from "@/constants";
import fetchData from "@/utils/fetchData";

const CharityPage = () => {
  const { id } = useLocalSearchParams();
  const charityId = id as string;
  const { data, isLoading, error } = useQuery({
    queryKey: ["charity", charityId],
    queryFn: () =>
      fetchData(`${BACKENDURL}/charity`, {id : charityId})
  });
  let content = undefined;
  if (isLoading)
    content = (
      <View className="flex-1 justify-center my-20">
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    content = (
      <View className="flex-1 justify-center my-20">
        <Text className="text-red-500">Something went wrong</Text>
      </View>
    );
  if (data) {
    const { name, description, imgUrl } = data;
    content = (
      <View className="flex-1 my-20 mx-5 items-center justify-around">
        <Text className="text-5xl font-bold text-blue-600">{name}</Text>
        <View className="w-full mt-8 ml-6">
          <Text className="font-bold text-2xl">Description :</Text>
          <Text numberOfLines={4} ellipsizeMode="tail" className="text-xl ml-1">
            {description}
          </Text>
        </View>
      </View>
    );
  }

  return content
};

export default CharityPage;
