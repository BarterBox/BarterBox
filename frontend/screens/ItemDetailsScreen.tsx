import React from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { Button, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import Background from "../components/general/Background";

import { app, getUserById } from '../Firebase';
import { getFirestore, getDoc, getDocs, addDoc, deleteDoc, setDoc, doc, query, collection, where, onSnapshot } from "firebase/firestore";
import BBButton from "../components/general/BBButton";

const database = getFirestore(app);

const handleDeleteItem = async (item, callback) => {
    const docRef = doc(database, `items/${item.id}`)
    try {
        await deleteDoc(docRef)
        callback()
    }
    catch (err) {
        alert("Error deleting this item.")
    }
}

const ItemDetailsScreen = ({ navigation, route }) => {
    const item = route.params.item.item ? route.params.item.item : route.params.item;
    return (
        <View style={styles.container}>
            <Background />
            <Image source={{ uri: item.image_url }} style={styles.coverImage} />
            <View style={styles.itemsContainer}>
                <Text style={styles.heading}>{item.heading}</Text>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 10, marginBottom: 10 }} />
                <Text></Text>
                <Text>Description:</Text>
                <Text>{item.description}</Text>
                <BBButton label="Message owner" onPress={async () => {

                    if (item.owner == route.params.userid) {
                        Alert.alert("You can't create a conversation with yourself");
                        return;
                    }

                    //arbitrary convention to have user1 be alphabetically before user2 in the chat document
                    const [user1, user2] = [item.owner, route.params.userid].sort();

                    //look for a chat between the user and the owner
                    const allChats = await getDocs(query(collection(database, "chats"), where("user1", "==", user1)));
                    let existingChat = allChats.docs.find((document) => { return document.data().user2 == user2; });

                    //create a chat if it does not exist
                    let id;
                    if (!existingChat) {
                        const newChat = await addDoc(collection(database, "chats"), {
                            user1: user1,
                            user2: user2
                        });
                        //create messages collection in the chat by adding a blank document
                        await setDoc(doc(database, `chats/${newChat.id}/messages`, "0"), {
                            sender: null,
                            content: null
                        });
                        id = newChat.id;
                    }
                    else {
                        id = existingChat.id;
                    }

                    //navigate to the new chat created (or existing)
                    const { displayName, image_url, email } = await getUserById(item.owner);
                    navigation.navigate("Messaging", { screen: "Messaging", params: { chat: { id: id, correspondant: { displayName: displayName, photoURL: image_url, email: email } }, userid: route.params.userid } })
                }}></BBButton>
                {item.owner == route.params.userid ? (<BBButton label="Delete" onPress={async () => await handleDeleteItem(item, navigation.goBack)} />) : (<></>)}
                <View style={{ position: 'absolute', bottom: 0, width: "112%" }}>
                    <Button label={"Back"} onPress={() => navigation.goBack()}
                        borderRadius={20} backgroundColor={Colors.red20} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    itemsContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        margin: 20,
        marginTop: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollBarItemsContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },
    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 10,
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
});

export default ItemDetailsScreen;