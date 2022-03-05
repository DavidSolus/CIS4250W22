// Expo
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
// React
import { StyleSheet, Text, View, Button } from 'react-native';
// Project
import { ref, uploadBytes, uploadString } from "firebase/storage";
import { fbStorage } from '../db/server';

// TODO: Get some sort of ID from user that is logged in and append that to file name

const directory = "Resumes/";
const UUID = "UUID_NUMBER/"; //TODO maybe change to metadeta
const filePath = directory + UUID;

function UploadFile() {
	let _pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({});
		
		if (result.uri) {
			alert("File " + result.name + " selected"); 
			let fileName = filePath + result.name;

			// Convert File URI to Blob
			const response = await fetch(result.uri);
			const blob = await response.blob();

			// Create a storage reference from our storage service
			const resumeRef = ref(fbStorage, fileName);

			uploadBytes(resumeRef, blob, 'data_url').then((snapshot) => {
				console.log('Uploaded a blob or file!');
			});
		} else {
			alert("Selecting File for Upload - Cancelled or Failed");
		}
		
		console.log(result);
	}

	return (
		<Button
			title="Select Document"
			onPress={_pickDocument}
		/>
	);
}

function ResumeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Resume Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
	<UploadFile/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ResumeScreen }