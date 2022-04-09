import { View, Text } from 'react-native'
import React, {createContext, useState, useEffect, useContext} from 'react'
import { db } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { AuthContext } from './AuthContext';
import { StorageUtility } from '../Utils/storageUtility';

export const JobStatusContext = createContext();

export const JobStatusContextProvider = ({children}) =>{

    const {user} = useContext(AuthContext)
    const jobsCollectionRef = collection(db, "JobStatusCollection")
    const [jobDoc, setJobDoc] = useState({}); // get data and store from database
    const [resumeList, setResumeList] = useState(); 
    // const [appJobs, setAppJobs] = useState({ "auth_ID":user.uid, "companyName":"", "jobName":"", "status":"", "note":"" })

    // create new jobs status
    const createJobStatus = async (appJobs)=> {
        // const jobDoc = doc(db, "JobStatusCollection", "JSDocument")

        try {
            const docRef = await addDoc(jobsCollectionRef , appJobs);
            // console.log(appJobs);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // read data from the collection: only once
    const getJobStatus = ( async ()=>{

        try{
        const q = query(jobsCollectionRef, where("auth_ID", "==", user.uid))
        const jobData = await getDocs(q)

        // console.log(jobData.docs)    
        setJobDoc(jobData.docs.map((doc)=>({ ...doc.data(), id: doc.id})))   

        } catch(e){
        alert("Error: {e.message}", e.message)
        console.error("Error reading document: ", e.message);
        }
    })

    useEffect(()=>{
        // getJobStatusSnapshot()
        getJobStatus()
    },[])

    //real time database listner :
    const getJobStatusSnapshot = ()=> {

        const que = query(jobsCollectionRef, where("auth_ID", "==", user.uid))
        const unsubscribe = onSnapshot(que, (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
            // cities.push(doc.data());
            temp.push({...doc.data(), id:doc.id})
            // console.log({...doc.data(), id:doc.id})
            // console.log(doc.id)
            setJobDoc(temp)
        });
        
        })
        // return unsubscribe();
    
    }

    useEffect(()=>{
        getJobStatusSnapshot()
    },[user, user.uid])

    console.log(jobDoc)
    // Delelete Job status
    const deleteJobStatus = async (id)=>{
        try{
        const delDoc = await deleteDoc(doc(db,"JobStatusCollection", id))
        console.log(id)
        }catch(err){
        console.log(err.message)
        }
        
    }

    // useEffect(()=>{
    //     deleteJobStatus()
    // },[id])

    useEffect(()=>{
        getResume();
    }, []);

    // Gets the list of resumes that exist in the database
    const getResume = () => {
		try {
			StorageUtility()
			.then((resumeArray) => {
				setResumeList(resumeArray)
					console.log("JobStatusContext: item name access:" + JSON.stringify(resumeList));
			});
		} catch (err) {
			console.log("getData error: " + err);
		}
	};


    return(
        <JobStatusContext.Provider 
            value={{ jobDoc ,createJobStatus, deleteJobStatus, resumeList }} >
            {children}
        </JobStatusContext.Provider>

    )
}