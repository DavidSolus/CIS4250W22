import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { FAB, Modal, Portal, Provider, TextInput } from 'react-native-paper'
import JobStatusForm from './JobStatusForm';

export default function JobStatusAdd() {

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  

  return (
    <>
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          
          {/* <TextInput
          label="Company Name"
          uppercase= "false"
          autoCapitalize='none'
          
          /> */}
          {/* <Text>just text</Text> */}
          {/* <JobStatusForm/> */}
          </Modal>
        </Portal>
      </Provider>
      
      <FAB
          style={styles.fab}
          icon="plus"
          onPress={showModal} />
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