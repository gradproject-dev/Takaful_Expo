import { View, Text, TextInput } from "react-native";
import React from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  onChangeFn?: (text: string, field: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
}
const Input = ({
  label,
  placeholder,
  onChangeFn,
  value,
  secureTextEntry,
  disabled
}: InputProps) => {
  return (
    <View className="w-full">
      <Text className="text-xl font-bold mb-1 ml-2">{label}</Text>
      <TextInput 
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => (onChangeFn ? onChangeFn(text, label) : "")}
        placeholder={placeholder}
        value={value}
        placeholderTextColor="gray"
        editable={!disabled}
        className="w-full focus:border-blue-500 border-2 rounded-xl border-[#094067] h-12 pb-1 px-3  text-xl"
      />
    </View>
  );
};

export default Input;
