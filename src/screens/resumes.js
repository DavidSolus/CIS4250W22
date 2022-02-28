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
const UUID = "UUID_NUMBER_"; //TODO maybe change to metadeta

function DownloadFile() {
	let _pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({});
		
		if (result.uri) {
			alert("File " + result.name + " selected"); 
			let fileName = directory + UUID + result.name;
			const response = await fetch(result.uri);
			const blob = await response.blob();

			// Create a storage reference from our storage service
			const resumeRef = ref(fbStorage, fileName);
			const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })
			const bytes = new Uint8Array(base64);
			// file = new File(result.uri);

			// const blob = new Blob([JSON.stringify(result, null, 2)], {type : result.mimeType});
			uploadBytes(resumeRef, blob, 'data_url').then((snapshot) => {
				console.log('Uploaded a blob or file!');
			});
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
	<DownloadFile/>
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