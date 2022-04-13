import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { AntDesign } from '@expo/vector-icons';
// import { TextInput } from 'react-native-paper';

const DateFilter = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
    const [date, setDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [flag, setFlag] = useState(false)

    //start date picker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
        
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        // console.warn("A date has been picked: ", date);
        setDate(date)
        hideDatePicker();
        // setDatePickerVisibility(false)
    };

    //End Date Picker
    const showDatePickerEnd = () => {
        setDatePickerVisibilityEnd(true);
        
    };

    const hideDatePickerEnd = () => {
        setDatePickerVisibilityEnd(false);
    };

    const handleConfirmEnd = date => {
        setEndDate(date)
        hideDatePickerEnd();
    };

    const onPressImportant = ()=>{
        if(flag === true){
            setFlag(false)
        }else{
            setFlag(true)
        }
            
        
        console.log("from func :" +flag)
        
    }
    console.log("here is month :" + date.getMonth())
    console.log("here is date :" + date.getDate())
    console.log("here is Year :" + date.getUTCFullYear())

    return (
        <>
            <View>
                <View>
                <TouchableOpacity
                onPress={()=>onPressImportant()}>

                    {flag && console.log("after : " + flag)}
                    {flag ? <Text><AntDesign name="star" size={24} color="black" /></Text> : <Text><AntDesign name="staro" size={24} color="red" /></Text>}
                </TouchableOpacity>
                {/* <Button
                title='test'
                style={styles.button}
                onPress={()=>setFlag(true)}
            
                /> */}
                            
                </View>
            {/* <Text>Start Date: {date.toLocaleDateString()}</Text> */}
            {/* <Button title="Start Date" onPress={showDatePicker} /> */}

                <View style= {styles.dateFilterContainer}>

                    <View style={styles.textInput}>
                        <TouchableOpacity onPress={()=>{
                                showDatePicker()
                            }}>
                            <TextInput
                            
                            mode="outlined"
                            label="Resume"
                            uppercase= "false"
                            autoCapitalize='none'
                            value={date.toLocaleDateString()}
                            editable={false}
                            pointerEvents="none"
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            date={date}
                            display='default'
                        />
                    </View>

                    <View style={styles.textInput}>
                        <TouchableOpacity onPress={()=>{
                                showDatePickerEnd()
                            }}>
                            <TextInput
                            
                            mode="outlined"
                            label="Resume"
                            uppercase= "false"
                            autoCapitalize='none'
                            value={endDate.toLocaleDateString()}
                            editable={false}
                            pointerEvents="none"
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisibleEnd}
                            mode="date"
                            onConfirm={handleConfirmEnd}
                            onCancel={hideDatePickerEnd}
                            date={endDate}
                            display='default'
                        />
                    </View>  
                    
                </View>
            </View>
     </>
    )
}

export default DateFilter

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        // marginTop: 20,
        // marginBottom: 10,
        backgroundColor: '#e8e8e8',
        margin:10,
        width:150,
    },
    dateFilterContainer: {
        // justifyContent:'space-between',
        flexDirection:'row',
        alignContent:'space-between',
        
        
    }
    
    
})