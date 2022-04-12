import { View, Text, Button, StyleSheet } from 'react-native';
import React, {useContext, useEffect, useState} from 'react'
import { JobStatusContext } from '../../contexts/JobStatusContext';

const JobStatusStatsScreen = ({navigation}) => {
  const {jobDoc} = useContext(JobStatusContext);
  const [jobStatus, setJobStatus] = useState();
  const [jobDict, setJobDict] = useState({});
  const [numApplication, setNumApplications] = useState();

  useEffect(()=>{
    countStats();
  },[]);

  // USE THESE NAMES FOR THE STATUS: *********************************************
  // Reject
  // Interview
  // Offer

  const countStats = () => {
    let statusList = [];
    let statusDic = {};
    let num = 0;

    jobDoc.forEach(element => {
      let tempStatus = element.status;

      statusList.push(tempStatus);

      if (tempStatus in statusDic) {
        statusDic[tempStatus] += 1;
      } else {
        statusDic[tempStatus] = 1;
      }
      num += 1
    });

    if (!statusDic["Reject"]) {statusDic["Reject"] = 0;}
    if (!statusDic["Interview"]) {statusDic["Interview"] = 0;}
    if (!statusDic["Offer"]) {statusDic["Offer"] = 0;}

    setJobStatus(statusList);
    setJobDict(statusDic);
    setNumApplications(num);

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
      <Text style={styles.title}>Number of Applications: {numApplication}</Text>
      <Text style={styles.title}>Number of Rejections: {jobDict["Reject"]}</Text>
      <Text style={styles.title}>Number of Interviews: {jobDict["Interview"]}</Text>
      <Text style={styles.title}>Number of Offers: {jobDict["Offer"]}</Text>
      <Text></Text>
      <Text style={styles.title}>1 - Apps Rejected: {jobDict["Reject"] / numApplication * 100}%</Text>
      <Text style={styles.title}>2 - Apps Interviews: {jobDict["Interview"] / numApplication * 100}%</Text>
      <Text style={styles.title}>3 - Apps Offer: {jobDict["Offer"] / numApplication * 100}%</Text>
      <Text style={styles.title}>4 - Apps Interviews to Offers: {jobDict["Offer"] / jobDict["Interview"] * 100}%</Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 24,
    fontWeight:'700',
  },
});

export default JobStatusStatsScreen;