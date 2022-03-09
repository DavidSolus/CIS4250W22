import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { AuthContext } from '../contexts/AuthContext'

const SettingScreen = () => {

  const {error, handleLogout,user} = useContext(AuthContext)
  return (
    <>
      <View>
        <Text>SettingScreen</Text>
        <Text>Registered as: {user.email}</Text>

      </View>
      <Button onPress={()=>{handleLogout(user)}}> Log out</Button> 
    </>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})