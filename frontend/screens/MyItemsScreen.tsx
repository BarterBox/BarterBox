import React, { useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const MyItemsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>My Items </Text>
			<Button title="+" />
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