import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import fetchData from '@/utils/fetchData'
import { BACKENDURL } from '@/constants'

interface props {
  hanldeCategoryClick: (id: string) => void
  selectedCategory: string[]
}
const CategoryContainer = ({hanldeCategoryClick,selectedCategory }: props) => {
  const {data: categories, isLoading , isError} = useQuery({
    queryKey: ['categories'],
    queryFn:  () => 
      fetchData(`${BACKENDURL}/category/all`)
    ,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })
  
  if (isLoading) return <Text>Loading...</Text>
  if (isError) return <Text>Error</Text>
  return (
    <FlatList
        data={!isLoading && !isError && categories? categories: []}
        renderItem={({item}) => <CategoryItem onClick={() => hanldeCategoryClick(item.id.toString())} text={item?.name} id={item.id} highlight={selectedCategory.includes(item.id.toString()) ? true : false} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:10 }} 
        ItemSeparatorComponent={() => <View className="w-3"  />}
        />
        
  )
}

export default CategoryContainer