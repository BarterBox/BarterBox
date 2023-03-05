import React from 'react';
import { View, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from "../components/Heading1";

const ChatsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Heading1 text={"Your chats"}></Heading1>
            <Button title="Some user" onPress={() => { navigation.navigate("Messaging") }}></Button>
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

export default ChatsScreen;