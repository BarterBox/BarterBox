import React, { useContext, useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Button, FlatList, Text, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { app } from '../Firebase';
import { getFirestore, getDoc, getDocs, setDoc, doc, query, collection, where, onSnapshot } from "firebase/firestore";

const database = getFirestore(app);

const MessagingScreen = ({ navigation, route }) => {

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    useEffect(() => {
        (async () => {
            const messagesQuery = query(collection(database, `chats/${route.params.chat.id}/messages`));

            async function updateMessages() {
                const messagesDocs = await getDocs(messagesQuery);
                const messages = messagesDocs.docs
                    .filter((document) => { return document.data().content && true })   //non-blank messages
                    .map((document, index) => { console.log(document.data()); return { id: index, message: document.data() } });
                setMessages(messages);
            }
            //load messages with screen
            updateMessages();
            //check for updates regularly
            setInterval(updateMessages, 2000);
        })();
    }, []);

    return (
        <KeyboardAvoidingView behavior="position" style={styles.container}>
            <View style={{ borderColor: "#000", borderWidth: 5 }}>
                <Button title="Go back" onPress={() => { navigation.navigate("Chats") }}></Button>
            </View>
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
            <View style={{ borderColor: "#000", borderWidth: 1 }}>
                <TextInput placeholder="Enter a message" value={input} onChangeText={(text) => { setInput(text); }}></TextInput>
            </View>
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