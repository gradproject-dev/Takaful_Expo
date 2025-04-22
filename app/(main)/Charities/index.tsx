import { View, Text, FlatList } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import { Charity } from "@/types/charity.types";
import CharityItem from "@/components/CharityItem";
import CategoryContainer from "@/components/CategoryContainer";

const numberOfColumns = 2;

export const dummyCharities: Charity[] = [
  {
    id: 1,
    name: "Hope Foundation",
    phone: "+1-202-555-0171",
    email: "contact@hopefoundation.org",
    address: "123 Charity Lane, New York, NY",
    imgId: "hope-img-001",
    // imgUrl: require("../../../assets/images/umali.png"),
    imgUrl:
      "https://gp-charity-images.s3.eu-north-1.amazonaws.com/Screenshot%202024-08-02%20151047-1745003689029-4b9bb33d-a4d6-4ede-b1c4-aacabd5b26f1.png",
  },
  // {
  //   id: 2,
  //   name: "Care for All",
  //   phone: "+1-202-555-0192",
  //   email: "info@careforall.org",
  //   address: "456 Unity Street, Los Angeles, CA",
  //   imgId: "care-img-002",
  //   imgUrl: require("../../../assets/images/unicef.png"),
  // },
  // {
  //   id: 3,
  //   name: "Feed the Future",
  //   phone: "+1-202-555-0133",
  //   email: "support@feedfuture.org",
  //   address: "789 Giving Blvd, Chicago, IL",
  //   imgId: "feed-img-003",
  //   imgUrl: require("../../../assets/images/umali.png"),
  // },
  // {
  //   id: 4,
  //   name: "Books for Kids",
  //   phone: "+1-202-555-0155",
  //   email: "hello@bookskids.org",
  //   address: "321 Learning Ave, Austin, TX",
  //   imgUrl: require("../../../assets/images/umali.png"),
  //   imgId: "books-img-004",
  // },
  // {
  //   id: 5,
  //   name: "Smile Project",
  //   phone: "+1-202-555-0118",
  //   email: "team@smileproject.org",
  //   address: "999 Joy Drive, Seattle, WA",
  //   imgUrl: require("../../../assets/images/unicef.png"),
  //   imgId: "smile-img-005",
  // },
];
const catigroies = [
  "Enviroment",
  "Children",
  "Health",
  "Education",
  "others",
  "All",
];
const ItemSeparator = () => (
  <View style={{ height: 10 }} /> // Adjust the height to set the gap size
);

const Charities = () => {
  return (
    <View className="flex-1 my-16 mx-4 gap-5 items-center">
      <FlatList
        data={dummyCharities}
        keyExtractor={(charity) => charity.id.toString()}
        renderItem={({ item: charity }) => <CharityItem charity={charity} />}
        columnWrapperStyle={{
          backgroundColor: "blackk",
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
            <SearchBar placeholder="Search" />
            <CategoryContainer data={catigroies} />
          </View>
        }
      />
    </View>
  );
};

export default Charities;
