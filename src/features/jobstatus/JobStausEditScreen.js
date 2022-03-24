import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, {useContext} from 'react'
import { useForm } from 'react-hook-form';
import { JobStatusContext } from '../../contexts/JobStatusContext';
import { FormBuilder } from 'react-native-paper-form-builder';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';

const JobStausEditScreen = ({navigation, route}) => {

    const {jobDoc, updateJobStatus} = useContext(JobStatusContext)
    const {user} = useContext(AuthContext)

    // recieve original data from the form 
    const { job_ID_Route, titleRoute, statusRoute, jobnameRoute, noteRoute} = route.params

    // console.log("testing user:" + user.uid)
    console.log("testing job:" + titleRoute)
    // const somefunc = {
    //     id: job_ID_Route ,
    //     auth_ID: user.uid,
    //     companyName: titleRoute,
    //     position: jobnameRoute,
    //     status: statusRoute,
    //     note: noteRoute,
    // }

    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            id: job_ID_Route ,
            auth_ID: user.uid,
            companyName: titleRoute,
            position: jobnameRoute,
            status: statusRoute,
            note: noteRoute,
        },
        mode: 'onChange',
        });
  return (
    <KeyboardAvoidingView
            behavior='padding'
            style = {styles.container}>
            <View style={styles.containerStyle}>
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
            </View>
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