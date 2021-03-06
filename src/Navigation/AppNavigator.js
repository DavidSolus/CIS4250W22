import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobStatusScreen from '../features/jobstatus/JobStatusScreen';
import SettingScreen from '../features/SettingScreen';
import JobSearchScreen from '../features/JobSearchScreen';
import { JobStatusContextProvider } from '../contexts/JobStatusContext';
import ResumeScreen from '../features/resume/ResumeScreen';
import { EmailScreen } from '../screens/email';
import JobStatusNavigator from './JobStatusNavigator';
import ResumeContextProvider from '../contexts/ResumeContext';
import DateFilter from '../features/DateFilter';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <ResumeContextProvider>
    <JobStatusContextProvider>
      <Tab.Navigator
        initialRouteName="JobStatusNav"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          headerShown:false
        }}
      >
        <Tab.Screen 
          name="JobStatusNav" 
          component={JobStatusNavigator}
          options={{
            tabBarLabel: 'Job Status',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-graduate" color={color} size={size} />
            ),
          }} />
        {/* <Tab.Screen 
        name="Date" 
        component={DateFilter}
        options={{
          tabBarLabel: 'Date test',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-newspaper" color={color} size={size} />
          ),
        }} /> */}
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
          name="EmailSearch" 
          component={EmailScreen}
          options={{
            tabBarLabel: 'Email Search',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="mail" color={color} size={size} />
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
    </ResumeContextProvider>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})