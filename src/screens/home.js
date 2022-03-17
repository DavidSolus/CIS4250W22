// React
import { Animated, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { ApplicationScreen } from './application';
import { ResumeScreen } from './resume';
import { ResumeScreenNew } from './newresume';
import { JobScreen } from './job'
import { EmailScreen } from './email'

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Application Screen"
        onPress={() => navigation.navigate('Application')}
      />
      <Button
        title="Go to Resume Screen"
        onPress={() => navigation.navigate('Resume')}
      />
      <Button
        title="Go to Job Screen"
        onPress={() => navigation.navigate('Job')}
      />
      <Button
        title="Go to Email Screen"
        onPress={() => navigation.navigate('Email')}
      />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Application" component={ApplicationScreen} />
      <Tab.Screen name="ResumeScreen" component={ResumeScreenNew} />
			<Tab.Screen name="JobScreen" component={JobScreen} />
      <Tab.Screen name="EmailScreen" component={EmailScreen} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Application" component={ApplicationScreen} />
      <Tab.Screen name="Resume" component={ResumeScreenNew} />
      <Tab.Screen name="Job" component={JobScreen} />
      <Tab.Screen name="Email" component={EmailScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { HomeScreen, MyTabs };