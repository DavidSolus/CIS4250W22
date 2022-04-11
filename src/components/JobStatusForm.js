import { StyleSheet, Text, View, TouchableOpacity,KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState, useRef, useEffect} from 'react'
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button , Provider, TextInput} from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { JobStatusContext } from '../contexts/JobStatusContext';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const JobStatusForm = ({navigation, route}) => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const pushNotification = async () => {
        try {
            await schedulePushNotification()
        }catch(e){
            console.log("Error: " + e)
        }

    }

    const schedulePushNotification = async ()=> {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "New job application status created! 📬",
            body: 'Company Name: {companyName}',
            data: { data: companyName },
          },
          trigger: { seconds: 2 },
        });
    }

    const {user} = useContext(AuthContext)
    const {createJobStatus} = useContext(JobStatusContext)
    //recieve selected resume

    const {rName} = route?.params || {};

    const auth_ID = user.uid
    const resume = rName
    const [companyName, setCompanyName] = useState('')
    const [status, setStatus] = useState('')
    const [position, setPosition] = useState('')
    const [note, setNote] = useState('')
    // const [resume, setResume] = useState('')

    const data = {
        auth_ID,
        companyName,
        status,
        position,
        note,
        resume
    }
       
    console.log("recieving resumes: "+ resume)

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
                            createJobStatus(data)
                            pushNotification()
                            navigation.replace('JobStatus')
                            console.log('form data', data);
                        }}
                        >
                        Add
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
                    navigation.navigate('ResumeSelect')
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
            

            {/* <Provider>
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
                            createJobStatus(data)
                            navigation.replace('JobStatus')
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
                          {
                            type: 'select',
                            name: 'resume',
                            rules: {
                              required: {
                                value: true,
                              },
                            },
                            textInputProps: {
                              label: 'Resume',
                            
                            },
                            options: [
                                {
                                  value:0,
                                  lable:'test1.pdf'
                                },
                                {
                                  value:1,
                                  lable:'test2.pdf'
                                },
                                {
                                  value:2,
                                  lable:'test3.pdf'
                                }
                              ]
                          },
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
            </Provider> */}
        </KeyboardAvoidingView>
    )
}

export default JobStatusForm



const registerForPushNotificationsAsync = async ()=> {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

const styles = StyleSheet.create({
    container: {
        flex:1,
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
    },
    // scrollViewStyle: {
    //     flex: 0.5,
    //     padding: 15,
    //     justifyContent: 'center',
    // },

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