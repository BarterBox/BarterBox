import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';



const MyItemsScreen = ({navigation}) => {

	const handleAddItem = () => {
		navigation.navigate('NewItem')
	}

    return (
        <View style={styles.container}>
            <Text>My Items </Text>
			<Button title="+" onPress={handleAddItem} />
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

export default MyItemsScreen;