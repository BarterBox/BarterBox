import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, FlatList, Text, TextInput, BackHandler, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import {app} from '../Firebase';
import {Button, Colors} from 'react-native-ui-lib';
import {getFirestore, getDocs, setDoc, doc, query, collection, onSnapshot} from "firebase/firestore";

import UserCard from '../components/messaging/UserCard';
import Background from "../components/general/Background";

const database = getFirestore(app);

let unsub;

const MessagingScreen = ({ navigation, route }) => {
    const scrollViewRef = React.useRef<ScrollView>(null);

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
            unsub();
            return false;
        }
    )

    const scrollDown = () => {
        if(scrollViewRef.current)
            scrollViewRef.current.scrollToEnd({ animated: false });
    };

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
    }, [scrollViewRef]);
    return (
        <KeyboardAvoidingView behavior="position" style={styles.container}
                                keyboardVerticalOffset={-1000}
        >
            <Background/>
            <View style={styles.header}>
                <UserCard backButton user={route.params.chat.correspondant} onBack={unsub} onPress={() => {
                }}></UserCard>
            </View>
            <ScrollView style={styles.chatContainer} onContentSizeChange={scrollDown} ref={scrollViewRef}>
                {
                    messages.map((message, index) => {
                        if (message.message.sender == route.params.userid) {
                            return <Text key={index} style={styles.user}>{`${message.message.content}`}</Text>
                        } else {
                            return <Text key={index} style={styles.correspondant}>{`${message.message.content}`}</Text>
                        }
                    })
                }
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Enter a message" value={input} onChangeText={(text) => {
                    setInput(text);
                }}/>
                <Button backgroundColor={Colors.green10} style={styles.sendButton} label="Send" onPress={() => {
                    //unix millis to have really low chance of two documents writing with the same id (lazy solution)
                    setDoc(doc(database, `chats/${route.params.chat.id}/messages`, `${Date.now()}`), {
                        content: input,
                        sender: route.params.userid,
                        unread: true
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
    chatContainer: {
        zIndex: 0,
        position: "relative",
        marginTop: 80,
        marginBottom: 80,
    },
    header: {
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
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
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
});

export default MessagingScreen;