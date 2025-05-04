import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { BACKENDURL } from "@/constants";
import fetchData from "@/utils/fetchData";
import EventItem from "@/components/EventItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const CharityPage = () => {
  const { id } = useLocalSearchParams();
  const charityId = Array.isArray(id) ? id[0] : id;

  const {
    data: charityArray,
    isLoading,
    isError,
  } = useQuery({
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
          <View className="mb-5 w-full">
            {/* Charity Profile Section */}
            <View className="items-center space-y-3">
              <Image
                source={{ uri: charity?.imgUrl }}
                resizeMode="cover"
                className="h-[150px] w-[150px] rounded-full border border-gray-300"
              />
              <Text className="text-2xl font-bold text-[#094067]">
                {charity?.name}
              </Text>
            </View>

            {/* Charity Info */}
            <View className="mt-6 space-y-2 bg-gray-100 p-4 rounded-xl">
              <Text className="text-base text-gray-700">
                📍 Address: {charity?.address}
              </Text>
              <Text className="text-base text-gray-700">
                📞 Phone: {charity?.phone}
              </Text>
              <Text className="text-base text-gray-700">
                📧 Email: {charity?.email}
              </Text>
              <Text className="text-base text-gray-700">
                🏦 Can Receive Funds:{" "}
                <Text
                  className={
                    charity?.canReceiveFunds ? "text-green-600" : "text-red-500"
                  }
                >
                  {charity?.canReceiveFunds ? "Yes" : "No"}
                </Text>
              </Text>
            </View>

            {/* Section Title */}
            {charity?.events?.length > 0 ? (
              <Text className="text-left text-2xl font-semibold mt-10">
                Recent Event:
              </Text>
            ) : (
              <Text className="text-center text-2xl font-semibold mt-10">
                There are no events for this charity
              </Text>
            )}

            {/* Loader / Error */}
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
