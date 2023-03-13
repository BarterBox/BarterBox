import React from 'react';
import { View, Text, Button, Alert, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import Item from "../types/Item";

import { app } from '../Firebase';
import { getFirestore, getDoc, getDocs, addDoc, setDoc, doc, query, collection, where, onSnapshot } from "firebase/firestore";

const database = getFirestore(app);

const ItemDetailsScreen = ({ navigation, route }) => {
    const item = route.params.item.item ? route.params.item.item : route.params.item;
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Item: {item.heading}</Text>
            <Button title="Message owner" onPress={async () => {

                //arbitrary convention to have user1 be alphabetically before user2 in the chat document
                const [user1, user2] = [item.owner, route.params.userid].sort();

                //look for a chat between the user and the owner
                let existingChat = (await getDocs(query(collection(database, "chats"), where("user1", "==", user1)))).docs.find((document) => {
                    return document.data().user2 == user2;
                });

                let id;

                //create a chat if it does not exist
                if (!existingChat) {
                    const newChat = (await addDoc(collection(database, "chats"), {
                        user1: user1,
                        user2: user2
                    }));
                    await setDoc(doc(database, `chats/${newChat.id}/messages`, "0"), {
                        sender: null,
                        content: null
                    })
                    id = newChat.id;
                }
                else {
                    id = existingChat.id;
                }

                //navigate to the new chat created (or existing)
                const owner = await getDoc(doc(database, "Users", item.owner))
                const { displayName, image_url, email } = owner.data();
                navigation.navigate("Messaging", { screen: "Messaging", params: { chat: { id: existingChat, correspondant: { displayName: displayName, image_url: image_url, email: email } }, userid: route.params.userid } })
            }}></Button>
            <Text></Text>
            <Text>Description:</Text>
            <Text>{item.description}</Text>
            <Text></Text>
            <Image source={{ uri: item.image_url }} style={{ width: 200, height: 200 }} />
            <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
    },
    itemsContainer: {
        flex: 1,
    },
    scrollBarItemsContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    heading: {
        fontWeight: 'bold',
    },
});

export default ItemDetailsScreen;