import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React, {useState, useContext,} from 'react'
import { Button, FAB, Modal, Portal, Provider, TextInput } from 'react-native-paper'
import JobStatusForm from './JobStatusForm';

import filesinStorage from '../features/resume/ResumeScreen'
import { AuthContext } from '../contexts/AuthContext';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { ResumeContext } from '../contexts/ResumeContext';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

export default function JobStatusAdd({navigation}) {
  //modal if needed
  // const [visible, setVisible] = useState(false);

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white', padding: 20};
  
  const {user} = useContext(AuthContext)
  const {UploadFile, filesinStorage} = useContext(ResumeContext)
  
  // const [jobs, setJobs] = useState([]);
  const jobsCollectionRef = collection(db, "JobStatusCollection")

  const [appJobs, setAppJobs] = useState({ auth_ID:user.uid,
                                           companyName:'some', 
                                           jobName:'', 
                                           status:'',
                                           resume: {filesinStorage}, 
                                           note:'' })


    

    const [resume, setResume] = useState('')

    console.log("Resumes: "+ resume.name)

    const Item = ({ rName }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>test: {rName}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={()=> navigation.navigate('ResumeSelect')}
        >
        <AntDesign name="delete" size={48} color='red'/>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    
    // console.log("ITEM OBKECT2: " + item.name);
    return(
      
        <Item rName={item.name}/>
      
    )
  }      
  
  for (const [key, value] of Object.entries(...filesinStorage)) {
    console.log(`${key}: ${value}`);
  }

  return (
    <>
      <Text>tsting</Text>
      <Button onPress={UploadFile}>upload button</Button>

      <FlatList 
			data={filesinStorage} 
			renderItem={renderItem} 
			keyExtractor={ item => item.name} />
      <View>
      <TextInput
          label="Resume"
          mode="outlined"
          uppercase= "false"
          autoCapitalize='none'
          editable={false}
          value={filesinStorage.name}
          // onChangeText={text => setResume({...filesinStorage, name:text})} 
          // onPressIn={()=>{navigation.navigate('ResumeSelect')}}
          />
      </View>

    
    </>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  // containerStyle:{
  //   backgroundColor:'white',
  //   padding: 20
  // } 
})