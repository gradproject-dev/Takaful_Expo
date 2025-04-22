import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import person from "../../assets/images/person.png";
import ratingImg from "../../assets/images/rating.png";
import itemImg from "../../assets/images/item.png";
import Custombutton from "@/components/Button";
import donations from "@/assets/images/donation.png";
import eventImage from "@/assets/images/Event.png";
import dateImage from "@/assets/images/date.png";
import UnicifImage from "@/assets/images/Unicif.png";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";

const item = {
  name: "used jeans",
  donor: "mahde abuhasan",
  price: 100,
  description: "3 old used jeans in a good condition  ",
  rating: 4.5,
};
const data = {
  id: Math.random(),
  name: "Storytime Festivle",
  description:
    "Bring a story book and come help us with to write a simle on children face",
  charityName: "UNICIF",
  numDonations: 10,
  date: new Date().toLocaleDateString(),
};
const EventDetails = () => {
  // const {id} = useLocalSearchParams();
  // const { data: event, isPending, isError } = useQuery({
  //   queryKey: ["event"],
  //   queryFn: () => fetchData('${BACKENDURL}/event', `?id=${id}`),
  // });
  return (
    <View className="flex-1  my-20 mx-5 items-center  justify-around">
      <View className="w-full  items-center mt-4 ">
        <Image source={eventImage} resizeMode="contain" className="size-64" />
        <Text className="font-bold text-4xl  text-blue-600 text-center mt-2">
          {data.name}
        </Text>
        <View className="flex-row items-center w-[80%] rounded-full py-2  justify-evenly mt-4 bg-[#dad7d7]">
          <View className="flex-row items-center">
            <Image
              source={UnicifImage}
              className="size-6"
              resizeMode="contain"
            />
            <Text className="text-sm text-gray-700 ml-1">
              {data.charityName}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Image source={donations} className="size-6" resizeMode="contain" />
            <Text className=" text-sm text-gray-700 ml-1">
              {data.numDonations}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Image source={dateImage} className="size-6" resizeMode="contain" />
            <Text className="text-sm text-gray-700 ml-1">{data.date}</Text>
          </View>
        </View>
      </View>
      <View className="w-full mt-8 ml-6">
        <Text className="font-bold text-2xl">Description :</Text>
        <Text numberOfLines={4} ellipsizeMode="tail" className="text-xl ml-1">
          {item.description}
        </Text>
      </View>
      <View className="w-full  ml-6">
        <Text className="font-bold text-2xl">Information</Text>
        <View className="mt-2 w-full ml-4">
          <Text className="text-lg">Location : Jordan Amman</Text>
          <Text className="text-lg">Phone : +962797234701</Text>
          <Text className="text-lg">Address : Irbid</Text>
        </View>
      </View>
      <Custombutton
        buttonStyles="w-full h-14 bg-blue-500 justify-center  rounded-2xl mt-8"
        // handlePress={() => router.push("/Auth/Signup")}
      >
        <Text className="text-center text-2xl text-white  font-bold ">
          Chat with the Donor
        </Text>
      </Custombutton>
    </View>
  );
};

export default EventDetails;
