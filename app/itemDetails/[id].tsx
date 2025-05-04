import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import person from "../../assets/images/person.png";
import ratingImg from "../../assets/images/rating.png";
import Custombutton from "@/components/Button";
import ImageSlider from "@/components/slider";
import { useQuery } from "@tanstack/react-query";
import { BACKENDURL } from "@/constants";
import fetchData from "@/utils/fetchData";

const Item = () => {
  const { id } = useLocalSearchParams();
  const donationId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["donations", id],
    queryFn: () => fetchData(`${BACKENDURL}/donation`, { id: donationId }),
    enabled: !!donationId,
  });

  let name, quality, imgsUrl, categroyName, email, donorName, description, phone, address;

  if (data) {
    ({
      description,
      name,
      quality,
      imgsUrl,
      category: { name: categroyName },
      donor: { email, name: donorName, phone, address },
    } = data);
  }

  const getRatingText = (rating: number) => {
    if (rating >= 4) return "Excellent";
    if (rating >= 3) return "Good";
    return "Needs Improvement";
  };

  let content = undefined;

  if (isLoading) {
    content = (
      <View className="flex-1 justify-center my-20">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    content = (
      <View className="flex-1 justify-center my-20">
        <Text className="text-red-500">Something went wrong</Text>
      </View>
    );
  }

  if (data) {
    const numericQuality = Number(quality);
    content = (
      <View className="flex-1 my-20 mx-5 items-center justify-around">
        <Text className="text-5xl font-bold text-blue-600">{name}</Text>

        <View className="w-full items-center">
          <ImageSlider images={imgsUrl} />
          <View className="flex-row items-center w-[80%] rounded-full py-2 justify-evenly mt-6 bg-[#dad7d7]">
            <View className="flex-row items-center">
              <Image source={person} className="size-6" resizeMode="contain" />
              <Text className="text-lg font-semibold text-gray-700 ml-1">
                {donorName}
              </Text>
            </View>
            <View className="flex-row items-center">
              
              <Text className="text-lg font-semibold text-gray-700 ml-1">
                {`Quality: ${getRatingText(numericQuality)}`}
              </Text>
            </View>
          </View>
        </View>

        {description && (
          <View className="w-full mt-8 ml-6">
            <Text className="font-bold text-2xl">Description :</Text>
            <Text numberOfLines={4} ellipsizeMode="tail" className="text-xl ml-1">
              {description}
            </Text>
          </View>
        )}

        <View className="w-full ml-6">
          <Text className="font-bold text-2xl">Information</Text>
          <View className="mt-2 w-full ml-4">
            <Text className="text-lg">Location: Jordan, Amman</Text>
            <Text className="text-lg">Phone: {phone}</Text>
            <Text className="text-lg">Address: {address}</Text>
          </View>
        </View>

        <Custombutton
          buttonStyles="w-full h-14 bg-blue-500 justify-center rounded-2xl mt-8"
        >
          <Text className="text-center text-2xl text-white font-bold">
            Chat with the Donor
          </Text>
        </Custombutton>
      </View>
    );
  }

  return content;
};

export default Item;
