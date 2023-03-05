import React, { useContext, useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from "../components/Heading1";
import { AuthContext } from '../navigation/AuthProvider';
import { app } from '../Firebase';
import { getFirestore, getDoc, doc } from "firebase/firestore";

import UserCard from "../components/messaging/UserCard";

const database = getFirestore(app);

const ChatsScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        displayName: null, photoURL: null, email: null
    });

    useEffect(() => {
        getDoc(doc(database, "Users", user.uid))
            .then(snapshot => { return snapshot.data(); })
            .then(data => { setUserData({ displayName: data.displayName, photoURL: data.photoURL, email: data.email }); })
            .catch(error => { setUserData({ displayName: "n/a", photoURL: null, email: null }) });
    }, []);

    const { displayName, photoURL, email } = userData;
    const userObj = { displayName: displayName, photoURL: photoURL, email: email }
    return (
        <View style={styles.container}>
            <Heading1 text={`${userData.displayName}'s chats`}></Heading1>
            <UserCard user={userObj} onPress={() => { navigation.navigate("Messaging") }} />
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
});

export default ChatsScreen;