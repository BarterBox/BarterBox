import React, { useContext, useState, useEffect } from 'react';
import { View, Button, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from "../components/Heading1";
import { AuthContext } from '../navigation/AuthProvider';
import { app } from '../Firebase';
import { getFirestore, getDoc, getDocs, doc, query, collection, where } from "firebase/firestore";
import { getFirestoreCollectionDataWhere } from "../Firebase";

import UserCard from "../components/messaging/UserCard";

const database = getFirestore(app);

const ChatsScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        displayName: "User", photoURL: null, email: null
    });

    const [correspondants, setCorrespondants] = useState([]);

    useEffect(() => {
        (async () => {
            //get data for the current user
            const userSnapshot = await getDoc(doc(database, "Users", user.uid));
            const data = userSnapshot.data();
            const { displayName, photoURL = null, email } = data;
            setUserData({ displayName: displayName, photoURL: photoURL, email: email });

            //get the users with whom the current user has opened a chat, as user1 or as user2 in the database
            const correspondants = [];
            let index = 0;
            async function addCorrespondants(userRole) {
                const correspondantRole = (userRole == "user1") ? "user2" : "user1";
                const chats = await getFirestoreCollectionDataWhere("chats", userRole, "==", user.uid);
                for (const chat of chats) {
                    const correspondantSnapshot = await getDoc(doc(database, "Users", chat[correspondantRole]));
                    const data = correspondantSnapshot.data();
                    const { displayName, photoURL = null, email } = data;
                    correspondants.push({ "id": index, "correspondant": { displayName: displayName, photoURL: photoURL, email: email } });
                    index++;
                }
            }
            await addCorrespondants("user1");
            await addCorrespondants("user2");
            setCorrespondants(correspondants);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Heading1 text={`${userData.displayName}'s chats`}></Heading1>
            <FlatList
                data={correspondants}
                renderItem={({ item }) => { return <UserCard user={item.correspondant} onPress={() => { navigation.navigate("Messaging") }} /> }}
                ItemSeparatorComponent={({ }) => {
                    return <View style={{ height: 5 }}></View>;
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 35,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ChatsScreen;