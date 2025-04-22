import {  TouchableOpacity} from 'react-native'
import React from 'react'
interface InputProps {
    buttonStyles?: string;
    handlePress ?: () => void,
    children?: React.ReactNode,
    disabled?: boolean;
  }
const Custombutton = ({buttonStyles,  handlePress ,children, disabled} : InputProps) => {
  return (
    <TouchableOpacity  disabled={disabled} onPress={handlePress} className={buttonStyles} >
            {children}
    </TouchableOpacity>
  )
}

export default Custombutton