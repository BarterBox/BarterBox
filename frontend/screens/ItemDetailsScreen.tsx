import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { Button, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import Background from "../components/general/Background";

import { app, getUserById, getMostRecentItemRequest } from '../Firebase';
import { getFirestore, getDoc, getDocs, addDoc, deleteDoc, setDoc, doc, query, collection, where, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import BBButton from "../components/general/BBButton";
import { AuthContext } from '../navigation/AuthProvider';

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

const handleRequestItem = async (item, userID, callback) => {
    const collectionRef = collection(database, `items/${item.id}/requests`)
    const requestData = {
        requestedBy: userID,
        date: serverTimestamp(),
        status: "open"
    }
    try {
        await addDoc(collectionRef, requestData)
        callback()
    }
    catch (err) {
        alert("There was an error requesting this item. Please try again later.")
        console.log(err)
    }
}

const handleAcceptRequest = async (item, request, callback) => {
    const requestRef = doc(database, "items", item.id, "requests", request.id)
    const itemRef = doc(database, "items", item.id)
    const loansRef = collection(database, "loans")
    // update request to "accepted"
    try {
        await updateDoc(requestRef, {
            status: "accepted",
            date_accepted: serverTimestamp(),
        })
        await updateDoc(itemRef, {
            borrowed: true,
            borrowed_by: request.requestedBy,
        })
        await addDoc(loansRef, {
            borrower: request.requestedBy.id,
            item: item.id,
        })
        callback()
    } catch (err) {
        alert("There was an error accepting the request. Please try again later.")
        console.log(err)
    }
}

const handleRejectRequest = async (item, request, callback) => {
    const requestRef = doc(database, "items", item.id, "requests", request.id)
    // update request to "accepted"
    try {
        await updateDoc(requestRef, {
            status: "rejected",
            date_rejected: serverTimestamp(),
        })
        callback()
    } catch (err) {
        alert("There was an error rejecting the request. Please try again later.")
        console.log(err)
    }
}

const ItemDetailsScreen = ({ navigation, route }) => {
    const item = route.params.item.item ? route.params.item.item : route.params.item;
    const {user} = useContext(AuthContext)
    const [recentRequest, setRecentRequest] = useState(null);
    const [refreshRequest, setRefreshRequests] = useState(1)
    const handleReturnItem = async (item, callback) => {
        const { displayName, image_url, email } = await getUserById(item.borrowed_by.id);
        navigation.navigate("Rating", { screen: "Rating", params: { ownerid: item.owner, borrowerName: displayName, borrowerid: item.borrowed_by.id, item: item.id } })
    }

    useEffect(() => {
        getMostRecentItemRequest(item.id).then((request) => setRecentRequest(request))
            .catch(err => console.log(err))
    }, [refreshRequest])
    
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
                
                {item.owner != route.params.userid && <BBButton label="Message owner" onPress={async () => {

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
                }}></BBButton>}

                {item.owner == route.params.userid ?
                    (<BBButton label="Delete" 
                        onPress={async () => 
                            await handleDeleteItem(item, navigation.goBack)
                        } />)
                    :
                    (<BBButton label="Request"
                        onPress={async () => {
                            await handleRequestItem(item,
                                route.params.userid,
                                () => alert("Item requested succesfully"))
                        }
                        } />)}
                {item.owner == route.params.userid ? (
                    <BBButton label="Item Returned"
                        onPress={async () => {
                            await handleReturnItem(item, navigation.goBack)
                        }}
                    />
                ) : (null)}

                {item.owner == route.params.userid && !item.borrowed && recentRequest != null ?
                    (<>
                        <View>
                            <Text>
                                Request by {recentRequest.requestedBy.displayName}
                            </Text>
                            <View style={styles.requestButtonsContainer}>
                                <BBButton label={`Accept`}
                                    onPress={() => handleAcceptRequest(item, recentRequest, () => alert("Request Accepted"))} />
                                <BBButton label={`Reject`}
                                    onPress={() => handleRejectRequest(item, recentRequest, () => {
                                        alert("Request rejected")
                                        setRefreshRequests(-refreshRequest)
                                    })} />
                            </View>
                        </View>

                    </>) :
                    (<></>)}

                {item.owner == route.params.userid && item.borrowed  ?
                    (<>
                        <View>
                            <Text>
                                Currently borrowed by: {item.borrowed_by.displayName}
                            </Text>
                        </View>

                    </>) :
                    (<></>)}

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
    },
    requestButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});

export default ItemDetailsScreen;