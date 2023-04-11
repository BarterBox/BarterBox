import React, {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import User from "../../types/User";
import {useNavigation} from "@react-navigation/native";

export default function UserCard({
                                     user,
    onPress,
    lastMessage,
    backButton,
    onBack,
    unreadCount,
}: { onBack?:()=>void, user: User, onPress: () => void, lastMessage?: string, backButton?: boolean, unreadCount?: number }) {
    if (!(user.photoURL)) {
        user.photoURL = "https://firebasestorage.googleapis.com/v0/b/barter-box-a2d9f.appspot.com/o/images%2Fquestionmark.png?alt=media&token=ea7e9ace-47e2-461f-9c33-3e4d23f57ec9";
    }
    const navigate = useNavigation();
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.imageContainer}>
                {backButton && <TouchableOpacity onPress={()=>{onBack();navigate.goBack()}} style={styles.backButton}><Text>{"<"}</Text></TouchableOpacity>}
                <Image style={styles.image} source={{uri: user.photoURL}}/>
                <Text style={styles.name}>{user.displayName}</Text>
                {unreadCount && unreadCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{unreadCount}</Text>
                    </View>
                )}
            </View>
            {
                lastMessage && <Text style={styles.lastMessage}>{lastMessage}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        borderColor: "#aaa",
        borderWidth: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 20,
        marginLeft: 10,
    },
    lastMessage: {
        fontSize: 15,
        color: "#aaa",
        paddingTop: 10,
        height: 50,
    },
    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        fontSize: 30,
        marginRight: 10,
        backgroundColor: "#aaa",
        borderRadius: 5,
        padding: 5,
    },
    badge: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    }
});