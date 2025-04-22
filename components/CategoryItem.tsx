import { View, Text } from 'react-native'
import React from 'react'
import Custombutton from './Button'
interface props {
    text: string,
    onClick: (text: string) => void,
    highlight?: boolean
}
const CategoryItem = ({text, onClick, highlight}: props) => {
  return (
    <Custombutton
    buttonStyles={`px-2 py-2 rounded-full ${highlight ? 'bg-[gray]' : 'bg-[white]'}`}
    handlePress={() => onClick(text)}
    >
    <Text className='text-center font-bold'>{text}</Text>
    </Custombutton>
  )
}

export default CategoryItem;
