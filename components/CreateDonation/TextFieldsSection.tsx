import { TextInput } from "react-native";
import React from "react";

interface Props {
  itemName: string;
  setItemName: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
}

const TextFieldsSection = ({ itemName, setItemName, description, setDescription }: Props) => {
  return (
    <>
      <TextInput
        placeholder="Item Name"
        className="border border-gray-300 p-2 rounded-md"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        placeholder="Description"
        className="border border-gray-300 p-2 rounded-md h-24 text-top"
        multiline
        value={description}
        onChangeText={setDescription}
      />
    </>
  );
};

export default TextFieldsSection;
