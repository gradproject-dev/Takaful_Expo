import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import EventItem from "@/components/EventItem";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import { useAuth } from "@/contexts/authContext";
import {EventEntity} from "@/types/allTypes";
const ItemSeparator = () => (
  <View style={{ height: 10 }} /> // Adjust the height to set the gap size
);

const Events = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: events,
    isPending,
    isError,
  } = useQuery<EventEntity[]>({
    queryKey: ["events"],
    queryFn: () => fetchData(`${BACKENDURL}/event/all`),
  });
  let filteredEvents = events;
  if (searchQuery && events) {
    filteredEvents = events.filter((event: {name:string}) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return (
   
    <View className="flex-1 my-24 mx-4 gap-5  items-center">
      <FlatList
        data={!isPending && !isError ? filteredEvents : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }:{item : EventEntity} ) => (
          <EventItem
            id={item.id}
            name={item.name}
            description={item.description}
            charityName={item.charity.name}
            charityImage={item.charity.imgUrl}
            numDonations={item.volunteers?.length ?? 0}
            date={item.date.toString()}
            image={item.imgsUrl[0]}
          />
        )}
        contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
        className="flex1 w-full "
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-5">
            <Text className="text-5xl font-bold text-center text-[#094067] mb-6">
              Events
            </Text>
            <SearchBar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery}/>
            {isPending && (
              <View className="flex-1 items-center justify-center mt-10">
                <ActivityIndicator size="large" color="#4fa94d" />
              </View>
            )}

            {!isPending && isError && (
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

export default Events;
