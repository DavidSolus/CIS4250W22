import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreens from './src/screens/OldScreen';
import HomeScreen from './src/screens/HomeScreen';
import AccountNavigator from './src/Navigation/AccountNavigator';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Navigation } from './src/Navigation';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container} >

        <AuthContextProvider>
            {/* <NavigationContainer> */}
              {/* <Stack.Navigator>
                <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreens} />
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
              </Stack.Navigator> */}
              <Navigation/>
            {/* </NavigationContainer> */}
        </AuthContextProvider>

        <ExpoStatusBar style="auto" />
      </SafeAreaView >

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    // backgroundColor: 'green',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
