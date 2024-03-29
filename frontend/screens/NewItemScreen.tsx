import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import Heading1 from '../components/Heading1';
import NewItemForm from '../components/new-item-screen/NewItemForm';
import Background from "../components/general/Background";


const NewItemScreen = ({navigation}) => {
    return (
		<View style={styles.container}>
			<Background />
			<Heading1 text="New Item" />
			<NewItemForm onSubmit={() => navigation.goBack()}/>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: "#fff",
		padding: 20,
		paddingTop: 40,
	},
});

export default NewItemScreen