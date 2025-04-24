import { View, Text } from 'react-native'
import React from 'react'
import Custombutton from './Button'
interface props {
    text: string,
    onClick: (id: string) => void,
    highlight?: boolean,
    id: string
}
const CategoryItem = ({text,id, onClick, highlight}: props) => {
  return (
    <Custombutton
    buttonStyles={`px-2 py-2 rounded-full ${highlight ? 'bg-[gray]' : 'bg-[white]'}`}
    handlePress={() => onClick(id)}
    >
    <Text className='text-center font-bold'>{text}</Text>
    </Custombutton>
  )
}

export default CategoryItem;
