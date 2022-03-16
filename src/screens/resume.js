// Expo
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
// React
import React, { Component } from 'react';
import { AppRegistry, Image, Animated, ScrollView, StyleSheet, Text, View, Button, TextInput, Keyboard, TouchableOpacity, LogBox, FlatList } from 'react-native';
// Project
import { ref, uploadBytes, list, listAll, deleteObject } from "firebase/storage";
import { fbStorage } from '../db/server';

// TODO: Get some sort of ID from user that is logged in and append that to file name

const directory = "Resumes/";
const UUID = "UUID_NUMBER/"; //TODO maybe change to metadeta
const filePath = directory + UUID;

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

class ResumeScreen extends Component {

  constructor() {
    super();

    this.state = { valueArray: [], resumeArray: [], disabled: false }
    this.index = 0;
    this.animatedValue = new Animated.Value(0);
  }

  addMore = () => {
    this.animatedValue.setValue(0);
    let newlyAddedValue = { index: this.index }
    this.setState({ disabled: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        this.index = this.index + 1;
        this.setState({ disabled: false });
      });
    });
  }

  render() {
    const animationValue = this.animatedValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [-59, 0]
      });

    let newArray = this.state.valueArray.map((item, key) => {
      if ((key) == this.index) {
        return (
          <Animated.View key={key} style={[styles.viewHolder, { opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
            <Text style={styles.headerText}>Row {item.index}</Text>
          </Animated.View>
        );
      }
      else {
        return (
          <View key={key} style={styles.viewHolder}>
            <Text style={styles.headerText}>Row No :- {item.index}</Text>
						<TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} disabled={this.state.disabled} onPress={this.addMore}>
							<Image source={require('../../assets/deleteButton.png')} style={styles.buttonImage} />
						</TouchableOpacity>
          </View>
        );
      }
    });

    return (
      <View style={styles.container} >
        <ScrollView>
          <View style={{ flex: 1, padding: 4 }}>
            {
              newArray
            }
          </View>
        </ScrollView>

				<ResumeScreenOld/>
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} disabled={this.state.disabled} onPress={this.addMore}>
          <Image source={require('../../assets/deleteButton.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

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

function DeleteFile() {
	// Create a reference to the file to delete
	const desertRef = ref(fbStorage, filePath+"colours.pdf");

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

function getData() {
	try {
		ListFile()
		.then((res) => {
			console.log("Showing Resumes");
			return <UploadFile/>;
		});
	} catch (err) {
		console.log("getData error: " + err);
	}

	return <UploadFile/>;
}

function ResumeScreenOld({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Resume Screen</Text>
			<Button 
				title="View Resumes"
				onPress={() => ListFile()}
			/>
			{/* <UploadFile/> */}
			{/* <DeleteFile/> */}
			{getData()}
		</View>
	);
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
	container: {
		flex: 1,
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
	}
});

export { ResumeScreen }