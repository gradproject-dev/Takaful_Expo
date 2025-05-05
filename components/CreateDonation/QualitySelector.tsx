import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { QualityValue , QualityMap,QualityOptions} from "@/types/allTypes";
export const qualityMap = {
  like_new: 5,
  very_good: 4,
  good: 3,
  acceptable: 2,
  needs_repair: 1,
} as const;

const qualityOptions:QualityOptions = [
  { label: "Like New", value: "like_new" },
  { label: "Very Good", value: "very_good" },
  { label: "Good", value: "good" },
  { label: "Acceptable", value: "acceptable" },
  { label: "Needs Repair", value: "needs_repair" },
] as const;

interface Props {
  quality: QualityValue;
  setQuality: (val: keyof typeof qualityMap) => void;
}

const QualitySelector = ({ quality, setQuality }: Props) => {
  return (
    <>
      <Text className="font-semibold text-center">Select Quality:</Text>
      <View className="flex-row flex-wrap justify-center gap-2 mb-2">
        {qualityOptions.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            onPress={() => setQuality(opt.value)}
            className={`px-4 py-2 rounded-full ${
              quality === opt.value ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <Text className={quality === opt.value ? "text-white" : "text-gray-800"}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="text-center text-gray-500 capitalize">
        Selected Quality: {quality.replace("_", " ")}
      </Text>
    </>
  );
};

export default QualitySelector;
