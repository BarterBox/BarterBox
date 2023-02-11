/*
    Dummy signup screen.
*/

import React from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { StyleSheet } from 'react-native';

const SignupScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Sorry, there is no signup screen yet</Text>
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

export default SignupScreen;