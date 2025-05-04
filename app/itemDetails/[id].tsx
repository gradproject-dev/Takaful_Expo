import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Modal,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import person from "../../assets/images/person.png";
import ratingImg from "../../assets/images/rating.png";
import Custombutton from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import { BACKENDURL } from "@/constants";
import fetchData from "@/utils/fetchData";
import MapView, { Marker } from "react-native-maps";

const Item = () => {
  const { id } = useLocalSearchParams();
  const donationId = Array.isArray(id) ? id[0] : id;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["donations", id],
    queryFn: () => fetchData(`${BACKENDURL}/donation`, { id: donationId }),
    enabled: !!donationId,
  });

  let name,
    quality,
    imgsUrl,
    categroyName,
    email,
    donorName,
    description,
    phone,
    lat,
    lng;

  if (data) {
    ({
      description,
      name,
      quality,
      imgsUrl,
      category: { name: categroyName },
      donor: { email, name: donorName, phone, lat, lng },
    } = data);
  }

  const getRatingText = (rating: number) => {
    if (rating >= 4) return "Excellent";
    if (rating >= 3) return "Good";
    return "Needs Improvement";
  };

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  const openWhatsApp = () => {
    if (!phone) return;
    const phoneNumber = phone.replace(/[^\d]/g, ""); // remove non-digit characters
    const url = `https://wa.me/${phoneNumber}`;
    Linking.openURL(url);
  };

  const openImage = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  let content = undefined;
  const screenWidth = Dimensions.get("window").width;

  if (isLoading) {
    content = (
      <View className="flex-1 justify-center my-20">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    content = (
      <View className="flex-1 justify-center my-20">
        <Text className="text-red-500">Something went wrong</Text>
      </View>
    );
  }

  if (data) {
    const numericQuality = Number(quality);
    content = (
      <View className="flex-1 my-20 mx-5 items-center justify-around">
        <Text className="text-5xl font-bold ">{name}</Text>

        <View className="w-full items-center mt-6">
          <FlatList
            data={imgsUrl}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={screenWidth * 0.8 + 20} // item width + margin
            contentContainerStyle={{
              paddingHorizontal: (screenWidth - screenWidth * 0.8) / 2,
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => openImage(index)}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: screenWidth * 0.8,
                    height: 200,
                    borderRadius: 10,
                    marginHorizontal: 10,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />

          <View className="flex-row items-center w-[80%] rounded-full py-2 justify-evenly mt-6 bg-[#dad7d7]">
            <View className="flex-row items-center">
              <Image source={person} className="size-6" resizeMode="contain" />
              <Text className="text-lg font-semibold text-gray-700 ml-1">
                {donorName}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-lg font-semibold text-gray-700 ml-1">
                {`Quality: ${getRatingText(numericQuality)}`}
              </Text>
            </View>
          </View>
        </View>

        {description && (
          <View className="w-full mt-8 ml-6">
            <Text className="font-bold text-2xl">Description :</Text>
            <Text
              numberOfLines={4}
              ellipsizeMode="tail"
              className="text-xl ml-1"
            >
              {description}
            </Text>
          </View>
        )}

        <View className="w-full items-center mt-6">
          <Text className="font-bold text-2xl mb-2">Location</Text>
          <TouchableOpacity onPress={openMap} activeOpacity={0.9}>
            <View
              style={{
                width: 250,
                height: 120,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <MapView
                style={{ flex: 1 }}
                region={{
                  latitude: parseFloat(lat),
                  longitude: parseFloat(lng),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                pointerEvents="none"
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lng),
                  }}
                />
              </MapView>
            </View>
          </TouchableOpacity>
          <Text className="text-lg mt-2">Phone: {phone}</Text>
        </View>

        <Custombutton
          buttonStyles="w-full h-14 bg-green-600 justify-center rounded-2xl mt-8"
          handlePress={openWhatsApp}
        >
          <Text className="text-center text-2xl text-white font-bold">
            Chat with the Donor on WhatsApp
          </Text>
        </Custombutton>

        {/* Fullscreen Swipable Image Modal */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View className="flex-1 bg-black">
            <Pressable
              className="absolute top-10 right-10 z-50"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-3xl">✕</Text>
            </Pressable>
            <FlatList
              data={imgsUrl}
              horizontal
              pagingEnabled
              initialScrollIndex={selectedIndex}
              getItemLayout={(_, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index,
              })}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{
                    width: screenWidth,
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </Modal>
      </View>
    );
  }

  return content;
};

export default Item;
