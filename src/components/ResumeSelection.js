import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable } from 'react-native';
import React, {useContext, useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ResumeContext } from '../contexts/ResumeContext';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from 'react-native-paper';

const ResumeSelection = ({navigation, route}) => {

  const {user} = useContext(AuthContext)
  const {UploadFile, DeleteFile, filesinStorage} = useContext(ResumeContext)
  // const [selectedResume, setSelectedResume] = useState('')
  const {resumeExist} = route?.params || {}

  console.log("Existing resume: " + resumeExist) 

  console.log(filesinStorage.name)
  const Item = ({ rName }) => (
    <View style={styles.item}>

      <Pressable onPress={()=>{
        // setSelectedResume(rName)
        if (resumeExist === undefined) {
          navigation.navigate('JobForm', {rName} )
          console.log("selected resume to add status: "+ rName)
        }
        else{
          
          // navigation.goBack( {rName} )JobStatusEdit
          navigation.navigate({
            name: 'JobStatusEdit',
            params: { selectedRes: rName },
            merge: true, })  
          console.log("selected resume to edit: "+ rName)
        }
        
        
      }} >
      <View>
        <Text style={styles.title}>{rName}</Text>
      </View>
      </Pressable>
      <View>
				<TouchableOpacity
					// style={styles.button}
					activeOpacity={0.7}
					onPress={()=> DeleteFile(rName)}
				>
				  <AntDesign name="delete" size={25} color='red'/>
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
  return (
    <View style={styles.container}>
      <Button onPress={UploadFile}>upload button</Button>
      <FlatList 
			data={filesinStorage} 
			renderItem={renderItem} 
			keyExtractor={ item => item.name} />
    </View>
  )
}

export default ResumeSelection

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal:25,
    paddingVertical:25
  },
  item:{
    backgroundColor:'#81f0c7',
    marginBottom:3,
    marginTop:5,
    justifyContent:'space-between',
    flexDirection:'row',
    borderRadius:10, 
    padding:10
  },
})