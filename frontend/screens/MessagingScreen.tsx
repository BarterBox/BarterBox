import React from 'react';
import { View, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from "../components/Heading1";

const MessagingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button title="Go back" onPress={() => { navigation.navigate("Chats") }}></Button>
            <Heading1 text={"Some user"}></Heading1>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default MessagingScreen;