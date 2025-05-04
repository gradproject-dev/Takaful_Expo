import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Custombutton from '@/components/Button'
import { router } from 'expo-router'

interface dataType {
  id: number
  title?: string
  href: string
}
const ItemSeparator = () => <View style={{ height: 20 }} />;

const Index = () => {
  const data: dataType[] = [
    { id: 1, title: 'Events', href: '/(main)/Events' },
    { id: 2, title: 'Charities', href: '/(main)/Charities' },
    { id: 3, title: 'Donations', href: '/(main)/Donations' },
    { id: 4, title: 'Profile', href: '/(main)/Profile' },
    { id: 5, title: 'About Us', href: '/AboutUs' },
  ]

  return (
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparator}

        keyExtractor={(item) => item.id.toString()}
        className="flex-1  my-20 mx-4   "
        
        renderItem={({ item }) => (
          <Custombutton
             handlePress={() => router.push(`${item.href}`)}
            buttonStyles="bg-white text-center py-5 w-full  rounded-xl mb-2"
          >
                <Text className='text-center text-2xl font-bold'>{item.title}</Text>
          </Custombutton>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ListHeaderComponent={() => (
            <Text className="text-5xl font-bold text-center text-[#094067] mb-20">
                Takaful
            </Text>
        )}
      />
  )
}

export default Index
