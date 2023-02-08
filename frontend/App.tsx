import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';

import Firebase from "./Firebase";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useEffect,useMemo,useState,createContext } from "react";
import React from "react";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(Firebase);

const mainContext = createContext([])

const [userLogged, setUserLogged] = useState(false)
const [userProfile, setUserProfile] = useState(null)
const [isLoading, setIsLoading] = useState(true)

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

  const mainC = useMemo(
    () => ({
      userProfile: { userProfile },
      handleLogin: (email, password) => {
        setIsLoading(true);
        
        setIsLoading(false);
      }

    }), [])
  

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