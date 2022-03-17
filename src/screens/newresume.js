// Expo
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
// React
import React, { Component, useState, useEffect} from 'react';
import { AppRegistry, Image, Animated, ScrollView, StyleSheet, Text, View, Button, TextInput, Keyboard, TouchableOpacity, LogBox, FlatList, AntDesign, SafeAreaView } from 'react-native';
// Project
import { ref, uploadBytes, list, listAll, deleteObject } from "firebase/storage";
import { fbStorage } from '../db/server';

// TODO: Get some sort of ID from user that is logged in and append that to file name

const directory = "Resumes/";
const UUID = "UUID_NUMBER/"; //TODO maybe change to metadeta
const filePath = directory + UUID;

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const ResumeScreenNew = () => {

	const [resumeArray, setResumeArray] = useState();
	useEffect(()=>{
		getData();
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

	const ListFile = async () => {
		console.log("Running ListFile()");
	
		// Reference Firebase Container
		let filesInStorageList = [];
		let content = [];
		const listRef = ref(fbStorage, filePath);
	
		// Get the files from the storage account
		try {
			const res = await listAll(listRef);
			res.items.forEach((itemRef) => {
				let filesObject = {};
				let fileInStorage = itemRef["_location"]["path_"].slice(filePath.length);
				filesObject["name"] = fileInStorage;
				filesInStorageList.push(filesObject);
			});
		
			console.log("..returning Listing Files");
			return filesInStorageList;
		} catch (err) {
			console.log("ListFile() error: " + err);
		}
	}
	
	const DeleteFile = (name) => {
		// Create a reference to the file to delete
		const desertRef = ref(fbStorage, filePath+name);
	
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
				console.log("Showing Resumes");
				console.log(resumeArray);
				setResumeArray({
					
					resumeArray
				});
			});
		} catch (err) {
			console.log("getData error: " + err);
		}
	};

	const Item = ({ name }) => (
		<View style={styles.item}>
			<View>
				<Text style={styles.title}>{name}</Text>
			</View>
			<View>
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={()=> DeleteFile(name)}
				>
				<AntDesign name="delete" size={48} color='red'/>
				</TouchableOpacity>
			</View>
		</View>
	);

	const renderItem = ({ item }) => {
		console.log("ITEM OBJECT1: " + item);
		console.log("ITEM OBKECT2: " + item.name);
		return(
			<>
				<Item name={item.name}/>
			</>
		)
	}

  return (
		<View style={styles.container} >
			<Text>TEST.......</Text>
			<FlatList
				data={resumeArray}
				renderItem={renderItem}
				keyExtractor={item => item.name}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		margin: 10
	},
	TextStyle:{
		fontSize : 25,
		 textAlign: 'center'
	},
	inputContainer: {
		paddingTop: 15
	},
	textInput: {
		borderColor: '#CCCCCC',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		height: 50,
		fontSize: 25,
		paddingLeft: 20,
		paddingRight: 20
	},
	viewHolder: {
		height: 55,
		backgroundColor: '#ff4081',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 4
	},
	headerText: {
		color: 'white',
		fontSize: 25
	},
	buttonDesign: {
		position: 'absolute',
		right: 25,
		bottom: 25,
		borderRadius: 30,
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonImage: {
		resizeMode: 'contain',
		width: '100%',
	},
	jobContainer: {
    fontSize: 18

  },
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

export { ResumeScreenNew }