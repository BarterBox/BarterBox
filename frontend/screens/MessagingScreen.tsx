import React, { useContext, useState, useEffect } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { app } from '../Firebase';
import { getFirestore, getDoc, getDocs, doc, query, collection, where } from "firebase/firestore";

const database = getFirestore(app);

const MessagingScreen = ({ navigation, route }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        (async () => {
            const messagesQuery = query(collection(database, `chats/${route.params.chat.id}/messages`));
            const messagesDocs = await getDocs(messagesQuery);

            setMessages(messagesDocs.docs
                .filter((document) => { return document.data().content && true })
                .map((document, index) => { return { id: index, message: document.data() } })
            )
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Button title="Go back" onPress={() => { navigation.navigate("Chats") }}></Button>
            </View>
            <View>
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
            </View>
        </View>
    );

}

const fontsize = 20;

const styles = StyleSheet.create({
    container: {
        top: 35,
        backgroundColor: "#fff",
    },
    banner: {
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    user: {
        fontSize: fontsize,
        backgroundColor: "#BEF",
    },
    correspondant: {
        fontSize: fontsize,
        backgroundColor: "#6BF",
    }
});

export default MessagingScreen;