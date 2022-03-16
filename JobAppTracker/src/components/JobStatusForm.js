import { StyleSheet, Text, View, ScrollView,KeyboardAvoidingView } from 'react-native'
import React, { useContext} from 'react'
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { JobStatusContext } from '../contexts/JobStatusContext';



const JobStatusForm = () => {

    const {user} = useContext(AuthContext)
    const {createJobStatus} = useContext(JobStatusContext)

    // const navigation = useNavigation();

    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            auth_ID: user.uid,
            companyName: '',
            position: '',
            status: '',
            note: '',
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
                            
                        }}>
                        Cancel
                    </Button>
                    <Button
                        // mode={'contained'}
                        style={styles.btn}
                        onPress={handleSubmit((data) => {
                            createJobStatus(data)
                        //   console.log('form data', data);
                        })}>
                        Add
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

export default JobStatusForm

const styles = StyleSheet.create({
    btn:{
        flexDirection:'row-reverse',
        marginRight: 5,
        alignItems:'flex-end',

    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    }

    // containerStyle: {
    //     flex: 1,
    //   },
    //   scrollViewStyle: {
    //     flex: 1,
    //     padding: 15,
    //     justifyContent: 'center',
    //   },
    //   headingStyle: {
    //     fontSize: 30,
    //     textAlign: 'center',
    //     marginBottom: 40,
    //   },
})