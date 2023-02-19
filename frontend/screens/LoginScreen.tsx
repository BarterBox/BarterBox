import React, { useState, useContext } from 'react'
import { View, Button, TextInput, StyleSheet, TouchableWithoutFeedback, Image, Text} from 'react-native'
import { AuthContext } from '../navigation/AuthProvider';
import DismissKeyboard from '../components/DismissKeyboard';

const LoginScreen = ({navigation}) => {
    const { login, logOrSignup } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <TouchableWithoutFeedback onPress={() => DismissKeyboard()}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder='Email Address'
                        onChangeText={(email) => setEmail(email)}
                        numberOfLines={1}
                        value={email}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder='Password'
                        onChangeText={(password) => setPassword(password)}
                        numberOfLines={1}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>
                <Button
                    title='Login'
                    onPress={ () => login(email, password) }
                />
                <Button
                    title="Don't have an account? Sign Up Here"
                    onPress={ () => logOrSignup() }
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
        height: 20,
        marginBottom: 20,
    },
    userProfile: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: 50,
        height: 50
      }
});

export default LoginScreen;
