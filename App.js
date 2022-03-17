import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Navigation } from './src/Navigation';
import { JobStatusContextProvider } from './src/contexts/JobStatusContext';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container} >

        <AuthContextProvider>
          

            <Navigation/>
          {/* </JobStatusContextProvider> */}
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
