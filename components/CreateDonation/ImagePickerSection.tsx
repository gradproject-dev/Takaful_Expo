import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";

interface Props {
  images: { uri: string; name: string; type: string }[];
  setImages: React.Dispatch<React.SetStateAction<Props["images"]>>;
}

const ImagePickerSection = ({ images, setImages }: Props) => {
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets.map((asset, i) => ({
        uri: asset.uri,
        name: asset.fileName ?? `image_${Date.now()}_${i}.jpg`,
        type: asset.type ?? "image/jpeg",
      }));
      setImages((prev) => [...prev, ...selected]);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img.uri !== uri));
  };

  return (
    <>
      <TouchableOpacity onPress={pickImage} className="bg-gray-200 p-3 rounded-lg items-center">
        <Text className="text-gray-700">Pick Images</Text>
      </TouchableOpacity>

      {images.length > 0 && (
        <ScrollView horizontal className="my-2">
          {images.map((img) => (
            <View key={img.uri} className="mr-2 relative">
              <Image source={{ uri: img.uri }} className="w-24 h-24 rounded-md" />
              <TouchableOpacity onPress={() => removeImage(img.uri)} className="absolute top-0 right-0 bg-red-600 rounded-full p-1">
                <Text className="text-white text-xs font-bold">X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default ImagePickerSection;
