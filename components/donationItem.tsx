import { View, Text, Image } from "react-native";
import React from "react";
import ratingImg from "@/assets/images/rating.png"; // Replace this if needed
import person from "@/assets/images/person.png";
import Custombutton from "./Button";
import { useRouter } from "expo-router";

interface Props {
  donor: string;
  description: string;
  image: string[];
  itemId: string;
  category: string;
  itemName: string;
  rating: number;
}

const DonationItem = ({
  image,
  itemName,
  donor,
  description,
  itemId,
  category,
  rating,
}: Props) => {
  const router = useRouter();

  const handleEvent = () => {
    router.push(`../itemDetails/${itemId}`);
  };

  const renderRating = () => {
    if (rating >= 4) {
      return <Text className="text-green-500">Excellent</Text>;
    } else if (rating >= 3) {
      return <Text className="text-yellow-500">Good</Text>;
    } else {
      return <Text className="text-red-500">Needs Improvement</Text>;
    }
  };

  return (
    <Custombutton
      buttonStyles="bg-white flex-row rounded-xl h-36 gap-2"
      handlePress={handleEvent}
    >
      {/* Image Section */}
      <View className="flex-1">
        <Image
          source={{ uri: image?.[0] ?? "" }}
          className="w-full h-full rounded-xl object-cover rounded-tr-none rounded-br-none"
          alt="Donation item image"
        />
      </View>

      {/* Item Details Section */}
      <View className="items-center p-2 justify-between flex-[1.9] gap-1">
        {/* Header */}
        <View className="flex-row justify-between w-full items-center">
          <Text className="font-bold text-2xl">{itemName}</Text>
          <Text className="bg-gray-300 px-2 py-2 rounded-full">
            {category}
          </Text>
        </View>

        {/* Description */}
        <Text className="self-start" numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>

        {/* Footer with Donor and Rating */}
        <View className="flex-row items-center w-full justify-between">
          <View className="flex-row items-center">
            <Image
              source={person}
              className="size-6"
              resizeMode="contain"
              alt="Person icon"
            />
            <Text className="text-sm text-gray-700">{donor}</Text>
          </View>

          {/* Display custom rating */}
          <View className="flex-row items-center">
            {renderRating()}
          </View>
        </View>
      </View>
    </Custombutton>
  );
};

export default DonationItem;
