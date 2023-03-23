import React, {useContext, useState, useEffect} from 'react';
import {View, Button, FlatList} from 'react-native';
import {StyleSheet} from 'react-native';
import Heading1 from "../components/Heading1";
import {AuthContext} from '../navigation/AuthProvider';
import {app, getUserById} from '../Firebase';
import {getFirestore, getDoc, getDocs, doc, query, collection, where} from "firebase/firestore";

import UserCard from "../components/messaging/UserCard";

const database = getFirestore(app);

const ChatsScreen = ({navigation}) => {

    const {user} = useContext(AuthContext);

    const [userData, setUserData] = useState({
        displayName: "User", photoURL: null, email: null
    });

    const [chats, setChats] = useState([]);

    useEffect(() => {
        (async () => {
            //get data for the current user
            const {displayName, image_url = null, email} = await getUserById(user.uid);
            setUserData({displayName: displayName, photoURL: image_url, email: email});

            async function updateChats() {
                const chats = [];
                let chatsQuery = query(collection(database, "chats"), where("user1", "==", user.uid));
                let chatDocs = await getDocs(chatsQuery);
                for (const document of chatDocs.docs) {
                    const {displayName, image_url = null, email} = await getUserById(document.data().user2);
                    chats.push({
                        id: document.id,
                        correspondant: {displayName: displayName, photoURL: image_url, email: email}
                    });
                }
                chatsQuery = query(collection(database, "chats"), where("user2", "==", user.uid));
                chatDocs = await getDocs(chatsQuery);
                for (const document of chatDocs.docs) {
                    const {displayName, image_url = null, email} = await getUserById(document.data().user1);
                    chats.push({
                        id: document.id,
                        correspondant: {displayName: displayName, photoURL: image_url, email: email}
                    });
                }

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
            <View style={{paddingLeft: 20}}>
                <Heading1 text={`${userData.displayName}'s chats`}></Heading1>
            </View>
            <FlatList
                data={chats}
                renderItem={({item}) => {
                    return <UserCard user={item.correspondant} onPress={() => {
                        navigation.navigate("Messaging", {chat: item, userid: user.uid})
                    }}/>
                }}
                ItemSeparatorComponent={({}) => {
                    return <View style={{height: 5}}></View>;
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 40,
    },
});

export default ChatsScreen;