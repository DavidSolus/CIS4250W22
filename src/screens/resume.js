// Expo
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
// React
import { StyleSheet, Text, View, Button } from 'react-native';
// Project
import { ref, uploadBytes, list, listAll } from "firebase/storage";
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
			title="Upload Document"
			onPress={_pickDocument}
		/>
	);
}

async function ListFile() {
	// Reference Firebase Container
	var filesInStorageList = [];
	const listRef = ref(fbStorage, filePath);
	console.log("Listing Files");


	// List all files in container
	listAll(listRef)
		.then((res) => {
			res.prefixes.forEach((folderRef) => {
				// All the prefixes under listRef.
				// You may call listAll() recursively on them.
				console.log(res);
			});
			res.items.forEach((itemRef) => {
				// All the items under listRef.
				let fileInStorage = itemRef["_location"]["path_"].slice(filePath.length);
				filesInStorageList.push(fileInStorage);
				console.log(fileInStorage);
			});
		}).catch((error) => {
			// Uh-oh, an error occurred!
			console.log("ListFile - ERROR");
		});
		
		//TODO: Render the files
		return (
			<View style={styles.MainContainer}>

					{ filesInStorageList.map((item, key)=>(
					<Text key={key} style={styles.TextStyle} onPress={ this.SampleFunction.bind(this, item) } > { item } </Text>)
					)}

			</View>
		)
}

function ResumeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Resume Screen</Text>
			<Button 
				title="View Resumes"
				onPress={() => ListFile()}
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
	MainContainer: {
		flex: 1,
		margin: 10
	},
	TextStyle:{
		fontSize : 25,
		 textAlign: 'center'
	}
});

export { ResumeScreen }