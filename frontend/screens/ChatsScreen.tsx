import React, { useContext, useState, useEffect } from 'react';
import { View, Button, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from "../components/Heading1";
import { AuthContext } from '../navigation/AuthProvider';
import { app } from '../Firebase';
import { getFirestore, getDoc, getDocs, doc, query, collection, where } from "firebase/firestore";

import UserCard from "../components/messaging/UserCard";

const database = getFirestore(app);

const ChatsScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        displayName: "User", photoURL: null, email: null
    });

    const [chats, setChats] = useState([]);

    useEffect(() => {
        (async () => {
            //get data for the current user
            const userSnapshot = await getDoc(doc(database, "Users", user.uid));
            const data = userSnapshot.data();
            const { displayName, image_url = null, email } = data;
            setUserData({ displayName: displayName, photoURL: image_url, email: email });

            async function updateChats() {
                const chats = [];
                async function getChatsAs(userRole) {
                    const correspondantRole = (userRole == "user1") ? "user2" : "user1";
                    const chatsQuery = query(collection(database, "chats"), where(userRole, "==", user.uid));
                    const chatDocs = await getDocs(chatsQuery);
                    for (const document of chatDocs.docs) {
                        const correspondant = await getDoc(doc(database, "Users", document.data()[correspondantRole]));
                        const { displayName, image_url = null, email } = correspondant.data();
                        chats.push({ id: document.id, correspondant: { displayName: displayName, photoURL: image_url, email: email } });
                    }
                };
                await getChatsAs("user1");
                await getChatsAs("user2");

                setChats(chats);
            }
            //load the chats with the screen
            await updateChats();

            //check for updates once in a while
            setInterval(updateChats, 10000)
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Heading1 text={`${userData.displayName}'s chats`}></Heading1>
            <FlatList
                data={chats}
                renderItem={({ item }) => { return <UserCard user={item.correspondant} onPress={() => { navigation.navigate("Messaging", { chat: item, userid: user.uid }) }} /> }}
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