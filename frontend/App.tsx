import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useEffect,useState } from "react";
import React from "react";



// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const querySnapshot = getDocs(collection(db, "testData"))
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data().Item);
          data.push(doc.data().Item);
        });
        setItems(data);
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text text30>All Items:</Text>
      {items.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default App;