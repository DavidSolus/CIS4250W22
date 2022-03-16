// React
import { Animated, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { ApplicationScreen } from './application';
import { ResumeScreen } from './resume';
import { JobScreen } from './job'

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
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Application" component={ApplicationScreen} />
      <Tab.Screen name="ResumeScreen" component={ResumeScreen} />
			<Tab.Screen name="JobScreen" component={JobScreen} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Application" component={ApplicationScreen} />
      <Tab.Screen name="Resume" component={ResumeScreen} />
      <Tab.Screen name="Job" component={JobScreen} />
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