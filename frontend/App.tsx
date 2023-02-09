import { ActivityIndicator } from "react-native";
import View from 'react-native-ui-lib/view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Firebase from "./Firebase";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useEffect,useMemo,useState } from "react";
import mainContext from "./context/Context";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(Firebase);

const App = () => {

  const [items, setItems] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const AppStack = createStackNavigator();

  GoogleSignin.configure({
    webClientId: '485483637136-r120arffkjkf6makhoret3v3pctkvhuc.apps.googleusercontent.com'
  })
  
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

  const auth = getAuth(Firebase)

  const onGoogleButtonPress = async () => {
    setIsLoading(true);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(idToken)
    signInWithCredential(auth, googleCredential)
    setUserLogged(true)
    setIsLoading(false);
  };

  const mainC = useMemo(
    () => ({
        items: { items },
        userProfile: { userProfile },
        handleLogin: (email: string, password: string) => {
          setIsLoading(true);
          signInWithEmailAndPassword(auth, email, password).catch((error) => {
            console.log(error);
          })
          setUserLogged(true);
          setIsLoading(false);
        },
        handleGoogleLogin: () => {
          onGoogleButtonPress();
        }
      }), 
      []
    );
  
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    )
  }

  return (
    <mainContext.Provider value={mainC}>
      <NavigationContainer>
        <AppStack.Navigator initialRouteName="login">
          { userLogged == false ? (
            <>
            <AppStack.Screen name="Login" component={LoginScreen} />
            </>
          ) : (
            <>
            <AppStack.Screen name="Home" component={HomeScreen} />
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </mainContext.Provider>
  );
};

export default App;