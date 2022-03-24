import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack'
import JobStatusScreen from '../features/jobstatus/JobStatusScreen';
import JobStatusForm from '../components/JobStatusForm';
import { JobStatusContextProvider } from '../contexts/JobStatusContext';
import JobStausEditScreen from '../features/jobstatus/JobStausEditScreen';

const JobStatusStack = createNativeStackNavigator();

export default function JobStatusNavigator() {
  return (
      <JobStatusContextProvider>
    <JobStatusStack.Navigator 
    initialRouteName="JobStatus"
    screenOptions={{ headerShown: false }}
    >
        <JobStatusStack.Screen name='JobStatus' component={JobStatusScreen} />
        <JobStatusStack.Screen name='JobForm' component={JobStatusForm} />
        <JobStatusStack.Screen name='JobStatusEdit' component={JobStausEditScreen} />
        
    </JobStatusStack.Navigator>

    </JobStatusContextProvider>
  )
}