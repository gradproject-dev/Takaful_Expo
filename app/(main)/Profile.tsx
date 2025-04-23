import { View, Text, TouchableOpacity , Image} from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import Sign from "@/components/Sign";

const Profile = () => {
  const { auth  } = useAuth();
  let content = undefined;
  if(!auth) {
  
   content = <View className="flex-1 my-16 mx-4 gap-5 items-center justify-center">


   <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
     You’re not signed in
   </Text>

   <Text className="text-base text-gray-500 text-center mb-6">
     Sign in to see your profile, join events, and do more!
   </Text>
   <Sign buttonStyles="py-2 px-5  bg-blue-500 rounded-full" type="signin">
      <Text className={`text-xl text-white py-2 px-4 rounded-xl`} >
          Sign In
        </Text>
      </Sign>
   
    </View>
  }
  if(auth) {

    content = 
     
        <View className="flex-1 justify-center items-center bg-white px-4">
        
              <Text className="text-2xl font-semibold mb-4">👋 Welcome, Mahde</Text>
              <Text className="text-base text-gray-700 mb-1">📧 mahde@gmail.com</Text>
              <Text className="text-base text-gray-700 mb-6">📱 0797234701</Text>
    
              <Sign buttonStyles="absolute top-16 left-8 z-10 bg-red-500 rounded-2xl"  type="signout">
                  <Text className={`text-md text-white py-2 px-4 rounded-xl`} >
                      Sign Out
                    </Text>
              </Sign>

        </View>
  }
  console.log('auth', auth);
  return (
   
        content 
  );
};

export default Profile;
