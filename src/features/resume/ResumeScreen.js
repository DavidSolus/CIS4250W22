
import { AppRegistry, Image, Animated, ScrollView, StyleSheet, Text, View, Button, TextInput, Keyboard, TouchableOpacity, LogBox, FlatList, SafeAreaView } from 'react-native';

import React, { useContext, useEffect, useState } from 'react'
import { deleteObject, listAll, ref, uploadBytes, list } from 'firebase/storage';
import { storage } from '../../../firebase';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../../contexts/AuthContext';
import { JobStatusContext } from '../../contexts/JobStatusContext';
import { AntDesign } from '@expo/vector-icons';

const ResumeScreen = () => {

    const {user} = useContext(AuthContext);
	const [filesinStorage, setFilesInStorage] = useState({})

    const directory = "Resumes/";
    const UUID = "UUID_NUMBER/"; //TODO maybe change to metadeta
    const filePath = directory + UUID;
		const {deleteJobStatus, jobDoc} = useContext(JobStatusContext )
    // const [resumeArray, setResumeArray] = useState([
	// 		{
	// 			"name": "colours.pdf",
	// 		},
	// 		{
	// 			"name": "test.txt",
	// 		},
	// 	]);
	useEffect(()=>{
		getData();
        // ListFile();
	},[])

	const UploadFile = () => {
		let _pickDocument = async () => {
			let result = await DocumentPicker.getDocumentAsync({});
			
			if (result.uri) {
				alert("File " + result.name + " selected"); 
				let fileName = filePath + result.name;
	
				// Convert File URI to Blob
				const response = await fetch(result.uri);
				const blob = await response.blob();
	
				// Create a storage reference from our storage service
				const resumeRef = ref(storage, fileName);
                
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

	const ListFile = async () => {
		console.log("Running ListFile()");
	
		// Reference Firebase Container
		let filesInStorageList = [];
		let content = [];
		const listRef = ref(storage, filePath);
	
		// Get the files from the storage account
		try {
			const res = await listAll(listRef);
			res.items.forEach((itemRef) => {
				// let filesObject = {};
				let filesObject = []
				let fileInStorage = itemRef["_location"]["path_"].slice(filePath.length);
				filesObject["name"] = fileInStorage;
				filesInStorageList.push(filesObject);
				
			});
		
			console.log("..returning Listing Files");
			return filesInStorageList;
			console.log(filesinStorage)
		} catch (err) {
			console.log("ListFile() error: " + err);
		}
        // console.log("listfiles somome ")
        // console.log(filesInStorageList)
	}
	
	const DeleteFile = (name) => {
		// Create a reference to the file to delete
		const desertRef = ref(storage, filePath+name);
	
		// Delete the file
		deleteObject(desertRef).then(() => {
			// File deleted successfully
		}).catch((error) => {
			// Uh-oh, an error occurred!
		});
	
		return (
			<TextInput
				style={styles.textInput}
				placeholder="File name to delete"
				onBlur={Keyboard.dismiss}
			/>
		)
	}

	const getData = () => {
		try {
			ListFile()
			.then((resumeArray) => {
				// console.log("Showing Resumes");
				// console.log(resumeArray);
				setFilesInStorage(resumeArray)
				// setResumeArray({
					console.log("item name access:"+ filesinStorage);
				// 	resumeArray
				// });
			});
		} catch (err) {
			console.log("getData error: " + err);
		}
	};

	const Item = ({ rName }) => (
		<View style={styles.item}>
			<View>
				<Text style={styles.title}>test: {rName}</Text>
			</View>
			<View>
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={()=> deleteJobStatus(rName)}
				>
				<AntDesign name="delete" size={48} color='red'/>
				</TouchableOpacity>
			</View>
		</View>
	);

	const renderItem = ({ item }) => {
		
		console.log("ITEM OBKECT2: " + item.name);
		return(
			
				<Item rName={item.name}/>
			
		)
	}
  return (
	<SafeAreaView style={styles.container}>
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<UploadFile/>
			<Text>Testing</Text>
				
			<FlatList 
			data={filesinStorage} 
			renderItem={renderItem} 
			keyExtractor={ item => item.name} />
				
				{/* <Button 
					title="View Resumes"
					onPress={() => ListFile()}
				/> */}
		</View>
	</SafeAreaView>
  )
}

export default ResumeScreen

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignContent: "center",
		justifyContent: "center",
		paddingHorizontal:20
	  },
})