import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DonationItem from "@/components/donationItem";
import CategoryContainer from "@/components/CategoryContainer";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import { Donation } from "@/types/allTypes";
const ItemSeparator = () => <View style={{ height: 10 }} />;

const Donations = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: donations,
    isPending,
    isError,
  } = useQuery<Donation[]>({
    queryKey: ["donations"],
    queryFn: () => fetchData(`${BACKENDURL}/donation/all`),
    staleTime: 1000 * 15, // 15 seconds
  });

  const handleClick = (id: string) => {
    setSelectedCategory((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  let filteredData = donations ?? [];

  if (selectedCategory.length > 0) {
    filteredData = filteredData.filter((item) =>
      selectedCategory.includes(item?.categoryId?.toString())
    );
  }

  if (searchQuery) {
    filteredData = filteredData.filter((item) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <View className="flex-1 my-24 mx-4 gap-5 items-center">
      <FlatList
        data={!isPending && !isError ? filteredData : []}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item } : {item: Donation}) => {
          if (!item?.donor || !item?.category) return null;

          return (
            <DonationItem
              lng={item.donor.lng ?? "0"}
              lat={item.donor.lat ?? "0"}
              itemId={item.id}
              itemName={item.name ?? "Unnamed"}
              description={item.description ?? "No description"}
              rating={item.quality}
              donor={item.donor.name ?? "Unknown"}
              category={item.category.name ?? "Uncategorized"}
              image={item.imgsUrl ?? []}
            />
          );
        }}
        contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
        className="flex1 w-full"
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-5">
            <Text className="text-5xl font-bold text-center text-[#094067] mb-6">
              Donations
            </Text>
            <SearchBar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
            <CategoryContainer
              hanldeCategoryClick={handleClick}
              selectedCategory={selectedCategory}
            />
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
