import React, { useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen = () => {
	const { logout } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>You Have Successfully Logged In</Text>
			<Button title="Logout" onPress={() => {logout(); Alert.alert("You have successfully logged out.")}}/>
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

export default HomeScreen;