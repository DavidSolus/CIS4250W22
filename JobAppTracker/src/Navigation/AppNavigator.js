import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobStatusScreen from '../features/jobstatus/JobStatusScreen';
import SettingScreen from '../features/SettingScreen';
import JobSearchScreen from '../features/JobSearchScreen';
import { JobStatusContextProvider } from '../contexts/JobStatusContext';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <JobStatusContextProvider>
      <Tab.Navigator
        initialRouteName="JobStatus"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen 
          name="JobStatus" 
          component={JobStatusScreen}
          options={{
            tabBarLabel: 'Job Status',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-graduate" color={color} size={size} />
            ),
          }} />
        <Tab.Screen 
          name="JobSearch" 
          component={JobSearchScreen}
          options={{
            tabBarLabel: 'Job Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="layers-search" color={color} size={size} />
            ),
          }} />
        <Tab.Screen 
          name="Settings" 
          component={SettingScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }} />
      </Tab.Navigator>
    </JobStatusContextProvider>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})