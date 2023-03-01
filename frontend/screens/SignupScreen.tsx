import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';


const SignUpScreen = ({navigation}) => {
    const { register } = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            console.log("Registering User")
            await register(email, password, fullName)
            console.log("User Registered")
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Full Name'
                    onChangeText={(name) => setFullName(name)}
                    numberOfLines={1}
                    value={fullName}
                    keyboardType={'default'}
                />
            </View>
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
                    keyboardType={'default'}
                    secureTextEntry={true}
                />
            </View>
            <Button
                title='Sign Up'
                onPress={ () => registerUser() }
            />
        </View>
    );  
}

const styles = StyleSheet.create({
	container: {
        height: '100%',
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
    inputContainer: {
        width: '80%',
        height: 20,
        marginBottom: 20
    }
})

export default SignUpScreen;
