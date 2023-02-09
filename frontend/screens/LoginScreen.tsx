import React, { useState, useContext } from 'react'
import { View, Button, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native'
import mainContext from '../context/Context'

const LoginScreen = ({navigation}) => {
    const { handleLogin } = useContext(mainContext)
    const { handleGoogleLogin } = useContext(mainContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder='Email Address'
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder='Password'
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>
                <Button
                    title='Login'
                    onPress={() => handleLogin(email, password)}
                />
                <Button
                    title='Login Using Google'
                    onPress={() => handleGoogleLogin()}
                />
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
    inputContainer: {
        width: '80%',
        marginBottom: 20
    },
    googleLogin: {
        backgroundColor: '#338FFF',
        marginTop: 20
    }
});

export default LoginScreen;