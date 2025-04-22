import { Text, ScrollView } from "react-native";
import React from "react";
import Input from "@/components/Input";
import Custombutton from "@/components/Button";
const SignupCharity = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 100,
        gap: 4,
        paddingHorizontal: 26,
        paddingBottom: 50,
      }}
    >
      <Text className="text-5xl font-bold text-[#094067] text-center mb-10">
        Join Us as a Charity
      </Text>
      <Input label="Name" />
      <Input label="Email" />
      <Input label="Address" />
      <Input label="Phone" />
      <Input label="Password" />
      <Input label="Confirm-Password" />
      <Custombutton buttonStyles="w-full h-14 bg-blue-500 justify-center  rounded-2xl mt-10">
        <Text className="text-center text-2xl text-white  font-bold ">
          Join Us
        </Text>
      </Custombutton>
    </ScrollView>
  );
};

export default SignupCharity;
