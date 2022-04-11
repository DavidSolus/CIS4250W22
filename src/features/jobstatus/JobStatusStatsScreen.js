import { View, Text, Button } from 'react-native';
import React, {useContext, useEffect, useState} from 'react'
import { JobStatusContext } from '../../contexts/JobStatusContext';

const JobStatusStatsScreen = ({navigation}) => {
  const {jobDoc} = useContext(JobStatusContext);
  const [jobStatus, setJobStatus] = useState();

  useEffect(()=>{
    countStats();
  },[])

  const countStats = () => {
    let statusList = [];
    jobDoc.forEach(element => {
      statusList.push(element.status)
    });
    setJobStatus(statusList);
  }

  const checkJobStatusState = () => {
    console.log("Checking: " + jobStatus);
  }

  return (
    //Text is to create space from the top
    <View><Text></Text>
      <Button title="Return" onPress={()=>{navigation.replace('JobStatus')}}></Button>
      <Button title="Checking Stats" onPress={()=>{checkJobStatusState()}}></Button>
    </View>
  );
} 

export default JobStatusStatsScreen;