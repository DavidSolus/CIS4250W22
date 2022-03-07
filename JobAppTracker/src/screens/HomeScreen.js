import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const auth = getAuth();
    const navigation = useNavigation();

    const handleLogout = ()=> {
        signOut(auth).then(() => {
            // Sign-out successful.
                navigation.replace("Login")
                console.log(auth.currentUser)
            }).catch((error) => {
            // An error happened.
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

  return (
    <Button icon="lock-open" mode="contained" onPress={handleLogout}>
        Log out
    </Button>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})