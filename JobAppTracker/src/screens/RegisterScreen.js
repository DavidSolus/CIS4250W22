import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Button, TextInput } from 'react-native-paper'

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')

  const {error, handleRegister} = useContext(AuthContext)
  return (
    <>
        <KeyboardAvoidingView
            behavior='padding'
            style = {styles.container}>
            <TextInput
                label="Email"
                uppercase= "false"
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)} />
            <TextInput
                label="Password"
                autoCapitalize='none'
                value={password}
                onChangeText={text => setPassword(text)} 
                secureTextEntry/>
            
            <TextInput
                label="Password"
                autoCapitalize='none'
                value={repeatedPassword}
                onChangeText={text => setRepeatedPassword(text)} 
                secureTextEntry/>
            <View>
              {error && <Text>{error}</Text>}
            </View>
            <Button icon="lock-outline" mode="contained" onPress={()=> handleRegister(email, password, repeatedPassword)} >
                Create New Account
            </Button>

            <View style ={styles.regContainer}>
              <Text>Already a member <Text style = {styles.regBtn} onPress={()=> navigation.navigate('Login')}>Log in </Text> </Text> 
                
            </View>

        </KeyboardAvoidingView>
    
    </>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({

  container: {
    flex:1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal:25
  },
  regBtn: {
    color: "red"

  },
  regContainer: {
    padding:10
  }
})