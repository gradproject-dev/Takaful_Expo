import React, { useState } from "react";
import { View, Text, TextInput, Modal, Pressable, Alert } from "react-native";
import Custombutton from "@/components/Button";

interface DonateButtonProps {
  donorId: number;
  charityId: number;
  amount: number;
  paymentMethod: "VISA" | "MASTERCARD";
}

const DonateButton: React.FC<DonateButtonProps> = ({
  donorId,
  charityId,
  amount,
  paymentMethod,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [ccv, setCcv] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/transaction/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorId,
          charityId,
          amount,
          paymentMethod,
          cardNumber,
          ccv,
        }),
      });

      if (!res.ok) throw new Error("Donation failed");
      setVisible(false);
      Alert.alert("✅ Success", "Donation was successful!");
    } catch (err) {
      Alert.alert("❌ Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Custombutton
        buttonStyles="w-full h-14 bg-green-600 justify-center rounded-xl mt-8"
        handlePress={() => setVisible(true)}
      >
        <Text className="text-white text-xl font-semibold text-center">
          Donate Now
        </Text>
      </Custombutton>

      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-4">
          <View className="bg-white w-full max-w-md p-6 rounded-2xl">
            <Text className="text-center text-xl font-bold mb-4">
              Enter Card Details
            </Text>

            <TextInput
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="Card Number"
              keyboardType="number-pad"
              className="border border-gray-300 p-3 rounded-xl mb-4"
            />
            <TextInput
              value={ccv}
              onChangeText={setCcv}
              placeholder="CCV"
              keyboardType="number-pad"
              className="border border-gray-300 p-3 rounded-xl mb-4"
              secureTextEntry
            />

            <View className="flex-row justify-between mt-4">
              <Pressable
                className="bg-red-500 px-4 py-2 rounded-xl"
                onPress={() => setVisible(false)}
              >
                <Text className="text-white font-bold">Cancel</Text>
              </Pressable>
              <Pressable
                className="bg-green-600 px-4 py-2 rounded-xl"
                onPress={handleDonate}
                disabled={loading}
              >
                <Text className="text-white font-bold">
                  {loading ? "Sending..." : "Donate"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DonateButton;
