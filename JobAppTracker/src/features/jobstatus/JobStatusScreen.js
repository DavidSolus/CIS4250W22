import {FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Button, TextInput } from 'react-native-paper';

const JobStatusScreen = () => {

  const [jobs, setJobs] = useState([]);
  const jobsCollectionRef = collection(db,"jobs") 

  const [newJobs, setNewJobs] = useState([{ companyName:"", jobName:"", status:"", note:"" }])
  
  const createNewjobs = async ()=> {
    await addDoc(jobsCollectionRef, newJobs)
    console.log(newJobs)
  }

  const deleteJobs = async (id)=>{
    const jobsDoc = doc(db,"jobs", id)
    // await deleteJobs(jobsDoc)
    console.log(id)
  }
  
  // const getCompanyName = (usr) =>{
  //   jobs.map(usr)
  // }

  useEffect(()=> {
    const getJobs = async ()=>{
      const jobData = await getDocs(jobsCollectionRef)  
      // console.log(jobData)
      if(jobs !== null){
        setJobs(jobData.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
        console.log(...jobs)  
      }
      
    }
    getJobs()
  },[])

  const Item = ({ title, stat }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Company name: {title} , status: {stat}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <>
      <Item title={item.companyName} 
            stat= {item.status}/>
    </>
  );

  return (
    <>
      <KeyboardAvoidingView
            behavior='padding'
            style = {styles.container}>
      {/* <View>
        <Text>JobStatusScreen</Text>
        <Text style={styles.jobContainer}>Comany Name:{jobs[1].companyName} and Status: {jobs[1].status} </Text>

      </View> */}

      <FlatList
      data={jobs}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
      <Text>test: {newJobs.companyName}</Text>
      <View>
        <TextInput
          label="Company Name"
          uppercase= "false"
          autoCapitalize='none'
          value={newJobs.companyName}
          // onChangeText={(cName)=>setNewJobs({companyName:cName.value})} 
          onChangeText={text => setNewJobs({...newJobs,companyName:text})}
          />
        <TextInput
          label="Position"
          uppercase= "false"
          autoCapitalize='none'
          value={newJobs.jobName}
          onChangeText={text => setNewJobs({...newJobs, jobName:text})} />
        <TextInput
          label="Status"
          uppercase= "false"
          autoCapitalize='none'
          value={newJobs.status}
          onChangeText={text => setNewJobs({...newJobs, status:text})} />
        <TextInput
          label="Note"
          uppercase= "false"
          autoCapitalize='none'
          value={newJobs.note}
          onChangeText={text => setNewJobs({...newJobs, note:text})} />
      </View>
    <Button onPress={createNewjobs}> Create Status</Button>
    <Button onPress={() => deleteJobs(jobs[0].id)}>Delete Status</Button>

    </KeyboardAvoidingView>
    </>

  )
}

export default JobStatusScreen

const styles = StyleSheet.create({
  jobContainer: {
    fontSize: 18

  },
  container:{
    flex:1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal:25
}
})