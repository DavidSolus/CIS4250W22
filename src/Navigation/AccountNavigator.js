import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();


const AccountNavigator = () => {
  return (
<<<<<<< HEAD
    <Stack.Navigator screenOptions={{ headerShown: false }}>
=======
    <Stack.Navigator headerMode = "none">
>>>>>>> master
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AccountNavigator
