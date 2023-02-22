import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import  Firebase from '../Firebase';
import { getFirestore, getDoc, doc } from "firebase/firestore";
const db = getFirestore(Firebase);

const ProfileScreen = () => {
	const { user, logout } = useContext(AuthContext);
	const [userData, setUserData] = useState([]);
	// const { logout } = useContext(AuthContext);

	useEffect(() => {
		const querySnapshot = getDoc(doc(db, "Users", user.uid))
		.then(snapshot => {
			if (snapshot.exists) {
				const data = snapshot.data();
				setUserData([data.displayName,data.photoURL,data.email]);
				console.log(data)
			} else {
				console.log("No such document!");
			}
		})
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
	}, []);
    return (
        <View style={styles.container}>
			<Image
			style={styles.profilePic}
			source={{
			uri: userData[1],
			}}
			></Image>
			<Text>Name: {userData[0]}</Text>
			<Text>email: {userData[2]}</Text>
			<Button title="Logout" onPress={() => {logout(); Alert.alert("You have successfully logged out.")}}/>
        </View>
    );

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	profilePic: {
    width: 100,
    height: 100,
  },
});

export default ProfileScreen;
