import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
interface props {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}
const search = require("@/assets/images/search.png");

const SearchBar = ({ onPress, placeholder, value, onChangeText }: props) => {
  return (
    <View className=" flex-row items-center bg-white rounded-2xl px-3 py-2 h-12  ">
      <Image
        source={search}
        className="size-5 mt-1"
        resizeMode="contain"
        tintColor="#094067"
      />

      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#094067"
        className="flex-1 ml-2 "
        style={{ paddingVertical: 0, height: 40, fontSize: 16, lineHeight: 22 }}
      />
    </View>
  );
};

export default SearchBar;
