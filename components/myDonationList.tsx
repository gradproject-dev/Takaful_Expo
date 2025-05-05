import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Donation } from "@/types/allTypes";
import DonationItem from "@/components/donationItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

interface DonationsListProps {
  isLoading: boolean;
  isError: boolean;
  donations?: Donation[];
  donorLat?: string;
  donorLng?: string;
}

const DonationsList: React.FC<DonationsListProps> = ({
  isLoading,
  isError,
  donations,
  donorLat,
  donorLng,
}) => {
  if (isLoading) {
    return (
      <View className="w-full items-center justify-center mt-10">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (isError) {
    return (
      <Text className="text-4xl w-full text-red-600 text-center mt-10">
        There was an error fetching data.
      </Text>
    );
  }

  if (!donations || donations.length === 0) {
    return (
      <View className="flex items-center justify-center mt-16 px-4">
        <Text className="text-2xl font-semibold text-gray-600 text-center">
          No donations yet 💤
        </Text>
        <Text className="text-base text-gray-400 mt-2 text-center">
          Be the first to make a change and share a donation!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={donations}
      className="flex-1 w-full"
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={{
        marginTop: 15,
        paddingBottom: 50,
        marginHorizontal: 8,
      }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <DonationItem
          itemId={item.id}
          itemName={item.name}
          description={item.description}
          rating={item.quality}
          donor={item.donor.name}
          category={item.category.name}
          image={item.imgsUrl ?? []}
          lat={donorLat}
          lng={donorLng}
        />
      )}
    />
  );
};

export default DonationsList;
