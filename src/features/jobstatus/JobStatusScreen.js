import React, { useContext, useRef, useState } from 'react'
import { Button, FAB} from 'react-native-paper';
import JobStatusAdd from '../../components/JobStatusAdd';
import { StyleSheet, Text, View, FlatList, Platform,Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Pressable,
  Easing,
  KeyboardAvoidingView } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { JobStatusContext } from '../../contexts/JobStatusContext';


const JobStatusScreen = ({navigation}) => {

  const {updateJobStatus,deleteJobStatus, jobDoc} = useContext(JobStatusContext)

  const pan = useRef(new Animated.ValueXY()).current;

  const [swipe, setSwipe] = useState()

  // const [myJobData, setMyJobData] = useState()
  const Item = ({ job_ID, title, status, jobname, note}) => (
    <View style={styles.item}>
      <Pressable onLongPress = {()=>{
                                      // updateJobStatus(job_ID, title, status, jobname, note)
                                      // console.log("tet item:" + status)
                                      navigation.navigate('JobStatusEdit', {
                                        job_ID_Route:job_ID , 
                                        titleRoute: title, 
                                        statusRoute: status, 
                                        jobnameRoute: jobname, 
                                        noteRoute: note
                                      })
                                          }}>
        <Text style={styles.title}>{title}</Text>
        <Text> Status: {status}</Text>
        <Text> Position: {jobname} </Text>
        <Text> Note: {note} </Text>
      </Pressable>
      <View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={()=> deleteJobStatus(job_ID)}
        >
          <AntDesign name="delete" size={48} color='red'/>
        </TouchableOpacity>
      {/* <Button onPress={()=> deleteJobStatus(job_ID)}>{job_ID} </Button> */}
      </View>
    </View>
  );

  const renderItem = ({ item }) => {

    return(
      <>
        <Item job_ID={item.id}
              title = {item.companyName} 
              status= {item.status}
              jobname ={item.position}
              note = {item.note} />
      </>
    )
    
  }

  return (
    <>
      <KeyboardAvoidingView
            behavior='padding'
            style = {styles.container}>
          <Animated.FlatList
      data={jobDoc}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={
        Platform.OS !== 'android' &&
        (({ highlighted }) => (
          <View
            style={[
              styles.separator,
              highlighted && { marginLeft: 0 }
            ]}
          />
        ))
      }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={()=>{navigation.replace('JobForm')}} />
    
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
    paddingHorizontal:20
  },
  title:{
    fontSize: 24,
    fontWeight:'700',
    // backgroundColor:'#'
  },
  item:{
    backgroundColor:'#81f0c7',
    marginBottom:3,
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius:10, 
    padding:10
  },
  button:{
    alignItems:'flex-end',
    marginTop:10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})