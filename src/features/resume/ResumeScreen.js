
import { AppRegistry, Image, Animated, ScrollView, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, LogBox, FlatList, SafeAreaView } from 'react-native';
import { FAB} from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react'
import { deleteObject, listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../../contexts/AuthContext';
import { JobStatusContext } from '../../contexts/JobStatusContext';
import { AntDesign } from '@expo/vector-icons';
import { StorageUtility } from '../../Utils/storageUtility';

const ResumeScreen = () => {

  const {user} = useContext(AuthContext);
	const [filesinStorage, setFilesInStorage] = useState({})

	const directory = "Resumes/";
	const UUID = "UUID_NUMBER/"; //TODO maybe change to metadeta
	const filePath = directory + UUID;
	const {deleteJobStatus, jobDoc} = useContext(JobStatusContext );

	useEffect(()=>{
		getData();
	},[]);

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
					console.log('ResumeScreen.js - UploadFile - Uploaded a blob or file!');
					getData();
				});
			} else {
				alert("Selecting File for Upload - Cancelled or Failed");
			}
			
			console.log(result);
		}
	
		return (
			<FAB
				style={styles.fab}
				icon="plus"
				onPress={_pickDocument}
			/>
		);
	}
	
	const DeleteFile = (name) => {
		// Create a reference to the file to delete
		console.log("DELETING: " + name);
		const desertRef = ref(storage, filePath+name);
	
		// Delete the file
		deleteObject(desertRef).then(() => {
			// File deleted successfully
			getData();
			console.log("File " + name + " deleted successfully");
		}).catch((error) => {
			// Uh-oh, an error occurred!
			console.log("Uh oh! File " + name + " did NOT delete. Error: " + error);
		});
	
		return (
			<TextInput
				style={styles.textInput}
				placeholder="File name to delete"
				onBlur={Keyboard.dismiss}
			/>
		)
	}

	const DownloadFile = (name) => {
		// Create a reference to the file to delete
		console.log("DOWNLOADING: " + name);
		const downRef = ref(storage, filePath+name);
	
		// Download the file
		getDownloadURL(downRef)
			.then((url) => {
				// `url` is the download URL for 'images/stars.jpg'

				// This can be downloaded directly:
				const xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = (event) => {
					const blob = xhr.response;
				};
				xhr.open('GET', url);
				xhr.send();

				// Or inserted into an <img> element
				const img = document.getElementById('myimg');
				img.setAttribute('src', url);
				console.log("ResumeScreen.js - DownloadFile - Done");
			})
			.catch((error) => {
				// Handle any errors
				console.log("ResumeScreen.js - DownloadFile - Error: " + error);
			});
	
		return (
			<TextInput
				style={styles.textInput}
				placeholder="File name to download"
				onBlur={Keyboard.dismiss}
			/>
		)
	}

	const getData = () => {
		try {
			StorageUtility()
			.then((resumeArray) => {
				setFilesInStorage(resumeArray)
					console.log("ResumeScreen.js - getData - Returning: " + JSON.stringify(filesinStorage));
			});
		} catch (err) {
			console.log("ResumeScreen.js - getData - Error: " + err);
		}
	};

	const Item = ({ rName }) => (
		<View style={styles.item}>
			<View>
				<Text style={styles.title}>Resume: </Text>
				<Text>{rName}</Text>
			</View>
			<View>
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={()=> DeleteFile(rName)}
				>
				<AntDesign name="delete" size={48} color='red'/>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={()=> DownloadFile(rName)}
				>
				<AntDesign name="download" size={48} color='blue'/>
				</TouchableOpacity>
			</View>
		</View>
	);

	const renderItem = ({ item }) => {
		console.log("ResumeScreen.js - renderItem: " + item.name);
		return <Item rName={item.name}/>;
	}

  return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Resumes</Text>
				<FlatList 
					data={filesinStorage} 
					renderItem={renderItem} 
					keyExtractor={ item => item.name} />
				<UploadFile/>
			</View>
		</SafeAreaView>
  );
}

export default ResumeScreen;

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignContent: "center",
		justifyContent: "center",
		paddingHorizontal:20
	},
	title:{
    fontSize: 24,
    fontWeight:'700',
    // backgroundColor:'#'
  },
	item:{
    backgroundColor:'#81f0c7',
    marginBottom:3,
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius:10, 
    padding:10
  },
	button:{
    alignItems:'flex-end',
    marginTop:10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
