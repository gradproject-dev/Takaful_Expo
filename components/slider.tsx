import React, { useState } from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { View } from "react-native";

const { width, height } = Dimensions.get("window");

const ImageSlider = ({ images }: { images: string[] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openFullScreen = (image: string) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeFullScreen = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.wrapper}>
      <Swiper
        showsPagination
        dotColor="black"
        activeDotColor="white"
        loop={false}
        style={{ borderRadius: 12 }}
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => openFullScreen(image)}>
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </Swiper>

      {/* Full-screen modal */}
      {selectedImage && (
        <Modal
          visible={modalVisible}
          transparent={false}
          animationType="fade"
          onRequestClose={closeFullScreen}
        >
          <TouchableOpacity
            style={styles.modalWrapper}
            onPress={closeFullScreen}
          >
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    width: width * 0.9,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  fullScreenImage: {
    width: "100%",
    height: height, // Make the image fit the full height of the screen
  },
});

export default ImageSlider;
