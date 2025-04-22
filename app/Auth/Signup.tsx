import { View, Text, Image } from "react-native";
import React from "react";
import Custombutton from "../../components/Button";
import { useRouter } from "expo-router";
import signupImage from "../../assets/images/Signup.png";
import charityIcon from "../../assets/images/Charity.png";
import DonorIcon from "../../assets/images/Donor.png";

const Signup = () => {
  const router = useRouter();
  return (
    <View className="flex-1 gap-20 items-center justify-center p-10">
      <Image source={signupImage} />
      <View className="items-center gap-4">
        <Text className="text-6xl  font-bold text-[#094067] text-center ">
          Join Us
        </Text>
        <Custombutton handlePress={() => router.push("/Auth/SignupCharity")}>
          <Image source={charityIcon} className="" />
        </Custombutton>
        <Custombutton handlePress={() => router.push("/Auth/SignupDonor")}>
          <Image source={DonorIcon} />
        </Custombutton>
      </View>
    </View>
  );
};

export default Signup;
