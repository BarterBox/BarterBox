import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { where, query, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
// import 'firebase/firestore';

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
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db }

export async function getFirestoreDocumentData(path: string) {
	return await getDoc(doc(db, path)).then((doc) => {
		if (doc.exists()) {
			return doc.data()
		} else {
			return null
		}
	})
}

export async function getFirestoreCollectionDataWhere(path: string, field: string, operator: firebase.firestore.WhereFilterOp, value: string) {
	const querySnapshot = await getDocs(query(collection(db, path), where(field, operator, value)));
	return querySnapshot.docs.map(doc => doc.data())
}

export async function getUserById(userid: string) {
  const user = await getDoc(doc(db, "Users", userid));
  return user.data();
}

export async function getUsersFromCity(city: string, excludeUserId: string) {
  const usersSnapshot = await getDocs(query(collection(db, 'Users'), where('city', '==', city)));
  const userIDs = usersSnapshot.docs
    .filter(doc => doc.id !== excludeUserId)
    .map(doc => doc.id);
  console.log("UserIds", userIDs);
  return userIDs;
};

export async function getItemsByCity(city: string, excludeUserId: string) {
  const userIDs = await getUsersFromCity(city, excludeUserId);
  const itemsSnapshot = await getDocs(query(collection(db, 'items'), where('owner', 'in', userIDs)));
  const items = itemsSnapshot.docs.map(doc => doc.data());
  console.log("Items:", items); // Add this line
  return items;
};