import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack'
import JobStatusScreen from '../features/jobstatus/JobStatusScreen';
import JobStatusForm from '../components/JobStatusForm';
import { JobStatusContextProvider } from '../contexts/JobStatusContext';
import JobStausEditScreen from '../features/jobstatus/JobStausEditScreen';
import JobStatusStatsScreen from '../features/jobstatus/JobStatusStatsScreen';
import ResumeSelection from '../components/ResumeSelection'

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
        <JobStatusStack.Screen name='JobStats' component={JobStatusStatsScreen} />
        <JobStatusStack.Screen name='ResumeSelect' component={ResumeSelection} />
        
        
    </JobStatusStack.Navigator>

    </JobStatusContextProvider>
  )
}