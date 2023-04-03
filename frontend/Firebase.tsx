import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { where, query, collection, doc, getDoc, getDocs, getFirestore, orderBy, limit } from "firebase/firestore";
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
  const items = itemsSnapshot.docs.map(doc => {
	let item = doc.data()
	// Add the id to the item.
	item.id = doc.id
	return item
	});
//   console.log("Items:", items); // Add this line
  return items;
};

export async function getMostRecentItemRequest(itemId: string) {
	const requestsRef = collection(db, 'items', itemId, 'requests');
	const q = query(requestsRef, where('status', '==', 'open'), orderBy('date', 'desc'), limit(1));

	try {
		const snapshot = await getDocs(q);
		if (snapshot.size > 0) {
			const doc = snapshot.docs[0];
			let request = doc.data()
			request.id = doc.id
			console.log(doc.id, ' => ', request);
			let userData = await getUserById(request.requestedBy);
			userData.id = request.requestedBy
			request.requestedBy = userData
			return request
		} else {
			console.log('No requests found');
		}
	}
	catch (err) {
		console.log("There was an error accesing the requests", err)
	}
}