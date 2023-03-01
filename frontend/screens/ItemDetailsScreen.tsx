import React from 'react';
import { View, Text, Button, Alert, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import Item from "../types/Item";


const ItemDetailsScreen = ({route, navigation}) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Item: {item.heading}</Text>
            <Text></Text>
            <Text>Description:</Text>
            <Text>{item.description}</Text>
            <Text></Text>
            <Image source={{uri: item.image_url}} style={{width: 200, height: 200}}/>
            <Button title="Back" onPress={() => navigation.goBack()}/>
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