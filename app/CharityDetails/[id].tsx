import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import { BACKENDURL } from "@/constants";
import fetchData from "@/utils/fetchData";
import EventItem from "@/components/EventItem";
import { Charity, EventEntity } from "@/types/allTypes";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const CharityPage = () => {
  const { id } = useLocalSearchParams();
  const charityId = Array.isArray(id) ? id[0] : id;

  const {
    data: charityArray,
    isLoading,
    isError,
  } = useQuery<Charity[]>({
    queryKey: ["charity", charityId],
    queryFn: () => fetchData(`${BACKENDURL}/charity`, { id: charityId }),
  });

  const charity = charityArray?.[0];

  // Modal state
  const [donateModalVisible, setDonateModalVisible] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardType, setCardType] = useState<string>("VISA");
  const [ccv, setCcv] = useState("");

  return (
    <View className="flex-1 my-16 mx-5 items-center justify-around">
      <FlatList
        data={!isLoading && !isError ? charity?.events || [] : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: {item: EventEntity}) => (
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
        className="flex1 w-full"
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="mb-5 w-full">
            {/* Charity Profile Header with Donate Button */}
            <View className="flex-row justify-between items-center  mb-4">
              <View className="flex-row items-center justify-center space-x-3">
                <Image
                  source={{ uri: charity?.imgUrl }}
                  resizeMode="cover"
                  className="h-[100px] w-[100px] rounded-full border mr-3 border-gray-300"
                />
                <Text className="text-2xl font-bold text-[#094067]">
                  {charity?.name}
                </Text>
              </View>

              {charity?.canReceiveFunds && (
                <TouchableOpacity
                  onPress={() => setDonateModalVisible(true)}
                  className="bg-green-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Donate</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Charity Info */}
            <View className="space-y-2 bg-gray-100 p-4 rounded-xl">
              <Text className="text-base text-gray-700">
                📞 Phone: {charity?.phone}
              </Text>
              <Text className="text-base text-gray-700">
                📧 Email: {charity?.email}
              </Text>
            </View>

         

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

      {/* Donate Modal */}
      <Modal
        visible={donateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDonateModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-[90%] p-6 rounded-lg">
            <Text className="text-xl font-bold mb-4">
              Donate to {charity?.name}
            </Text>

            <TextInput
              placeholder="Card Number"
              keyboardType="number-pad"
              className="border border-gray-300 rounded-lg p-2 mb-3"
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <Text className="mb-1">Card Type:</Text>
            <View className="flex-row space-x-4 mb-3">
              <TouchableOpacity onPress={() => setCardType("VISA")}>
                <Text
                  className={`px-3 py-1 rounded-full ${
                    cardType === "VISA"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  VISA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCardType("MASTERCARD")}>
                <Text
                  className={`px-3 py-1 rounded-full ${
                    cardType === "MASTERCARD"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  MASTERCARD
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="CCV"
              keyboardType="number-pad"
              className="border border-gray-300 rounded-lg p-2 mb-4"
              value={ccv}
              onChangeText={setCcv}
            />

            <Pressable
              className="bg-green-600 py-3 rounded-lg"
              onPress={() => {
                // You can integrate real payment logic here
                console.log("Donating with:", cardNumber, cardType, ccv);
                setDonateModalVisible(false);
              }}
            >
              <Text className="text-white text-center font-semibold">
                Submit Donation
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setDonateModalVisible(false)}
              className="mt-3"
            >
              <Text className="text-center text-red-500">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CharityPage;
