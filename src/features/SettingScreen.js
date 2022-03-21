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
<<<<<<< HEAD
        <Text style={styles.emailContainer}>Registered as: {user.email}</Text>
=======
        <Text>Registered as: {user.email}</Text>
>>>>>>> master

      </View>
      <Button onPress={()=>{handleLogout(user)}}> Log out</Button> 
    </>
  )
}

export default SettingScreen

<<<<<<< HEAD
const styles = StyleSheet.create({
  emailContainer: {
    padding:10,
    fontSize:18
  }
})
=======
const styles = StyleSheet.create({})
>>>>>>> master
