import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const LoginScreens = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsauthenticated] = useState(false);
    const navigation = useNavigation()

    // useEffect(()=>{
    //     auth.signInWithEmailAndPassword("test@gmail.com", "test345")
    //     .then((user)=> {
    //         console.log(user)
    //         setIsauthenticated(true)
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //     })
    // },[]);

    // const handleRegister = () => {
    //     auth.createUserWithEmailAndPassword(email, password)
    //     .then(userCredentials=>{
    //         const user = userCredentials.user;
    //         console.log(user.email)
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //     })
    // }

    const auth = getAuth();
        
    const handleRegister = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            // setUser(user)
            const user = userCredential.user;
            console.log(user.email)
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

    } 

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            // setUser(user)
            const user = userCredential.user;
            console.log(user.email)
            
        // ...
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    
    useEffect(()=> {
        // const subscription = props.source.subscribe();
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            if(user){
                // navigation.replace("Home")
            }
            
        })

        return unsubscribe

        // return () => {
        //     // Clean up the subscription
        //     subscription.unsubscribe();
        //   };

    },[])

  return (
    <>
        <KeyboardAvoidingView
            behavior='padding'
            style = {styles.container}>
            <TextInput
                label="Email"
                uppercase= "false"
                value={email}
                onChangeText={text => setEmail(text)} />
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)} 
                secureTextEntry/>
            
            <Button icon="lock-outline" mode="contained" onPress={handleLogin}>
                Log in to existing Account
            </Button>
            <Button icon="account-box" mode="contained" onPress={handleRegister}>
                Create New Account
            </Button>

        </KeyboardAvoidingView>
    
    </>
  )
}

export default LoginScreens

const styles = StyleSheet.create({

    container: {
        flex:1,
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal:25
    }
})