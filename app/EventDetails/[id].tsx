import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import Custombutton from "@/components/Button";
import donations from "@/assets/images/donation.png";
import dateImage from "@/assets/images/date.png";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import formatDate from "@/utils/formatDate";
import { useAuth } from "@/contexts/authContext";
import { EventEntity } from "@/types/allTypes";
import { Volunteer } from "@/types/allTypes";

const EventDetails = () => {
  const { id } = useLocalSearchParams();
  const { auth } = useAuth();
  const eventId = Array.isArray(id) ? id[0] : id;
  const donorId = auth?.user?.donor?.id || null;

  const [event, setEvent] = useState<EventEntity>();
  const [volunteerStatus, setVolunteerStatus] = useState<Volunteer | null>(
    null
  );
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [address, setAddress] = useState<string | null>(null); // To store the address

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await fetchData(`${BACKENDURL}/event`, { id: eventId });
        setEvent(data);
        // Fetch the address when event data is loaded
        if (data.lat && data.lng) {
          fetchAddress(data.lat, data.lng);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoadingEvent(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      console.log("Fetching address for lat:", lat, "lng:", lng); // Log request params
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAzmf6d3cEi3aXZgVEsFYHV24dW9rUp3nA`
      );
      const data = await response.json();
      console.log("Geocoding API Response:", data); // Log API response
      if (data.status === "OK" && data.results.length > 0) {
        setAddress(data.results[0].formatted_address); // Set the address
      } else {
        console.error("Geocoding API Error:", data.status);
        setAddress(null);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Unable to fetch address");
    }
  };

  const openGoogleMaps = () => {
    if (event?.lat && event?.lng) {
      const url = `https://www.google.com/maps?q=${event.lat},${event.lng}`;
      Linking.openURL(url);
    }
  };

  const showToastMessage = (message, duration = 3000) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), duration);
  };

  const handleVolunteer = async () => {
    try {
      const response = await fetch(`${BACKENDURL}/volunteer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorId, eventId, status: "IDLE" }),
      });
      if (!response.ok) throw new Error("Failed to volunteer");
      const data = await response.json();
      setVolunteerStatus(data);
      setModalVisible(false);
      showToastMessage("✅ You successfully volunteered!");
    } catch (error) {
      console.error("Volunteer failed:", error);
      showToastMessage("❌ Something went wrong. Try again.");
    }
  };

  const renderVolunteerAction = () => {
    if (!donorId) {
      return (
        <View className="mt-8 px-4 py-3 bg-gray-100 rounded-xl border border-gray-300 w-full">
          <Text className="text-center text-gray-500 text-base">
            Login as a donor to volunteer
          </Text>
        </View>
      );
    }
    if (volunteerStatus) {
      const status = volunteerStatus.status;
      const isRejected = status === "REJECTED";
      const color = isRejected
        ? "border-red-500 text-red-600"
        : "border-green-500 text-green-600";
      const bg = isRejected ? "bg-red-50" : "bg-green-50";
      return (
        <View
          className={`mt-8 px-4 py-3 rounded-xl border ${color} ${bg} w-full`}
        >
          <Text className={`text-center font-semibold text-base ${color}`}>
            You already volunteered — Status: {status}
          </Text>
        </View>
      );
    }
    return (
      <Custombutton
        buttonStyles="w-full h-14 bg-blue-500 justify-center rounded-2xl mt-8"
        handlePress={() => setModalVisible(true)}
      >
        <Text className="text-center text-2xl text-white font-bold">
          Volunteer
        </Text>
      </Custombutton>
    );
  };

  const renderModal = () => {
    if (!donorId || volunteerStatus) return null;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-4">
          <View className="bg-white p-6 rounded-xl w-full max-w-md">
            <Text className="text-xl font-bold mb-4 text-center">
              Confirm Volunteering
            </Text>
            <Text className="text-lg mb-4 text-center">
              Do you want to volunteer for this event?
            </Text>
            <View className="flex-row justify-around">
              <Pressable
                className="bg-green-500 px-4 py-2 rounded-xl"
                onPress={handleVolunteer}
              >
                <Text className="text-white font-bold">Yes</Text>
              </Pressable>
              <Pressable
                className="bg-red-500 px-4 py-2 rounded-xl"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-bold">No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (loadingEvent) {
    return (
      <View className="flex-1 justify-center my-20">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 justify-center my-20">
        <Text className="text-red-500 text-center">Something went wrong.</Text>
      </View>
    );
  }

  const {
    name = "",
    description = "",
    date = "",
    imgsUrl = [],
    volunteers = [],
    charity = {},
    lat,
    lng,
  } = event;

  return (
    <View className="flex-1 my-20 mx-5 items-center justify-around relative">
      {showToast && (
        <View className="absolute top-10 z-50 w-[90%] bg-black/80 py-2 px-4 rounded-xl self-center">
          <Text className="text-white text-center text-xl">{toastMessage}</Text>
        </View>
      )}

      <View className="w-full items-center">
        <Text className="font-bold text-4xl text-[#094067] text-center">
          {name}
        </Text>
        <Image
          source={{ uri: imgsUrl[0] }}
          className="h-[250px] w-full mt-4 rounded-3xl"
        />
        <View className="flex-row items-center w-[80%] rounded-full py-2 justify-evenly mt-4 bg-[#dad7d7]">
          <InfoItem img={charity.imgUrl} text={charity.name} />
          <InfoItem img={donations} text={volunteers.length} />
          <InfoItem img={dateImage} text={formatDate(date)} />
        </View>
      </View>

      <View className="w-full mt-8 ml-6">
        <Text className="font-bold text-2xl">Description :</Text>
        <Text numberOfLines={4} ellipsizeMode="tail" className="text-xl ml-1">
          {description}
        </Text>
      </View>

      <View className="w-full ml-6">
        <Text className="font-bold text-2xl">Information</Text>
        <View className="mt-2 w-full ml-4">
          <Text className="text-lg">Phone: +962797234701</Text>
          {address ? (
            <View className="flex-row items-center">
              <Text className="text-lg">🏨 Location: </Text>
              <Pressable onPress={openGoogleMaps}>
                <Text className="text-lg text-blue-500">{address}</Text>
              </Pressable>
            </View>
          ) : (
            <Text className="text-lg">Loading address...</Text>
          )}
        </View>
      </View>

      {renderVolunteerAction()}
      {renderModal()}
    </View>
  );
};

const InfoItem = ({ img, text }: { img: string; text: string }) => (
  <View className="flex-row items-center">
    <Image
      source={typeof img === "string" ? { uri: img } : img}
      className="size-6"
    />
    <Text className="text-sm text-gray-700 ml-1">{text}</Text>
  </View>
);

export default EventDetails;
