import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const auth = getAuth();

    // useEffect(()=> {
    //     // const subscription = props.source.subscribe();
    //     const unsubscribe = auth.onAuthStateChanged((user)=>{
    //         if(user){
    //             // navigation.replace("Home")
    //             setUser(user)
    //         }
            
    //     })
    //     return unsubscribe

    // },[user])

    onAuthStateChanged(auth, (curUser)=>{
        setUser(curUser)
    })
      
    const handleRegister = (email, password, repeatedPassword) =>{
        if(password !== repeatedPassword){
            setError("Password does not match")
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            // setUser(user)
            const user = userCredential.user
            setUser(user)
            console.log(user.email)
        // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage)
            console.log(errorMessage);
        });

    } 

    // const handleLogin = async (email, password) => {
    //     // setIsLoading(true)
    //     try {
    //         const user = await signInWithEmailAndPassword(
    //           auth,
    //           email,
    //           password
    //         );
    //         console.log(user);
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    // }

    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user
            setUser(user)
            console.log(user.email)
            
        // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage)
            console.log(errorMessage)
        });
    }

    const handleLogout = (user)=> {
        signOut(auth).then(() => {
            // Sign-out successful.
                // navigation.replace("Login")
                // setUser(user)
                console.log(user.email)
            }).catch((error) => {
            // An error happened.
                setError(null)
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }


  return (
    <AuthContext.Provider 
    value={{
        isAuthenticated: !!user,
        user, error, handleLogin, handleRegister, handleLogout, isLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

// export default AuthContextProvider