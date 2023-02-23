import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from '../components/Heading1';
import NewItemForm from '../components/new-item-screen/NewItemForm';


const NewItemScreen = () => {
    return (
		<View style={styles.container}>
			<Heading1 text="New Item" />
			<NewItemForm />
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20
	},
});

export default NewItemScreen