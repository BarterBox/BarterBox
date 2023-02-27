import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DismissKeyboard from '../components/DismissKeyboard';
import { AuthContext } from '../navigation/AuthProvider';


const SignUpScreen = ({navigation}) => {
    const { register } = useContext(AuthContext);
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={ () => DismissKeyboard() }>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Full Name'
                        onChangeText={ (fullName) => setFullName(fullName) }
                        numberOfLines={ 1 }
                        value={ fullName }
                        keyboardType={ 'default' }
                    />
                </View>
                <View style={ styles.inputContainer }>
                    <TextInput
                        placeholder='Email Address'
                        onChangeText={ (email) => setEmail(email) }
                        numberOfLines={ 1 }
                        value={ email }
                        keyboardType={ 'email-address' }
                    />
                </View>
                <View style={ styles.inputContainer }>
                    <TextInput
                        placeholder='Password'
                        onChangeText={ (password) => setPassword(password) }
                        numberOfLines={ 1 }
                        value={ password }
                        secureTextEntry={ true }
                    />
                </View>
                <Button
                    title='Sign Up'
                    onPress={ () => register(email, password) }
                />
                <Button
                    title='Already a member? Log In Here'
                    onPress={ () => navigation.navigate('Login') }
                />
            </View>
        </TouchableWithoutFeedback>
    )    
}


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

export default SignUpScreen;
