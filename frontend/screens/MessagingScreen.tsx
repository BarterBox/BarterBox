import React, {useContext, useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, FlatList, Text, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {app} from '../Firebase';
import {Button, Colors} from 'react-native-ui-lib';
import {getFirestore, getDoc, getDocs, setDoc, doc, query, collection, where, onSnapshot} from "firebase/firestore";
import UserCard from '../components/messaging/UserCard';
import BBButton from "../components/general/BBButton";
import Background from "../components/general/Background";

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
            <Background/>
            <View style={styles.header}>
                <UserCard backButton user={route.params.chat.correspondant} onPress={() => {
                }}></UserCard>
            </View>
            <FlatList
                data={messages}
                renderItem={({item}) => {
                    if (item.message.sender == route.params.userid) {
                        return <Text style={styles.user}>{`${item.message.content}`}</Text>
                    } else {
                        return <Text style={styles.correspondant}>{`${item.message.content}`}</Text>
                    }
                }}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Enter a message" value={input} onChangeText={(text) => {
                    setInput(text);
                }}/>
                <Button backgroundColor={Colors.green10} style={styles.sendButton} label="Send" onPress={() => {
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
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,

    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    user: {
        fontSize: fontsize,
        marginTop: topMargin,
        marginBottom: bottomMargin,
        marginLeft: 10,
        marginRight: 10,
        textAlign: "right",
        alignSelf: "flex-end",
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    correspondant: {
        fontSize: fontsize,
        marginTop: topMargin,
        marginBottom: bottomMargin,
        marginLeft: 10,
        marginRight: 10,
        textAlign: "left",
        alignSelf: "flex-start",
        backgroundColor: "#aaa",
        color: "#000",
        borderRadius: 10,
        padding: 10,
    },
    input: {
        fontSize: fontsize,
        marginTop: topMargin,
        marginBottom: bottomMargin,
        marginLeft: 10,
        marginRight: 10,
        color: "#000",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        height: 50,
        width: "70%",
    },
    sendButton: {
        height: 50,
        width: "20%",
        position: "relative",
        top: 8,
        right: 0,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default MessagingScreen;