import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DateFilter = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [date, setDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const showDatePicker = () => {
        setDatePickerVisibility(true);
        
    };
    const showDatePicker2 = () => {
        setDatePickerVisibility2(true);
        
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideDatePicker2 = () => {
        setDatePickerVisibility2(false);
    };

    const handleConfirm = date => {
        // console.warn("A date has been picked: ", date);
        setDate(date)
        hideDatePicker();
    };

    const handleConfirm2 = date => {
        // console.warn("A date has been picked: ", date);
        setEndDate(date)
        hideDatePicker2();
    };

    return (
        <>
            <View>

            <Text>Start Date: {date.toLocaleDateString()}</Text>
            <Button title="Start Date" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={date}
            />
            </View>

            <View>

            <Text>End Date: {endDate.toLocaleDateString()}</Text>
            <Button title="End Date" onPress={showDatePicker2} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="date"
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
                date={endDate}
            />
            </View>
     </>
    )
}

export default DateFilter

const styles = StyleSheet.create({})