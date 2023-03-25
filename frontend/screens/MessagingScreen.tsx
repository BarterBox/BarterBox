import React, { useContext, useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Button, FlatList, Text, TextInput, BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import { app } from '../Firebase';
import { getFirestore, getDoc, getDocs, setDoc, doc, query, collection, where, onSnapshot } from "firebase/firestore";

import UserCard from '../components/messaging/UserCard';

const database = getFirestore(app);

let unsub;

const MessagingScreen = ({ navigation, route }) => {

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
            unsub();
            return false;
        }
    )

    const Spacer = <View style={{ height: 5 }}></View>;
    useEffect(() => {
        unsub = onSnapshot(query(collection(database, `chats/${route.params.chat.id}/messages`)), (snapshot) => {
            Promise.all(snapshot.docs.filter((document, index) => {
                return document.data() && true;
            })
                .map((document, index) => {
                    return { id: index, message: document.data() };
                })).then((messages) => { setMessages(messages) });
        });
    }, []);
    return (
        <KeyboardAvoidingView behavior="position" style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <UserCard user={route.params.chat.correspondant} onPress={() => { }}></UserCard>
            </View>
            {Spacer}
            <View style={{ borderColor: "#000", borderWidth: 5 }}>
                <Button title="Go back" onPress={() => { unsub(); navigation.navigate("Chats") }}></Button>
            </View>
            {Spacer}
            <FlatList
                data={messages}
                renderItem={({ item }) => {
                    if (item.message.sender == route.params.userid) {
                        return <Text style={styles.user} >{`You: ${item.message.content}`}</Text>
                    }
                    else {
                        return <Text style={styles.correspondant} >{`${route.params.chat.correspondant.displayName}: ${item.message.content}`}</Text>
                    }
                }}
            />
            {Spacer}
            <View style={{ borderColor: "#000", borderWidth: 1 }}>
                <TextInput placeholder="Enter a message" value={input} onChangeText={(text) => { setInput(text); }}></TextInput>
            </View>
            {Spacer}
            <View style={{ borderColor: "#000", borderWidth: 5 }}>
                <Button title="Send message" onPress={() => {
                    //unix millis to have really low chance of two documents writing with the same id (lazy solution)
                    setDoc(doc(database, `chats/${route.params.chat.id}/messages`, `${Date.now()}`), {
                        content: input,
                        sender: route.params.userid
                    })
                    setInput("");
                }}></Button>
            </View>
        </KeyboardAvoidingView>
    );

}

const fontsize = 20;
const topMargin = 35;
const bottomMargin = 15;

const styles = StyleSheet.create({
    container: {
        top: topMargin,
        bottom: bottomMargin,
        backgroundColor: "#fff",
    },
    user: {
        fontSize: fontsize,
        backgroundColor: "#DFF",
    },
    correspondant: {
        fontSize: fontsize,
        backgroundColor: "#BEF",
    },
});

export default MessagingScreen;