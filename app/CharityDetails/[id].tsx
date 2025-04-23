import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import BenefitPayView, {
  Locale,
  TapCurrencyCode,
  ConfigSettings,
} from "benefit-pay-react-native";
import { BACKENDURL } from "@/constants";
import fetchData from "@/utils/fetchData";
import EventItem from "@/components/EventItem";
const ItemSeparator = () => (
  <View style={{ height: 10 }} /> // Adjust the height to set the gap size
);


const CharityPage = () => {
  const { id } = useLocalSearchParams();
  const charityId =Array.isArray(id) ? id[0] : id;

  const { data: charityArray, isLoading, isError } = useQuery({
    queryKey: ["charity", charityId],
    queryFn: () => fetchData(`${BACKENDURL}/charity`, { id: charityId }),
  });
  const charity = charityArray?.[0];
  return (
    <View className="flex-1 my-16 mx-5 items-center justify-around">
     
      <FlatList
        data={!isLoading && !isError ? charity?.events || [] : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventItem
            id={item.id.toString()}
            name={item.name}
            description={item.description}
            charityName={item.charity?.name}
            charityImage={item.charity?.imgUrl}
            numDonations={0}
            date={item.date}
            image={item.imgsUrl[0]}
          />
        )}
        contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
        className="flex1 w-full"
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="mb-5">
            <Image
              source={{ uri: charity?.imgUrl }}
              resizeMode="contain"
              className="h-[150px] mt-4"
            />
      
            {charity?.events?.length > 0 ? (
              <Text className="text-left text-2xl font-semibold mt-10">Recent Event:</Text>
            ) : (
              <Text className="text-center text-2xl font-semibold mt-10">
                There are no events for this charity
              </Text>
            )}
      
            {isLoading && (
              <View className="flex-1 items-center justify-center mt-10">
                <ActivityIndicator size="large" color="#4fa94d" />
              </View>
            )}
      
            {!isLoading && isError && (
              <Text className="text-4xl text-red-600 text-center mt-10">
                There was an error fetching data.
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};


export default CharityPage;
// {
//   "id": 2,
//   "phone": "0797234701",
//   "name": "Unicif",
//   "email": "mahdeabualhasan@gmail.com",
//   "address": "Irbird",
//   "deletedAt": null,
//   "imgUrl": "https://gp-charity-images.s3.eu-north-1.amazonaws.com/unicef-1745167023170-71821b97-d3d4-4c2f-b045-1abce52c98cf.png",
//   "imgId": "unicef-1745167023170-71821b97-d3d4-4c2f-b045-1abce52c98cf.png",
//   "canReceiveFunds": false,
//   "events": [
//       {
//           "id": 1,
//           "name": "happey eid",
//           "date": "2025-04-19T11:31:24.655Z",
//           "location": "location",
//           "description": "a event for people who need something to be happey",
//           "deletedAt": null,
//           "imgsUrl": [
//               "https://gp-charity-images.s3.eu-north-1.amazonaws.com/Frame 4-1745167674945-e1449524-cbbb-443f-b174-5c7b07a01688.png"
//           ],
//           "imgsId": [
//               "Frame 4-1745167674945-e1449524-cbbb-443f-b174-5c7b07a01688.png"
//           ],
//           "finished": false,
//           "charity": {
//               "id": 2,
//               "phone": "0797234701",
//               "name": "Unicif",
//               "email": "mahdeabualhasan@gmail.com",
//               "address": "Irbird",
//               "deletedAt": null,
//               "imgUrl": "https://gp-charity-images.s3.eu-north-1.amazonaws.com/unicef-1745167023170-71821b97-d3d4-4c2f-b045-1abce52c98cf.png",
//               "imgId": "unicef-1745167023170-71821b97-d3d4-4c2f-b045-1abce52c98cf.png",
//               "canReceiveFunds": false
//           },
//           "volunteers": []
//       }
//   ]
// }