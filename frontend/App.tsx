import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useEffect,useMemo,useState } from "react";
import * as WebBrowser from "expo-web-browser";

import Firebase from "./Firebase";

// Initialize Cloud Firestore and get a reference to the service

const db = getFirestore(Firebase);

WebBrowser.maybeCompleteAuthSession()

const App = () => {

  const [items, setItems] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [accessToken, setAccessToken] = useState<String | null>(null)
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: "485483637136-oi3vgvvl3p47oa1vm3m44rn538hg0fvf.apps.googleusercontent.com",
  //   redirectUri: "https://auth.expo.io/@dan-whelan/barter-box"
  // })
  
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

  // useEffect(() => {
  //     if(response?.type === "success") {
  //       setAccessToken(response.authentication.accessToken);
  //     }
  // }, [response])

  // const getUserData = async () => {
  //   console.log("here")
  //   let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: { Authorization: `Bearer ${accessToken}`}
  //   })

  //   userInfoResponse.json().then((data) => {
  //     setUserProfile(data)
  //   })
  // }

  const auth = getAuth(Firebase)

  // const googleLogin = () => {
  //   promptAsync({showInRecents: true})
  //   setUserLogged(true)
  // }

  const mainC = useMemo(
    () => ({
        userProfile: { userProfile },
        handleLogin: (email: string, password: string) => {
          signInWithEmailAndPassword(auth, email, password).catch((error) => {
            console.log(error);
          })
          setUserLogged(true);
        },
      }), 
      []
    );

  return (
    <View style={styles.container}>
      <Text text30>All Items:</Text>
        {items?.map((item, index) => (
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
})

export default App;