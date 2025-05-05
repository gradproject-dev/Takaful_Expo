import { Text, View, Image, ActivityIndicator } from "react-native";
import { Redirect, useRouter } from "expo-router";
import Input from "../../components/Input";
import Custombutton from "../../components/Button";
import WelcomeImage from "../../assets/images/welcome.png";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/utils/fetchData";
import { useState } from "react";
import { BACKENDURL } from "@/constants";
import { Auth } from "./types";
import { useAuth } from "@/contexts/authContext";

const Login = () => {
  const router = useRouter();
  const { isLoading, auth, signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () =>
      postData(`${BACKENDURL}/auth/sign-in`, {
        email,
        password,
      }),
    onSuccess: (data: Auth) => {
      signIn(data); // Save parsed Auth object to storage
    },
  });

  const handleSubmit = () => {
    if (!email.trim() || !password.trim() || !email.includes("@")) {
      alert("Please fill in all fields correctly.");
      return;
    }
    mutate();
  };

  if (isLoading) return <Text>replace this text with a splash screen</Text>;
  if (auth?.token) return <Redirect href="/MainPage" />;

  const handleCreateAccount = () => router.push("/Auth/SignupDonor");
  const handleSkip = () => router.push("/MainPage");

  const onChangeFunction = (text: string, field: string) => {
    if (field === "Email") setEmail(text);
    else if (field === "Password") setPassword(text);
  };

  return (
    <View className="flex-1 relative items-center bg-white p-10">
      <Custombutton
        handlePress={handleSkip}
        buttonStyles="absolute top-14 right-8 z-10"
        disabled={isPending}
      >
        <Text className="text-md text-white bg-blue-500 py-2 px-4 rounded-xl">
          Skip
        </Text>
      </Custombutton>

      <View className="mt-10">
        <Image source={WelcomeImage} className="size-70" />
        <Text className="text-5xl font-bold text-center text-[#094067]">
          Welcome
        </Text>
      </View>

      <View className="mt-14 w-full gap-6">
        <Input
          placeholder="Enter Your Email Please"
          label="Email"
          onChangeFn={onChangeFunction}
          value={email}
          disabled={isPending}
        />
        <Input
          placeholder="Enter Your Password Please"
          label="Password"
          onChangeFn={onChangeFunction}
          value={password}
          secureTextEntry={true}
          disabled={isPending}
        />
        <Custombutton
          buttonStyles="flex-row justify-end w-full relative bottom-4"
          handlePress={() => router.push("/")}
          disabled={isPending}
        >
          <Text className="font-bold text-blue-500">Forgot Password?</Text>
        </Custombutton>
      </View>

      {isError && (
        <Text className="text-red-500 text-center mt-4">
          Invalid email or password
        </Text>
      )}

      <Custombutton
        buttonStyles="w-full h-14 bg-blue-500 justify-center rounded-2xl mt-10"
        handlePress={handleSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <View className="flex-row items-center justify-center w-full gap-2">
            <ActivityIndicator size="large" color="red" />
            <Text className="text-white text-2xl font-medium">
              Submitting Data...
            </Text>
          </View>
        ) : (
          <Text className="text-center text-2xl text-white font-bold">
            Login
          </Text>
        )}
      </Custombutton>

      <View className="mt-8 items-center">
        <Text>Don't have an account?</Text>
        <Custombutton handlePress={handleCreateAccount} disabled={isPending}>
          <Text className="underline">Create One</Text>
        </Custombutton>
      </View>
    </View>
  );
};

export default Login;
