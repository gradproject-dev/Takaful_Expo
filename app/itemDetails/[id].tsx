import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import person from "../../assets/images/person.png";
import ratingImg from "../../assets/images/rating.png";
import itemImg from "../../assets/images/item.png";
import Custombutton from "@/components/Button";
import ImageSlider from "@/components/slider";
import { useQuery } from "@tanstack/react-query";
const item = {
  name: "used jeans",
  donor: "mahde abuhasan",
  price: 100,
  description: "3 old used jeans in a good condition  ",
  rating: 4.5,
};
const Item = () => {
  //   const {id} = useLocalSearchParams();
  //   const {data, isLoading , isError }= useQuery({
  //       queryKey: ['donations', id],
  //       queryFn: () => fetch('http://localhost:3000/donation', id)
  //     })
  //  // const {user:{email} , name, imgsUrl } = data;
  //  let content = isLoading && <ActivityIndicator  size="large" />
  //   content = isError && <Text className='text-red-500'>Something went wrong</Text>

  return (
    <View className="flex-1 my-20 mx-5 items-center  justify-around">
      <Text className="text-5xl font-bold  text-blue-600 ">{item.name}</Text>

      <View className="w-full items-center mt-4 ">
        {/*<Image source={itemImg} resizeMode='contain' className='h-50 w-full'/>*/}
        <ImageSlider />
        <View className="flex-row items-center w-[80%] rounded-full py-2  justify-evenly mt-6 bg-[#dad7d7]">
          <View className="flex-row items-center ">
            <Image source={person} className="size-6" resizeMode="contain" />
            <Text className=" text-sm text-gray-700 ml-1">{item.donor}</Text>
          </View>
          <View className="flex-row items-center">
            <Image source={ratingImg} className="size-6" resizeMode="contain" />
            <Text className="text-sm text-gray-700 ml-1">{`${item.rating}/5`}</Text>
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

export default Item;
