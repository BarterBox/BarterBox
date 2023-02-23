import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import NewItemForm from '../components/new-item-screen/NewItemForm';


const NewItemScreen = () => {
    return (
        <View style={styles.container}>
            <NewItemForm />
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

export default NewItemScreen