import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { JobStatusContext } from '../../contexts/JobStatusContext';
import { FormBuilder } from 'react-native-paper-form-builder';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';

const JobStausEditScreen = ({navigation, route}) => {

    const {jobDoc, updateJobStatus} = useContext(JobStatusContext)
    const {user} = useContext(AuthContext)

    // recieve original data from the form 
    const { job_ID_Route, titleRoute, statusRoute, jobnameRoute, resumeRoute, noteRoute} = route.params

    const {selectedRes} = route?.params
    console.log("rec: " + selectedRes)
    const [companyName, setCompanyName] = useState(titleRoute)
    const [status, setStatus] = useState(statusRoute)
    const [position, setPosition] = useState(jobnameRoute)
    const [resume, setResume] = useState(resumeRoute)
    const [note, setNote] = useState(noteRoute)

    // console.log("testing user:" + user.uid)
    console.log("testing resume:" + resumeRoute)
    const dataUpdate = {
        id: job_ID_Route ,
        auth_ID: user.uid,
        companyName,
        position,
        status,
        resume,
        note,
    }

    useEffect(()=>{
        if(selectedRes){
            setResume(selectedRes)
        }
    },[selectedRes])

    // const {control, setFocus, handleSubmit} = useForm({
    //     defaultValues: {
    //         id: job_ID_Route ,
    //         auth_ID: user.uid,
    //         companyName: titleRoute,
    //         position: jobnameRoute,
    //         status: statusRoute,
    //         note: noteRoute,
    //     },
    //     mode: 'onChange',
    //     });
  return (
    <KeyboardAvoidingView
            behavior='padding'
            style = {styles.container}>

            <View style={styles.btnContainer}>
                    <Button
                        // mode={'contained'}
                        style={styles.btn}
                        onPress={()=>{
                            navigation.replace('JobStatus')
                        }}>
                        Cancel
                    </Button>
                    <Button
                        // mode={'contained'}
                        style={styles.btn}
                        onPress = {()=>{
                            updateJobStatus(dataUpdate)
                            navigation.replace('JobStatus')
                            console.log('form data', dataUpdate);
                        }}
                        >
                        Update
                    </Button>
            </View> 
            
            <View>
                <TextInput
                mode="outlined"
                label="Company Name"
                uppercase= "false"
                autoCapitalize='none'
                value={companyName}
                // onChangeText={(cName)=>setNewJobs({companyName:cName.value})} 
                onChangeText={text => setCompanyName(text)}
                />

                <TextInput
                mode="outlined"
                label="Postion"
                uppercase= "false"
                autoCapitalize='none'
                value={position}
                // onChangeText={(cName)=>setNewJobs({companyName:cName.value})} 
                onChangeText={text => setPosition(text)}
                />

                <TextInput
                mode="outlined"
                label="Status"
                uppercase= "false"
                autoCapitalize='none'
                value={status}
                // onChangeText={(cName)=>setNewJobs({companyName:cName.value})} 
                onChangeText={text => setStatus(text)}
                />

                <TouchableOpacity onPress={()=>{
                    navigation.navigate('ResumeSelect', {resumeExist:resume})
                    console.log("pressed")
                }}>
                <TextInput
                mode="outlined"
                label="Resume"
                uppercase= "false"
                autoCapitalize='none'
                value={resume}
                editable={false}
                pointerEvents="none"
                // onPressIn={()=>{
                //     navigation.navigate('ResumeSelect')  
                // }}
            
                />
                </TouchableOpacity>

                <TextInput
                mode="outlined"
                label="Note"
                uppercase= "false"
                autoCapitalize='none'
                value={note}
                multiline
                onChangeText={text => setNote(text)}
                />

            
            </View>

            {/* <View style={styles.containerStyle}>
                <View style={styles.btnContainer}>
                    <Button
                        // mode={'contained'}
                        style={styles.btn}
                        onPress={()=>{
                            navigation.replace('JobStatus')
                        }}>
                        Cancel
                    </Button>
                    <Button
                        // mode={'contained'}
                        style={styles.btn}
                        onPress={handleSubmit((data) => {
                            updateJobStatus(data)
                            navigation.replace('JobStatus')
                        //   console.log('form data: ',data.companyName);
                        })}>
                        Update
                    </Button>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                    
                    <FormBuilder 
                        control={control}
                        setFocus={setFocus}
                        formConfigArray={[
                            
                            {
                                type: 'text',
                                name: 'companyName',
                                rules: {
                                required: {
                                    value: true,
                                    message: 'Company name is required',
                                },
                                },
                                textInputProps: {
                                label: 'Company Name',
                                },
                            },
                            {
                                type: 'text',
                                name: 'position',
                                rules: {
                                required: {
                                    value: true,
                                    message: 'Position is required',
                                },
                                },
                                textInputProps: {
                                label: 'Position',
                                
                                },
                            },
                            {
                                type: 'text',
                                name: 'status',
                                rules: {
                                required: {
                                    value: true,
                                    message: 'Status is required',
                                },
                                },
                                textInputProps: {
                                label: 'Status',
                                
                                },
                                
                            },
                        //   {
                        //     type: 'select',
                        //     name: 'resume',
                        //     rules: {
                        //       required: {
                        //         value: true,
                        //       },
                        //     },
                        //     textInputProps: {
                        //       label: 'Resume',
                            
                        //     },
                        //     options: [
                        //         {
                        //           value:0,
                        //           lable:'test1.pdf'
                        //         },
                        //         {
                        //           value:1,
                        //           lable:'test2.pdf'
                        //         },
                        //         {
                        //           value:2,
                        //           lable:'test3.pdf'
                        //         }
                        //       ]
                        //   },
                        {
                            type: 'text',
                            name: 'note',
                            textInputProps: {
                                label: 'Note',
                            
                            },
                        },
                        ]}
                    />
                
                </ScrollView>
            </View> */}
        </KeyboardAvoidingView>
  )
}

export default JobStausEditScreen

const styles = StyleSheet.create({
    container: {
        flex:0.60,
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal:25
      },
    btn:{
        flexDirection:'row-reverse',
        marginRight: 5,
        alignItems:'flex-end',

    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})