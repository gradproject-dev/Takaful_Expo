import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/authContext";
import Sign from "@/components/Sign";
import image from "@/assets/images/Signup.png";
import DonationItem from "@/components/donationItem";
import AddDonationForm from "@/components/CreateDonation/DonationForm";
import Custombutton from "@/components/Button";
import fetchData, { createDonation } from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import { CreateDonationDto } from "@/types/donation.dto";
import { Donation } from "@/types/allTypes";
import DonationsList from "@/components/myDonationList";

const Profile = () => {
  const { auth } = useAuth();
  const donorId = auth?.user?.donor?.id;
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (donationData: CreateDonationDto) =>
      createDonation(`${BACKENDURL}/donation`, donationData),
    onSuccess: () => {
      setShowForm(false);
      queryClient.refetchQueries({ queryKey: ["donations"] });
    },
    onError: (error) => {
      console.error("Error adding donation:", error);
    },
  });

  const {
    data: donations,
    isLoading,
    isError,
  } = useQuery<Donation[]>({
    queryKey: ["donations", donorId],
    queryFn: () => fetchData(`${BACKENDURL}/donation/all`, { donorId }),
    enabled: !!donorId,
    staleTime: 1000 * 2,
  });

  if (!auth?.token) {
    return (
      <View className="flex-1 my-16 mx-4 gap-5 items-center justify-center">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
          You’re not signed in
        </Text>
        <Text className="text-base text-gray-500 text-center mb-6">
          Sign in to see your profile, join events, and do more!
        </Text>
        <Sign buttonStyles="py-2 px-5 bg-blue-500 rounded-full" type="signin">
          <Text className="text-xl text-white py-2 px-4 rounded-xl">
            Sign In
          </Text>
        </Sign>
      </View>
    );
  }

  if (!donorId ) return null;

  
  const handleAddDonation = async (donation: CreateDonationDto) => {
    await mutateAsync(donation);
  };

  return (
    <>
      {showForm && (
        <AddDonationForm
          visible={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleAddDonation}
        />
      )}
      <SafeAreaView className="flex-1 bg-white p-4">
        <Sign
          buttonStyles="absolute top-16 left-5 z-10 bg-red-500 rounded-2xl"
          type="signout"
        >
          <Text className="text-base text-white py-2 px-4 rounded-xl">
            Sign Out
          </Text>
        </Sign>

        <View className="items-center mb-6">
          <Image
            source={image}
            className="w-28 h-28 rounded-full mb-4"
            resizeMode="cover"
          />
          <Text className="text-2xl font-semibold">
            {auth.user?.donor?.name ?? "Anonymous"}
          </Text>
          <Text className="text-gray-500">
            Volunteered {auth.user?.donor?.volunteers?.length ?? 0} times
          </Text>
        </View>

        <View className="h-0.5 bg-gray-300 mx-2" />
        <View className="w-full mx-2 mt-4 flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold">Posted Donations</Text>
          <Custombutton
            buttonStyles="bg-blue-500 rounded-full shadow-lg mr-5"
            handlePress={() => setShowForm(true)}
          >
            <Text className="text-white text-base py-2 px-4 rounded-xl">
              Add
            </Text>
          </Custombutton>
        </View>

        <DonationsList
          isLoading={isLoading}
          isError={isError}
          donations={donations}
          donorLat={auth?.user?.donor?.lat}
          donorLng={auth?.user?.donor?.lng}
        />
      </SafeAreaView>
    </>
  );
};

export default Profile;
