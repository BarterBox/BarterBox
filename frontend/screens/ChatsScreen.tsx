import React, { useContext, useState, useEffect } from 'react';
import { View, Button, FlatList, BackHandler, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from "../components/Heading1";
import { AuthContext } from '../navigation/AuthProvider';
import { app, getUserById } from '../Firebase';
import { getFirestore, getDoc, getDocs, doc, query, collection, where, onSnapshot } from "firebase/firestore";

import UserCard from "../components/messaging/UserCard";

const database = getFirestore(app);

let unsub;

const ChatsScreen = ({ navigation }) => {

    const [userData, setUserData] = useState({
        displayName: "User", photoURL: null, email: null
    });

    const [chats, setChats] = useState([]);

    const { user } = useContext(AuthContext);

    BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
            unsub();
            return false;
        }
    )

    useEffect(() => {
        (async () => {
            //get data for the current user
            getUserById(user.uid)
                .then((correspondantData) => {
                    const { displayName, image_url = null, email } = correspondantData;
                    setUserData({ displayName: displayName, photoURL: image_url, email: email });
                })

        })();

        //problem - map function returns an array of promises, app crashes if setChats takes promises
        //solution: setChats with promise.all so that setChats happens after all promises are resolved
        unsub = onSnapshot(query(collection(database, "chats")), (snapshot) => {
            Promise.all(snapshot.docs.filter((document, index) => {
                const data = document.data();
                return data.user1 == user.uid || data.user2 == user.uid;
            })
                .map((document, index, array) => {
                    const data = document.data();
                    const correspondantRole = data.user1 == user.uid ? "user2" : "user1";
                    return getUserById(document.data()[`${correspondantRole}`])
                        .then((correspondantData) => {
                            const { displayName, image_url = null, email } = correspondantData;
                            return { id: document.id, correspondant: { displayName: displayName, photoURL: image_url, email: email } };
                        })
                })).then((chats) => { setChats(chats) });
        });
    }, []);

    return (
        <View style={styles.container}>
            <Heading1 text={`${userData.displayName}'s chats`}></Heading1>
            <FlatList
                data={chats}
                renderItem={({ item }) => { return <UserCard user={item.correspondant} onPress={() => { unsub(); navigation.navigate("Messaging", { chat: item, userid: user.uid }) }} /> }}
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