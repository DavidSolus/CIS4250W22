import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { deleteObject, listAll, ref, uploadBytes, list } from 'firebase/storage';
import { storage } from '../../../firebase';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../../contexts/AuthContext';

const ResumeScreen = () => {

    const {user} = useContext(AuthContext);
    const directory = "Resumes/";
    const UUID = "UUID_NUMBER/"; //TODO maybe change to metadeta
    const filePath = directory + UUID;
    const [resumeArray, setResumeArray] = useState({});
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
        console.log("listfiles somome ")
        console.log(filesInStorageList)
	}
	
	// const DeleteFile = (name) => {
	// 	// Create a reference to the file to delete
	// 	const desertRef = ref(storage, filePath+name);
	
	// 	// Delete the file
	// 	deleteObject(desertRef).then(() => {
	// 		// File deleted successfully
	// 	}).catch((error) => {
	// 		// Uh-oh, an error occurred!
	// 	});
	
	// 	return (
	// 		<TextInput
	// 			style={styles.textInput}
	// 			placeholder="File name to delete"
	// 			onBlur={Keyboard.dismiss}
	// 		/>
	// 	)
	// }

	const getData = () => {
		try {
			ListFile()
			.then((resumeArray) => {
				// console.log("Showing Resumes");
				console.log(resumeArray);
				// setResumeArray({
					
				// 	resumeArray
				// });
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
    <View>
      <Text>ResumeScreen</Text>
    </View>
  )
}

export default ResumeScreen

const styles = StyleSheet.create({})