import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import Sign from "@/components/Sign";
import image from "@/assets/images/Signup.png";
import DonationItem from "@/components/donationItem";
import itemImage from "@/assets/images/item.png";
import AddDonationForm from "@/components/DonationForm";
import Custombutton from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import fetchData, { createDonation, createDonor } from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { CreateDonationDto } from "@/types/donation.dto";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const Profile = () => {
  const { auth } = useAuth();
  console.log(auth);
  const [showForm, setShowForm] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async (donationData: CreateDonationDto) => {
      console.log("donationData", donationData);
      return await createDonation(`${BACKENDURL}/donation`, donationData);
    },
    onSuccess: () => {
      console.log("Donation added successfully");
      setShowForm(false);
    },
    onError: (error) => {
      // console.error("Error adding donation:", error);
    },
  });
  const user = {
    name: "Mahde Abu Al Hasan",
    photo: "https://via.placeholder.com/150", // Replace with actual photo URL
    volunteerCount: 7,
  };

  const handleAddDonation = async (donation: CreateDonationDto) => {
    await mutateAsync(donation);
  };

  let content = undefined;
  if (!auth) {
    content = (
      <View className="flex-1 my-16 mx-4 gap-5 items-center justify-center">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
          You’re not signed in
        </Text>

        <Text className="text-base text-gray-500 text-center mb-6">
          Sign in to see your profile, join events, and do more!
        </Text>
        <Sign buttonStyles="py-2 px-5  bg-blue-500 rounded-full" type="signin">
          <Text className={`text-xl text-white py-2 px-4 rounded-xl`}>
            Sign In
          </Text>
        </Sign>
      </View>
    );
  }
  if (auth) {
    let insideContent = undefined;
    const donorId = auth.user.donor!.id;
    const {
      data: donations,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["donations", donorId],
      queryFn: () => fetchData(`${BACKENDURL}/donation/all`, { donorId }),
      staleTime: 1000 * 2,
    });
    if (isLoading) {
      insideContent = (
        <View className="w-full items-center justify-center mt-10">
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    if (isError) {
      insideContent = (
        <Text className="text-4xl w-full text-red-600 text-center mt-10">
          There was an error fetching data.
        </Text>
      );
    }
    if (donations) {
      insideContent = (
        <FlatList
          data={!isLoading && !isError ? donations : []}
          className="flex1 w-full "
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={{
            marginTop: 15,
            paddingBottom: 50,
            marginHorizontal: 8,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DonationItem
              itemId={item.id.toString()}
              itemName={item.name}
              description={item?.description}
              rating={item.quality}
              donor={item.donor.name}
              catigroy={item.category.name}
              image={item.imgsUrl}
            />
          )}
        />
      );
      if (donations && donations.length === 0) {
        insideContent = (
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

      content = (
        <>
          {showForm && (
            <AddDonationForm
              visible={showForm}
              onClose={() => setShowForm(false)}
              onSubmit={(donationData) => {
                handleAddDonation(donationData);
              }}
            />
          )}
          <SafeAreaView className="flex-1 bg-white p-4 ">
            <Sign
              buttonStyles="absolute top-16 left-5 z-10 bg-red-500 rounded-2xl"
              type="signout"
            >
              <Text className={`text-md text-white py-2 px-4 rounded-xl`}>
                Sign Out
              </Text>
            </Sign>
            <View className="items-center mb-6">
              <Image
                source={image}
                className="w-28 h-28 rounded-full  mb-4"
                resizeMode="cover"
              />
              <Text className="text-2xl font-semibold">{user.name}</Text>
              <Text className="text-gray-500">
                Volunteered {user.volunteerCount} times
              </Text>
            </View>
            <View className="h-0.5 bg-gray-300 mx-2 " />
            <View className="w-full mx-2  mt-4 flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold ">Posted Donations</Text>
              <Custombutton
                buttonStyles="bg-blue-500  rounded-full shadow-lg mr-5"
                handlePress={() => setShowForm(true)}
              >
                <Text className={`text-md text-white py-2 px-4 rounded-xl`}>
                  Add
                </Text>
              </Custombutton>
            </View>
            {insideContent}
          </SafeAreaView>
        </>
      );
    }
    return content;
  }
};
export default Profile;
