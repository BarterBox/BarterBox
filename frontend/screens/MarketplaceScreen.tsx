import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const MarketplaceScreen = () => {
	const { logout } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>Welcome to the MarketPlace </Text>
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

export default MarketplaceScreen;