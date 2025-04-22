import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Input from "@/components/Input";
import Custombutton from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { useJWT } from "@/contexts/authContext";
import { router } from "expo-router";
import { createDonor } from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
const SignupDonor = () => {
  const { signIn } = useJWT();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => {
      const { confirmpassword, ...rest } = formData;
      return createDonor(`${BACKENDURL}/donors`, {
        ...rest,
      });
    },
    onSuccess: () => {
      // signIn();
      router.replace("/(main)/Events");
    },
  });
  const onChangeFunction = (text: string, fieldName: string) => {
    const field = fieldName.toLowerCase();

    setFormData((prev) => ({
      ...prev,
      [field]: text.trimStart(),
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.confirmpassword.trim()
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match.");
      return;
    }
    mutate();
  };
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
        Join Us as a Donor
      </Text>
      <Input label="Name" onChangeFn={onChangeFunction} />
      <Input label="Email" onChangeFn={onChangeFunction} />
      <Input label="Address" onChangeFn={onChangeFunction} />
      <Input label="Phone" onChangeFn={onChangeFunction} />
      <Input
        label="Password"
        secureTextEntry={true}
        onChangeFn={onChangeFunction}
      />
      <Input
        label="ConfirmPassword"
        secureTextEntry={true}
        onChangeFn={onChangeFunction}
      />
      <Custombutton
        handlePress={handleSubmit}
        buttonStyles="w-full h-14 bg-blue-500 justify-center  rounded-2xl mt-10"
      >
        {isPending && (
          <View className="items-center flex-row justify-center gap-1 w-full">
            <ActivityIndicator size="large" color="red" />
            <Text className="text-xl font-bold text-white">Submitting ...</Text>
          </View>
        )}
        {!isPending && (
          <Text className="text-center text-2xl text-white font-bold">
            Join Us
          </Text>
        )}
      </Custombutton>
    </ScrollView>
  );
};

export default SignupDonor;
