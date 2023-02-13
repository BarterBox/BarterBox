/*
    Dummy signup screen.
*/

import React from 'react'
import { View, Text } from 'react-native';

import { StyleSheet } from 'react-native';

export default function SignupScreen ({navigation})  {

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