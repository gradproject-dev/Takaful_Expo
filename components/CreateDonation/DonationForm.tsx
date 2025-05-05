import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/contexts/authContext";
import { CreateDonationDto } from "@/types/donation.dto";
import ImagePickerSection from "./ImagePickerSection";
import TextFieldsSection from "./TextFieldsSection";
import CategorySelector from "./CategorySelector";
import QualitySelector, { qualityMap } from "./QualitySelector";
import {image} from "../../types/donation.dto"
interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDonationDto) => void;
}

const CreateDonationModal = ({ visible, onClose, onSubmit }: Props) => {
  const { auth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [quality, setQuality] = useState<keyof typeof qualityMap>("good");
  const [images, setImages] = useState<
  image[]
  >([]);

  const handleSubmit = () => {
    if (!itemName.trim() || !description.trim() || images.length === 0 || selectedCategoryId === null) {
      Alert.alert("Missing fields", "Please fill all fields and upload at least one image.");
      return;
    }

    const donationData: CreateDonationDto = {
      name: itemName,
      quality: qualityMap[quality],
      description,
      files: images,
      categoryId: selectedCategoryId,
      donorId: auth!.user.donor!.id,
    };

    setIsSubmitting(true);
    onSubmit(donationData);
    setItemName("");
    setSelectedCategoryId(null);
    setDescription("");
    setQuality("good");
    setImages([]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable onPress={onClose} className="flex-1 bg-black/30 justify-center items-center">
        <Pressable onPress={() => {}} className="bg-white w-11/12 p-5 rounded-xl gap-4">
          <Text className="text-xl font-bold text-center">Add New Donation</Text>

          <ImagePickerSection images={images} setImages={setImages} />
          <TextFieldsSection
            itemName={itemName}
            setItemName={setItemName}
            description={description}
            setDescription={setDescription}
          />
          <CategorySelector selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />
          <QualitySelector quality={quality} setQuality={setQuality} />

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
