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
const item = {
  name: "used jeans",
  donor: "mahde abuhasan",
  price: 100,
  description: "3 old used jeans in a good condition  ",
  rating: 4.5,
};
const Item = () => {
    const {id} = useLocalSearchParams();
    const donationId = Array.isArray(id) ? id[0] : id; // ensure it's a string

    const {data, isLoading , isError }= useQuery({
        queryKey: ['donations', id],
        queryFn: () => fetchData(`${BACKENDURL}/donation`, {id : donationId}),
        enabled: !!donationId
      })
      let name, quality, imgsUrl, categroyName, email;
      if (data) {
        ({ name, quality, imgsUrl, category: { name: categroyName }, user: { email } } = data);
      }    let content = undefined;
    if(isLoading) content = <View className="flex-1 justify-center my-20"><ActivityIndicator  size="large" /></View>
    if(isError )content =  <View className="flex-1 justify-center my-20"><Text className='text-red-500'>Something went wrong</Text></View>
    if(data){
        content = <View className="flex-1 my-20 mx-5 items-center  justify-around">
        <Text className="text-5xl font-bold  text-blue-600 ">{name}</Text>
  
        <View className="w-full items-center mt-4 ">
          <ImageSlider images={imgsUrl}/>
          <View className="flex-row items-center w-[80%] rounded-full py-2  justify-evenly mt-6 bg-[#dad7d7]">
            <View className="flex-row items-center ">
              <Image source={person} className="size-6" resizeMode="contain" />
              <Text className=" text-sm text-gray-700 ml-1">{email}</Text>
            </View>
            <View className="flex-row items-center">
              <Image source={ratingImg} className="size-6" resizeMode="contain" />
              <Text className="text-sm text-gray-700 ml-1">{`${quality}/5`}</Text>
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
    }

   
  return  content 
};

export default Item;
 // "id": 4,
    // "name": "Winter Jacket",
    // "quality": "1",
    // "imgsUrl": [
    //     "https://gp-charity-images.s3.eu-north-1.amazonaws.com/jeans-1745167500520-1aa58072-f72b-436f-8dc4-b9c38d3e31b3.png"
    // ],
    // "imgsId": [
    //     "jeans-1745167500520-1aa58072-f72b-436f-8dc4-b9c38d3e31b3.png"
    // ],
    // "categoryId": 1,
    // "charity": null,
    // "category": {
    //     "id": 1,
    //     "name": "clothes"
    // },
    // "user": {
    //     "id": 1,
    //     "email": "mahdesadasd@gmail.com",
    //     "password": "$2b$10$HT/CoeTTxke2r5sTS1zrIOc9HBD6YxBZi7T0n9omHB9xU/Pc51dVW",
    //     "role": "charity",
    //     "expoPushToken": ""
    // }



