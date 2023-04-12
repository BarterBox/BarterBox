import React, {useContext, useState, useEffect} from 'react';
import {View, Button, FlatList, BackHandler, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import Heading1 from "../components/Heading1";
import {AuthContext} from '../navigation/AuthProvider';
import {app, getUserById} from '../Firebase';
import {getFirestore, getDoc, getDocs, doc, query, collection, where, onSnapshot, writeBatch} from "firebase/firestore";
import {useFocusEffect} from '@react-navigation/native';


import UserCard from "../components/messaging/UserCard";
import {ChatRedirectContext} from "../context/Context";

const database = getFirestore(app);

let unsub;

const ChatsScreen = ({navigation, route}) => {

    const {chatRedirect, setChatRedirect} = useContext(ChatRedirectContext);

    const [userData, setUserData] = useState({
        displayName: "User", photoURL: null, email: null
    });

    const [chats, setChats] = useState([]);

    const {user} = useContext(AuthContext);

    BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
            unsub();
            return false;
        }
    )

    useFocusEffect(
        React.useCallback(() => {
            // Update the `unsub` variable when the screen is focused
            //problem - map function returns an array of promises, app crashes if setChats takes promises
            //solution: setChats with promise.all so that setChats happens after all promises are resolved
            unsub = onSnapshot(query(collection(database, "chats")), (snapshot) => {
                Promise.all(snapshot.docs.filter((document, index) => {
                    const data = document.data();
                    return data.user1 == user.uid || data.user2 == user.uid;
                })
                    .map(async (document, index, array) => {
                        const data = document.data();
                        const correspondantRole = data.user1 == user.uid ? "user2" : "user1";
                        const correspondantData = await getUserById(document.data()[`${correspondantRole}`]);
                        const {displayName, image_url = null, email} = correspondantData;

                        const messagesSnapshot = await getDocs(query(collection(database, `chats/${document.id}/messages`), where("unread", "==", true), where("sender", "!=", user.uid)));
                        const unreadCount = messagesSnapshot.size;

                        return {
                            id: document.id,
                            correspondant: {displayName: displayName, photoURL: image_url, email: email, id: document.data()[`${correspondantRole}`]},
                            unreadCount: unreadCount
                        };
                    })).then((chats) => {
                    setChats(chats)
                });
            });

            // Clean up the `unsub` variable when the screen is unfocused
            return () => unsub();
        }, [])
    );

    useEffect(() => {
        console.log("chatRedirect", chatRedirect);
        if(chatRedirect?.chat && chatRedirect?.userid){
            console.log("chatRedirect.chat", chatRedirect.chat);
            setChatRedirect(null);
            navigation.navigate("Messaging", chatRedirect);
        }

        (async () => {
            //get data for the current user
            getUserById(user.uid)
                .then((correspondantData) => {
                    const {displayName, image_url = null, email} = correspondantData;
                    setUserData({displayName: displayName, photoURL: image_url, email: email});
                })

        })();


    }, [chatRedirect]);

    const handleChatPress = async (item) => {
        unsub();
        const messagesRef = collection(database, `chats/${item.id}/messages`);
        const unreadMessagesSnapshot = await getDocs(query(messagesRef, where("unread", "==", true), where("sender", "!=", user.uid)));
        const batch = writeBatch(database);

        unreadMessagesSnapshot.forEach(docSnapshot => {
            const messageRef = doc(messagesRef, docSnapshot.id);
            batch.update(messageRef, {"unread": false});
        });

        await batch.commit();
        navigation.navigate("Messaging", {chat: item, userid: user.uid});
    }

    return (
        <View style={styles.container}>
            <View style={{paddingLeft: 20}}>
                <Heading1 text={`${userData.displayName}'s chats`}></Heading1>
            </View>
            <FlatList
                data={chats}
                renderItem={({item}) => (
                    <UserCard
                        user={item.correspondant}
                        onPress={() => {
                            handleChatPress(item);
                        }}
                        unreadCount={item.unreadCount}
                    />
                )}
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