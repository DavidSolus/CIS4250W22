import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Button, TextInput } from 'react-native-paper'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {error, handleLogin} = useContext(AuthContext)

  return (
    <>
        <KeyboardAvoidingView
            behavior='padding'
            style = {styles.container}>
            <TextInput
                label="Email"
                uppercase= "false"
                autoCapitalize='none'
                style={styles.textField}
                value={email}
                onChangeText={text => setEmail(text)} />
            <TextInput
                label="Password"
                autoCapitalize='none'
                style={styles.textField}
                value={password}
                onChangeText={text => setPassword(text)} 
                secureTextEntry/>

            <View>
              {error && <Text>{error}</Text>}
            </View>
            
            <Button icon="lock-outline" mode="contained" style = {styles.logBtn} onPress={()=> handleLogin(email,password)} >
                Log in to existing Account
            </Button>

            <View style ={styles.regContainer}>
              <Text>New to Application Tracker? <Text style = {styles.regBtn} onPress={()=> navigation.navigate('Register')}>Sign Up</Text> </Text> 
                
            </View>

        </KeyboardAvoidingView>
    
    </>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal:25
  },
  regBtn: {
    color: "red",
    padding:10,
    marginTop:10,
    fontSize:18

  },
  regContainer: {
    padding:10
  },
  logBtn:{
    padding:10,
    marginTop:15,
  
  },
  textField:{
    marginBottom:10
  }

})