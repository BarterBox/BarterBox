import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const MarketPlace = () => {
    return (
        <View style={styles.container}>
            <Text>Market Place </Text>
			<Text>This is the marketplace, have a look around </Text>
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

export default MarketPlace;