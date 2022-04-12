import { View, Text, Button } from 'react-native';
import React, {useContext, useEffect, useState} from 'react'
import { JobStatusContext } from '../../contexts/JobStatusContext';

const JobStatusStatsScreen = ({navigation}) => {
  const {jobDoc} = useContext(JobStatusContext);
  const [jobStatus, setJobStatus] = useState();
  const [jobDict, setJobDict] = useState({});

  useEffect(()=>{
    countStats();
  },[])

  const countStats = () => {
    let statusList = [];
    let statusDic = {};

    jobDoc.forEach(element => {
      let tempStatus = element.status;

      statusList.push(tempStatus);

      if (tempStatus in statusDic) {
        statusDic[tempStatus] += 1;
      } else {
        statusDic[tempStatus] = 1;
      }
    });

    setJobStatus(statusList);
    setJobDict(statusDic);

    checkJobStatusState();
  }

  const checkJobStatusState = () => {
    console.log("Checking List: " + jobStatus);
    console.log("Checking Dict: " + JSON.stringify(jobDict));
  }

  return (
    //Text is to create space from the top
    <View><Text></Text>
      <Button title="Return" onPress={()=>{navigation.replace('JobStatus')}}></Button>
      {/* <Button title="Checking Stats" onPress={()=>{checkJobStatusState()}}></Button> */}
    </View>
  );
} 

export default JobStatusStatsScreen;