import { StyleSheet, Text, View, ScrollView,KeyboardAvoidingView } from 'react-native';
import React, { useContext, useState, useEffect} from 'react';
import { FormBuilder } from 'react-native-paper-form-builder';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { JobStatusContext } from '../contexts/JobStatusContext';
import { StorageUtility } from '../Utils/storageUtility';



const JobStatusForm = ({navigation}) => {

    const {user} = useContext(AuthContext)
    const {createJobStatus, resumeList} = useContext(JobStatusContext)

    // const navigation = useNavigation();

    const [listOpen, setListOpen] = useState(false);
    const [resumes, setResumes] = useState();
    const {control, setFocus, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            auth_ID: user.uid,
            companyName: '',
            position: '',
            status: '',
            note: '',
            resume: '',
        },
        mode: 'onChange',
    });

    const listData = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Test', value: 'test' },
        { label: 'xx', value: 'xx' },
    ];

    // Gets the list of resumes that exist in the database
    const getResume = () => {
		try {
			StorageUtility()
			.then((resumeArray) => {
				setResumes(resumeArray)
					console.log("JobStatusForm: item name access:" + resumes);
			});
		} catch (err) {
			console.log("getData error: " + err);
		}
	};

    useEffect(()=>{
        getResume();
    }, []);

    const renderDropDown = ({ field: {onChange, value }, item }) => {
        console.log("JobStatusForm.js - renderDropDown: " + item);

        return (
            <DropDownPicker
                style={styles.dropdown}
                placeholder="Resume"
                placeholderStyle={styles.dropdownPlaceholder}
                open={listOpen}
                setOpen={() => setListOpen(!listOpen)}
                items={listData}
                value={value}
                setValue={(item) => onChange(item())}
            />
        );
    }

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
                            createJobStatus(data)
                            navigation.replace('JobStatus')
                        //   console.log('form data', data);
                        })}>
                        Add
                    </Button>
                </View>
                <View>
                    <Controller
                        control={control}
                        name='companyName'
                        render={({ field: {onChange, value } }) => (
                            <View style={styles.textBox}>
                                <TextInput 
                                    style={styles.text}
                                    placeholder="Company Name"
                                    defaultValue={value}
                                    onChangeText={(v) => onChange(v)}
                                />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name='position'
                        render={({ field: {onChange, value } }) => (
                            <View style={styles.textBox}>
                                <TextInput 
                                    style={styles.text}
                                    placeholder="Position"
                                    defaultValue={value}
                                    onChangeText={(v) => onChange(v)}
                                />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name='status'
                        render={({ field: {onChange, value } }) => (
                            <View style={styles.textBox}>
                                <TextInput 
                                    style={styles.text}
                                    placeholder="Status"
                                    defaultValue={value}
                                    onChangeText={(v) => onChange(v)}
                                />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name='note'
                        render={({ field: {onChange, value } }) => (
                            <View style={styles.textBox}>
                                <TextInput 
                                    style={styles.text}
                                    placeholder="Note"
                                    defaultValue={value}
                                    onChangeText={(v) => onChange(v)}
                                />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name='resume'
                        data={resumes}
                        render={({ field: {onChange, value }, item }) => (
                            <DropDownPicker
                                style={styles.dropdown}
                                placeholder="Resume"
                                placeholderStyle={styles.dropdownPlaceholder}
                                open={listOpen}
                                setOpen={() => setListOpen(!listOpen)}
                                items={resumes}
                                value={value}
                                setValue={(item) => onChange(item())}
                            />
                        )}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default JobStatusForm

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
    },

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
});
