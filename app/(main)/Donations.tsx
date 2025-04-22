import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import DonationItem from "@/components/donationItem";
import CategoryContainer from "@/components/CategoryContainer";
import clothes from "@/assets/images/clothes.png";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
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
  <View style={{ height: 10 }} /> // Adjust the height to set the gap size
);

const Donations = () => {
  const {
    data: donations,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: () => fetchData(`${BACKENDURL}/donation/all`),
  });

  console.log(donations);
  return (
    <View className="flex-1 my-16 mx-4 gap-5 items-center">
      <FlatList
        data={!isPending && !isError ? donations : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DonationItem
            itemId={item.id.toString()}
            itemName={item.name}
            description={item.description}
            rating={item.quality}
            donor={item.user.email}
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
  );
};

export default Donations;
