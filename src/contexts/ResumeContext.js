import { View, Text, FlatList } from 'react-native'
import React, { createContext, useEffect, useState, useContext } from 'react'
import { deleteObject, listAll, ref, uploadBytes, list } from 'firebase/storage';
import { storage } from '../../firebase';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from './AuthContext';
import { JobStatusContext } from './JobStatusContext';
import { AntDesign } from '@expo/vector-icons';


export const ResumeContext = createContext();

export default function ResumeContextProvider({children}) {

    const {user} = useContext(AuthContext);
	const [filesinStorage, setFilesInStorage] = useState({})

    const directory = "Resumes/";
    const UUID = "UUID_NUMBER/"; //TODO maybe change to metadeta
    const filePath = directory + UUID;

    //upload a file
    const UploadFile = async () => {
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

    //list all files 
    const ListFile = async () => {
		console.log("Running ListFile()");
	
		// Reference Firebase Container
		let filesInStorageList = [];
		// let content = [];
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
			
		} catch (err) {
			console.log("ListFile() error: " + err);
		}
        // console.log("listfiles somome ")
        // console.log(filesInStorageList)
	}
    
    const getData = () => {
		try {
			ListFile()
			.then((resumeArray) => {
				// console.log("Showing Resumes");
				setFilesInStorage(resumeArray)
				// setResumeArray({

				// 	resumeArray
				// });
			});
		} catch (err) {
			console.log("getData error: " + err);
		}
	};

    useEffect(()=>{
		getData();
        // ListFile();
	},[])


  return (
    <ResumeContext.Provider 
    value={{ UploadFile, filesinStorage }}>
        {children}
    </ResumeContext.Provider>
  )
}

