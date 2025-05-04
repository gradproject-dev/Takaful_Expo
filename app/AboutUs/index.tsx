import React from 'react'
import { View, Text, ScrollView } from 'react-native'

const Welcome = () => {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-4xl  mt-16 font-bold text-[#094067] text-center mb-6">
        Welcome to Takaful
      </Text>

      <Text className="text-lg text-gray-700 mb-4">
        Takaful is your companion for community giving. Whether you're here to discover events, support a charity, or make a donation — we’re happy to have you!
      </Text>

      <Text className="text-xl font-semibold text-[#3da9fc] mt-6 mb-2">🗓️ Explore Events</Text>
      <Text className="text-gray-600 mb-4">
        Join upcoming events and see what’s happening in your community.

      </Text>

      <Text className="text-xl font-semibold text-[#3da9fc] mb-2">❤️ Support Charities</Text>
      <Text className="text-gray-600 mb-4">
        Find and support causes that matter most to you.

      </Text>

      <Text className="text-xl font-semibold text-[#3da9fc] mb-2">💸 Make Donations</Text>
      <Text className="text-gray-600 mb-4">
        Donate easily and directly. Every contribution makes a difference.

      </Text>

      <Text className="text-xl font-semibold text-[#3da9fc] mb-2">👤 Your Profile</Text>
      <Text className="text-gray-600 mb-4">
        View your giving history and manage your preferences anytime.

      </Text>

      <Text className="text-xl font-semibold text-[#3da9fc] mb-2">ℹ️ About Us</Text>
      <Text className="text-gray-600">
        Learn about the story behind Takaful and the positive change we’re building together.

      </Text>
    </ScrollView>
  )
}

export default Welcome
