import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
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
import { BACKENDURL } from "@/constants";
import formatDate from "@/utils/formatDate";
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
  const {id} = useLocalSearchParams();
  const eventId = Array.isArray(id) ? id[0] : id; 
  const {data:event, isLoading , isError }= useQuery({
      queryKey: ['event', id],
      queryFn: () => fetchData(`${BACKENDURL}/event`, {id : eventId}),
      enabled: !!eventId
    })
    
  
    let content = undefined;
  if(isLoading) content = <View className="flex-1 justify-center my-20"><ActivityIndicator  size="large" /></View>
  if(isError )content =  <View className="flex-1 justify-center my-20"><Text className='text-red-500'>Something went wrong</Text></View>
    if (event) {
      const {
        description = "",
        name = "",
        date = "",
        location = "",
        imgsUrl = "",
        volunteers = [],
        charity = {}
      } = event;
      const eventImg = imgsUrl[0];
      const charityImg = charity.imgUrl;
      const charityName = charity.name;
    
      content=  <View className="flex-1  my-20 mx-5 items-center  justify-around">
      <View className="w-full  items-center  ">
        <Text className="font-bold text-4xl  text-[#094067] text-center ">
          {name}
        </Text>
        <Image source={{uri: eventImg}} resizeMode="contain" className="h-[250px] w-full mt-4 " />
    
        <View className="flex-row items-center w-[80%] rounded-full py-2  justify-evenly mt-4 bg-[#dad7d7]">
          <View className="flex-row items-center">
            <Image
              source={{uri: charityImg}}
              className="size-6"
              resizeMode="contain"
            />
            <Text className="text-sm text-gray-700 ml-1">
              {charityName}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Image source={donations} className="size-6" resizeMode="contain" />
            <Text className=" text-sm text-gray-700 ml-1">
              {volunteers?.length}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Image source={dateImage} className="size-6" resizeMode="contain" />
            <Text className="text-sm text-gray-700 ml-1">{formatDate(date)}</Text>
          </View>
        </View>
      </View>
      <View className="w-full mt-8 ml-6">
        <Text className="font-bold text-2xl">Description :</Text>
        <Text numberOfLines={4} ellipsizeMode="tail" className="text-xl ml-1">
          {description}
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
          Volunteer
        </Text>
      </Custombutton>
    </View>
  }
  return content;
};

export default EventDetails;
// {
//   "id": 1,
//   "name": "happey eid",
//   "date": "2025-04-19T11:31:24.655Z",
//   "location": "location",
//   "description": "a event for people who need something to be happey",
//   "deletedAt": null,
//   "imgsUrl": [
//       "https://gp-charity-images.s3.eu-north-1.amazonaws.com/Frame 4-1745167674945-e1449524-cbbb-443f-b174-5c7b07a01688.png"
//   ],
//   "imgsId": [
//       "Frame 4-1745167674945-e1449524-cbbb-443f-b174-5c7b07a01688.png"
//   ],
//   "finished": false,
//   "charity": {
//       "id": 2,
//       "phone": "0797234701",
//       "name": "Unicif",
//       "email": "mahdeabualhasan@gmail.com",
//       "address": "Irbird",
//       "deletedAt": null,
//       "imgUrl": "https://gp-charity-images.s3.eu-north-1.amazonaws.com/unicef-1745167023170-71821b97-d3d4-4c2f-b045-1abce52c98cf.png",
//       "imgId": "unicef-1745167023170-71821b97-d3d4-4c2f-b045-1abce52c98cf.png",
//       "canReceiveFunds": false
//   },
//   "volunteers": []
// }