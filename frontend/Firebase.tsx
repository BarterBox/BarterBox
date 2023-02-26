import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

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

export {app, storage}