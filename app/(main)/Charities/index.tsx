import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CharityItem from "@/components/CharityItem";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import {Charity} from "@/types/allTypes";
const numberOfColumns = 2;

const ItemSeparator = () => (
  <View style={{ height: 10 }} /> // Adjust the height to set the gap size
);

const Charities = () => {
  const [searchQuery, setSearchQuery] =useState<string>("");

  const {
    data: charities,
    isLoading,
    isError,
  } = useQuery<Charity[]>({
    queryKey: ["charities"],
    queryFn: () => fetchData(`${BACKENDURL}/charity/all`),
    staleTime: 1000 * 15, //15 seconds
    gcTime: 1000 * 60 * 5, //5 minutes
  });

  let filteredData = charities;
  if (searchQuery && charities) {
    filteredData = charities.filter((event: { name: string }) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <View className="flex-1 my-24 mx-4 gap-5 items-center">
      <FlatList
        data={!isLoading && !isError ? filteredData : []}
        keyExtractor={(charity: Charity) => charity.id.toString()}
        renderItem={({ item }: { item: Charity }) => (
          <CharityItem id={item.id.toString()} imgUrl={item.imgUrl} />
        )}
        columnWrapperStyle={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 20,
          marginBottom: 20,
        }}
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: 50,
        }}
        numColumns={numberOfColumns}
        key={numberOfColumns}
        className="w-full"
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-5">
            <Text className="text-5xl font-bold text-center text-[#094067] mb-6">
              Charities
            </Text>
            <SearchBar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
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
        }
      />
    </View>
  );
};

export default Charities;
