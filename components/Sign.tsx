import { View, Text } from 'react-native'
import React from 'react'
import Custombutton from './Button'
import { useRouter,Redirect } from 'expo-router';
import { useAuth } from '@/contexts/authContext';
const Signin = ({buttonStyles, children , type}: {buttonStyles?:string,type:string , children?: React.ReactNode,}) => {
  const router = useRouter();  
  const { signOut  } = useAuth();
  return (
    <Custombutton
        handlePress={()=> {type==='signin'? router.push('/Auth') : signOut();}}
        buttonStyles={buttonStyles}
      >
        {children}
       
      </Custombutton>
  )
}

export default Signin