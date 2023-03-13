import React, { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import User from "../../types/User";

export default function UserCard({ user, onPress }: { user: User, onPress: () => void }) {
    if (!(user.photoURL)) {
        user.photoURL = "https://firebasestorage.googleapis.com/v0/b/barter-box-a2d9f.appspot.com/o/images%2Fquestionmark.png?alt=media&token=ea7e9ace-47e2-461f-9c33-3e4d23f57ec9";
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container} >
            <Image style={styles.image} source={{ uri: user.photoURL }} />
            <Text style={styles.name}>{user.displayName}</Text>
        </TouchableOpacity>
    )
}

const cardBorderWidth = 5;
const imgDims = 40;
const imgOffset = 5;
const nameOffset = 15;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: 10,
        height: (cardBorderWidth + imgOffset + imgDims + imgOffset + cardBorderWidth),
        width: 300,
        borderWidth: cardBorderWidth,
        borderColor: "#2AF",
        alignItems: "center",
        backgroundColor: "#BEF"
    },
    image: {
        left: imgOffset,
        borderRadius: 10,
        width: imgDims,
        height: imgDims,
    },
    name: {
        left: nameOffset,
        fontSize: imgDims / 1.5,    //the division is arbitrary
    }
});