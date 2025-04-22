import React from "react";
import { Image, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { View } from "react-native";

const { width } = Dimensions.get("window");
import item from "@/assets/images/item.png";

const ImageSlider = ({images}: {images: string[]}) => {
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
          <Image
            key={index}
            source={{uri : image}}
            resizeMode="cover"
            style={styles.image}
          />
        ))}
      </Swiper>
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
});

export default ImageSlider;
