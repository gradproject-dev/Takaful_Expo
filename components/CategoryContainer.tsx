import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import { useState } from 'react'

interface prop { 
  data?: string[]
}
const CategoryContainer = ({data} : prop) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const handleClick = (text: string) => {
    if (selectedCategory.includes(text)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== text))
    } else {
      setSelectedCategory([...selectedCategory, text])
    }

  }
  return (
    <FlatList
        data={data}
        renderItem={({item}) => <CategoryItem onClick={() => handleClick(item)} text={item} highlight={selectedCategory.includes(item) ? true : false} />}
        keyExtractor={(item) =>( Math.random()*1000).toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:10 }} 
        ItemSeparatorComponent={() => <View className="w-3"  />}
        />
        
  )
}

export default CategoryContainer