import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import {where, query, collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

const firebaseConfig = {
	apiKey: "AIzaSyDuCfCrzKwNr76dXBYy0A1ZQNigj-rz2aQ",
	authDomain: "barter-box-a2d9f.firebaseapp.com",
	projectId: "barter-box-a2d9f",
	storageBucket: "barter-box-a2d9f.appspot.com",
	messagingSenderId: "485483637136",
	appId: "1:485483637136:web:be1104ddc3cab4e4676b15",
	measurementId: "G-758NTMNZXJ",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = firebase.storage()
const db = getFirestore(app);

export {app, storage, db}

export async function getFirestoreDocumentData(path: string) {
	return await getDoc(doc(db, path)).then((doc) => {
		if (doc.exists()) {
			return doc.data()
		} else {
			return null
		}
	})
}

export async function getFirestoreCollectionDataWhere(path: string, field: string, operator: WhereFilterOp, value: string) {
	const querySnapshot = await getDocs(query(collection(db, path), where(field, operator, value)));
	return querySnapshot.docs.map(doc => doc.data())
}