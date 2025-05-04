import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Input from "@/components/Input";
import Custombutton from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { useJWT } from "@/contexts/authContext";
import { router } from "expo-router";
import { createDonor, postData } from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PhoneInput from "react-native-phone-number-input";
import * as LocationGeocoding from "expo-location";
import { Auth } from "./types";

const SignupDonor = () => {
  const { signIn } = useJWT();
  const mapRef = useRef<MapView>(null);
  const phoneInput = useRef<PhoneInput>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    address: "",
  });

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: () =>
      postData(`${BACKENDURL}/auth/sign-in`, {
        email: formData.email,
        password: formData.password,
      }),
    onSuccess: (data: Auth) => {
      signIn(data);
    },
  });

  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const { confirmpassword, ...rest } = formData;
      const lat = coordinates!.lat.toString();
      const lng = coordinates!.lng.toString();

      return createDonor(`${BACKENDURL}/donors`, {
        ...rest,
        lat,
        lng,
      });
    },
    onSuccess: () => {
      login();
      router.replace("/(main)/Events");
    },
  });

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const result = await LocationGeocoding.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (result.length > 0) {
        const { street, name, city, region, country } = result[0];
        const addressString = `${name || street || ""}, ${
          city || region || ""
        }, ${country || ""}`;
        setFormData((prev) => ({ ...prev, address: addressString }));
      }
    } catch (error) {
      console.warn("Failed to reverse geocode location", error);
    }
  };

  const onChangeFunction = (text: string, fieldName: string) => {
    const field = fieldName.toLowerCase();
    setFormData((prev) => ({ ...prev, [field]: text.trimStart() }));
  };

  const handleSubmit = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.confirmpassword.trim()
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }
    if (!coordinates) {
      alert("Please select your location.");
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match.");
      return;
    }
    mutate();
  };

  useEffect(() => {
    (async () => {
      try {
        setLocationLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required.");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        const newCoords = { lat: latitude, lng: longitude };
        setCoordinates(newCoords);
        reverseGeocode(latitude, longitude);
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (error) {
        Alert.alert("Error", "Failed to get location.");
      } finally {
        setLocationLoading(false);
      }
    })();
  }, []);

  const relocateToCurrent = async () => {
    try {
      setLocationLoading(true);
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      const newCoords = { lat: latitude, lng: longitude };
      setCoordinates(newCoords);
      reverseGeocode(latitude, longitude);
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (err) {
      Alert.alert("Error", "Could not get current location.");
    } finally {
      setLocationLoading(false);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.password.trim() &&
    formData.confirmpassword.trim() &&
    coordinates !== null &&
    formData.password === formData.confirmpassword;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 100,
        gap: 4,
        paddingHorizontal: 26,
        paddingBottom: 50,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-5xl font-bold text-[#094067] text-center mb-10">
        Join Us as a Donor
      </Text>

      <Input label="Name" onChangeFn={onChangeFunction} />
      <Input label="Email" onChangeFn={onChangeFunction} />

      <View style={{ width: "100%", marginBottom: 10 }}>
        <Text className="text-xl font-bold mb-1 ml-2">Phone</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={formData.phone}
          defaultCode="JO"
          layout="first"
          onChangeFormattedText={(text) =>
            setFormData((prev) => ({ ...prev, phone: text }))
          }
          containerStyle={{
            width: "100%",
            height: 48,
            borderWidth: 2,
            borderRadius: 12,
            borderColor: "#094067",
            backgroundColor: "white",
          }}
          textContainerStyle={{
            backgroundColor: "white",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
          textInputStyle={{ fontSize: 20, color: "#000" }}
          codeTextStyle={{ fontSize: 18, color: "#000" }}
        />
      </View>

      <Input label="Password" secureTextEntry onChangeFn={onChangeFunction} />
      <Input
        label="ConfirmPassword"
        secureTextEntry
        onChangeFn={onChangeFunction}
      />

      {coordinates && (
        <View style={{ width: "100%", height: 300, marginTop: 10 }}>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            region={{
              latitude: coordinates.lat,
              longitude: coordinates.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setCoordinates({ lat: latitude, lng: longitude });
              reverseGeocode(latitude, longitude);
            }}
          >
            <Marker
              coordinate={{
                latitude: coordinates.lat,
                longitude: coordinates.lng,
              }}
            />
          </MapView>
        </View>
      )}

      {formData.address ? (
        <Text style={{ marginTop: 10, fontSize: 16, color: "gray" }}>
          📍 {formData.address}
        </Text>
      ) : null}

      <Button
        title={locationLoading ? "Relocating..." : "Relocate to My Location"}
        onPress={relocateToCurrent}
        disabled={locationLoading}
      />

      <Custombutton
        handlePress={handleSubmit}
        buttonStyles={`w-full h-14 ${
          !isFormValid ? "bg-gray-400" : "bg-blue-500"
        } justify-center rounded-2xl mt-10`}
        disabled={!isFormValid || isPending}
      >
        {isPending ? (
          <View className="items-center flex-row justify-center gap-1 w-full">
            <ActivityIndicator size="large" color="red" />
            <Text className="text-xl font-bold text-white">Submitting ...</Text>
          </View>
        ) : (
          <Text className="text-center text-2xl text-white font-bold">
            Join Us
          </Text>
        )}
      </Custombutton>
    </ScrollView>
  );
};

export default SignupDonor;
