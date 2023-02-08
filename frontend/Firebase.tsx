import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyDuCfCrzKwNr76dXBYy0A1ZQNigj-rz2aQ",
	authDomain: "barter-box-a2d9f.firebaseapp.com",
	projectId: "barter-box-a2d9f",
	storageBucket: "barter-box-a2d9f.appspot.com",
	messagingSenderId: "485483637136",
	appId: "1:485483637136:web:be1104ddc3cab4e4676b15",
	measurementId: "G-758NTMNZXJ",
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);

export const auth = getAuth(Firebase)
export default Firebase