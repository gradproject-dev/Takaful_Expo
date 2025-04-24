import { View, Text, Image } from "react-native";
import React from "react";
import ratingImg from "@/assets/images/rating.png";
import clothes from "@/assets/images/clothes.png";
import person from "@/assets/images/person.png";
import Custombutton from "./Button";
import { useRouter } from "expo-router";
interface props {
  donor: string;
  description: string;
  image: any;
  itemId: string;
  catigroy: string;
  itemName  : string;
  rating: number;
}

const DonationItem = ({
  image,
  itemName,
  donor,
  description,  
  itemId,
  catigroy,
  rating
}: props) => {
  const router = useRouter();
  const handleEvent = () => {
    router.push(`../itemDetails/${itemId}`);
  };
  return (
    <Custombutton
      buttonStyles="bg-white flex-row rounded-xl  h-36 gap-2" 
      handlePress={handleEvent}
    >   
        <View className="flex-1">
        <Image
          source={clothes}
          className=" w-full h-full  rounded-xl object-cover rounded-tr-none rounded-br-none "
        />
        </View>
      <View className=" items-center p-2 justify-between flex-[1.9] gap-1 ">
        <View className="flex-row justify-between w-full items-center" >
        <Text className="font-bold text-2xl ">{itemName}</Text>
        <Text className="bg-gray-300 px-2 py-2 rounded-full ">{catigroy}</Text>
        </View>
        <Text className="self-start"  numberOfLines={3} ellipsizeMode="tail"  >{description}</Text>
        <View className="flex-row items-center w-full justify-between ">
          <View className="flex-row items-center">
            <Image source={person} className="size-6" resizeMode="contain" />
            <Text className=" text-sm text-gray-700">{donor}</Text>
          </View>
          <View className="flex-row items-center">
            <Image source={ratingImg} className="size-6" resizeMode="contain" />
            <Text className="text-sm text-gray-700">{`${rating}/5`}</Text>
          </View>
        </View>
      </View>
    </Custombutton>
  );
};

export default DonationItem;