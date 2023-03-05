import React, { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import User from "../../types/User";

export default function UserCard({ user, onPress }: { user: User, onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container} >
            <Image style={styles.image} source={{ uri: user.photoURL }} />
            <Text style={styles.name}>{user.displayName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: 10,
        height: 100,
        width: "100%",
        borderWidth: 5,
        borderColor: "#2AF"
    },
    image: {
        width: 80,
        height: 80,
        position: "relative",
        top: 10,
        left: 10,
    },
    name: {
        top: 30,
        left: 30,
        fontSize: 20,
        fontWeight: "bold",
        position: "relative",
        textAlign: "center",
        justifyContent: "center"
    }
});