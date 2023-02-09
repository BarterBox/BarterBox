import React, { useContext } from 'react';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>You Have Successfully Logged In</Text>
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