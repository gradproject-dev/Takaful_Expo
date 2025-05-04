import React, { useState, useRef } from "react";
import { View, Button, StyleSheet, Dimensions, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const screen = Dimensions.get("screen");

const SimpleMapPicker = ({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) => {
  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: 31.963158, // Default Amman
    longitude: 35.930359,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setMarker(coords);
    setRegion({
      ...coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current?.animateToRegion({
      ...coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    onLocationChange(coords.latitude, coords.longitude);
  };

  const onMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    onLocationChange(latitude, longitude);
  };

  return (
    <View>
      <MapView
        ref={mapRef}
        style={{ width: screen.width, height: 350 }}
        region={region}
        onPress={onMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <View style={styles.button}>
        <Button title="Use My Current Location" onPress={getCurrentLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default SimpleMapPicker;
