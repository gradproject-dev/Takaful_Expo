import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/contexts/authContext";
import { CreateDonationDto } from "@/types/donation.dto";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDonationDto) => void;
}

const CreateDonationModal = ({ visible, onClose, onSubmit }: Props) => {
  const { auth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemName, setItemName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [description, setDescription] = useState("");
  const [quality, setQuality] = useState<number>(1);
  const [images, setImages] = useState<
    { uri: string; name: string; type: string }[]
  >([]);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchData(`${BACKENDURL}/category/all`),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
  const handleSubmit = () => {
    if (
      !itemName.trim() ||
      selectedCategoryId === null ||
      !description.trim() ||
      images.length === 0
    ) {
      Alert.alert(
        "Missing fields",
        "Please fill all fields and upload at least one image."
      );
      return;
    }

    const donationData: CreateDonationDto = {
      name: itemName,
      quality,
      description,
      files: images,
      categoryId: selectedCategoryId,
      // guests can't access the page so auth.id will always be available
      donorId: auth!.user.donor!.id,
    };
    setIsSubmitting(true);
    onSubmit(donationData);
    setItemName("");
    setSelectedCategoryId(null);
    setDescription("");
    setQuality(1);
    setImages([]);
    onClose();
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets.map((asset, index) => ({
        uri: asset.uri,
        name: asset.fileName ?? `image_${Date.now()}_${index}.jpg`,
        type: asset.type ?? "image/jpeg",
      }));

      setImages((prev) => [...prev, ...selected]);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img.uri !== uri));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/30 justify-center items-center"
      >
        <Pressable
          onPress={() => {}}
          className="bg-white w-11/12 p-5 rounded-xl gap-4"
        >
          <Text className="text-xl font-bold text-center">
            Add New Donation
          </Text>

          <TouchableOpacity
            onPress={pickImage}
            className="bg-gray-200 p-3 rounded-lg items-center"
          >
            <Text className="text-gray-700">Pick Images</Text>
          </TouchableOpacity>

          {images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="my-2"
            >
              {images.map((img) => (
                <View key={img.uri} className="mr-2 relative">
                  <Image
                    source={{ uri: img.uri }}
                    className="w-24 h-24 rounded-md"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(img.uri)}
                    className="absolute top-0 right-0 bg-red-600 rounded-full p-1"
                  >
                    <Text className="text-white text-xs font-bold">X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

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

          <Text className="font-semibold">Select Category:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row mb-2"
          >
            {categories?.map((cat: { id: number; name: string }) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() =>
                  setSelectedCategoryId((prev) =>
                    prev === cat.id ? null : cat.id
                  )
                }
                className={`px-3 py-2 rounded-md border mr-2 ${
                  selectedCategoryId === cat.id
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300"
                }`}
              >
                <Text
                  className={
                    selectedCategoryId === cat.id
                      ? "text-white"
                      : "text-gray-800"
                  }
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="font-semibold text-center">Select Quality:</Text>
          <View className="flex-row justify-center space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setQuality(star)}>
                <FontAwesome
                  name={quality >= star ? "star" : "star-o"}
                  size={28}
                  color={quality >= star ? "#facc15" : "#d1d5db"}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-center text-gray-500">
            Selected Quality: {quality} star{quality > 1 ? "s" : ""}
          </Text>

          <TouchableOpacity
            className="bg-blue-500 py-2 rounded-lg mt-2"
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text className="text-white text-xl text-center font-semibold">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateDonationModal;
