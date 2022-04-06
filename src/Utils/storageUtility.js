import { listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase';

const filePath = "Resumes/UUID_NUMBER/";

export const StorageUtility = async () => {
  console.log("storageUtility.js - StorageUtility - Starting");
	
		// Reference Firebase Container
		let filesInStorageList = [];
		let content = [];
		const listRef = ref(storage, filePath);
	
		// Get the files from the storage account
		try {
			const res = await listAll(listRef);
			res.items.forEach((itemRef) => {
				let filesObject = []
				let fileInStorage = itemRef["_location"]["path_"].slice(filePath.length);
				filesObject["name"] = fileInStorage;
				filesInStorageList.push(filesObject);
			});
		
			console.log("storageUtility.js - StorageUtility - Returning: " + filesInStorageList);
			return filesInStorageList;
		} catch (err) {
			console.log("storageUtility.js - StorageUtility - Error: " + err);
		}
}
