import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import BenefitPayView, {
  Locale,
  TapCurrencyCode,
  ConfigSettings,
} from "benefit-pay-react-native";

const CharityPage = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Charity with {id}</Text>
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BenefitPayView
          onSuccess={(data) => {
            console.log("🚀 ~ tokenValue:", data);
          }}
          onError={(data) => {
            console.log("🚀 ~ onError:", data);
          }}
          style={{ width: "100%" }}
          config={{
            androidOperator: {
              hashString: "",
              publicKey: "pk_live_********",
            },
            iOSOperator: {
              hashString: "",
              publicKey: "pk_live_********",
            },
            merchant: {
              id: "",
            },
            transaction: {
              amount: "1",
              currency: TapCurrencyCode.JOD,
            },
            customer: {
              id: "",
              names: [
                {
                  first: "Tap",
                  lang: Locale.en,
                  middle: "Company",
                  last: "Payments",
                },
              ],
              contact: {
                phone: {
                  number: "88888888",
                  countryCode: "+965",
                },
                email: "tappayments@tap.company",
              },
            },
            // interface: { edges: "" },
          }}
          onReady={() => {
            console.log(
              "🚀 ~ file: HomeScreen.tsx:145 ~ HomeScreen ~ onReady:"
            );
          }}
        />
      </View> */}
    </View>
  );
};

export default CharityPage;
