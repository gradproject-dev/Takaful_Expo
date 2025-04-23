import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import DonationItem from "@/components/donationItem";
import CategoryContainer from "@/components/CategoryContainer";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import { useAuth } from "@/contexts/authContext";
import Sign from "@/components/Sign";
const data = [
  {
    id: Math.random(),
    itemName: "jeans",
    donor: "Mahde Abuhasan",
    catigroy: "clothes",
    rating: 4.5,
    description: "3 old jeans blue and black ",
  },
  {
    id: Math.random(),
    itemName: "jeans",
    donor: "Mahde Abuhasan",
    catigroy: "clothes",
    rating: 4.5,

    description: "3 old jeans blue and black",
  },
  {
    id: Math.random(),
    itemName: "jeans",
    donor: "Mahde Abuhasan",
    catigroy: "clothes",
    rating: 4.5,

    description: "3 old jeans blue and black",
  },
  {
    id: Math.random(),
    itemName: "jeans",
    donor: "Mahde Abuhasan",
    catigroy: "clothes",
    rating: 4.5,

    description: "3 old jeans blue and black",
  },
  {
    id: Math.random(),
    itemName: "jeans",
    donor: "Mahde Abuhasan",
    catigroy: "clothes",
    rating: 4.5,

    description: "3 old jeans blue and black",
  },
  {
    id: Math.random(),
    itemName: "jeans",
    donor: "Mahde Abuhasan",
    catigroy: "clothes",
    rating: 4.5,

    description: "3 old jeans blue and black",
  },
];
const categroies = [
  "clothes",
  "books",
  "food",
  "toys",
  "stationary",
  "others",
  "All",
];

const ItemSeparator = () => (
  <View style={{ height: 10 }} /> 
);

const Donations = () => {
  const {auth} = useAuth();
  const {
    data: donations,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: () => fetchData(`${BACKENDURL}/donation/all`),
    staleTime: 1000 * 15, //15 seconds
  });

  return (
  <> 
     {!auth && <Sign buttonStyles="absolute top-16 right-8 z-10  bg-blue-500 rounded-2xl" type="signin">
      <Text className={`text-md text-white py-2 px-4 rounded-xl`} >
          Sign In
        </Text>
        </Sign>}
    {auth &&<Sign buttonStyles="absolute top-16 left-8 z-10 bg-red-500 rounded-2xl"  type="signout">
      <Text className={`text-md text-white py-2 px-4 rounded-xl`} >
          Sign Out
        </Text>
      </Sign>}
    <View className="flex-1 my-24 mx-4 gap-5 items-center">
      <FlatList
        data={!isPending && !isError ? donations : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DonationItem
            itemId={item.id.toString()}
            itemName={item.name}
            description={item?.description}
            rating={item.quality}
            donor={item.donor.name}
            catigroy={item.category.name}
            image={item.imgsUrl}
          />
        )}
        contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
        className="flex1 w-full "
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-5">
            <Text className="text-5xl font-bold text-center text-[#094067] mb-6">
              Donations
            </Text>
            <SearchBar placeholder="Search" />
            <CategoryContainer data={categroies} />
            {isPending && (
              <View className="flex-1 items-center justify-center mt-10">
                <ActivityIndicator size="large" color="blue" />
              </View>
            )}

            {isError && (
              <Text className="text-4xl text-red-600 text-center mt-10">
                There was an error fetching data.
              </Text>
            )}
          </View>
        }
      />
    </View>
    </>
  );
};

export default Donations;
// {
//   "name": "Winter Jacket",
//   "description": "this is a description about jeans",
//   "quality": 1,
//   "imgsUrl": [
//       "https://gp-charity-images.s3.eu-north-1.amazonaws.com/box-1745424356731-512c787d-0408-41b3-bb91-d43c239ae11f.jpeg"
//   ],
//   "imgsId": [
//       "box-1745424356731-512c787d-0408-41b3-bb91-d43c239ae11f.jpeg"
//   ],
//   "categoryId": 1,
//   "donor": {
//       "id": 4,
//       "phone": "211321321",
//       "name": "mahde",
//       "email": "mahde121232133@gmail.com",
//       "address": "30st",
//       "imgId": null,
//       "imgUrl": null,
//       "deletedAt": null
//   },
//   "id": 7
// }