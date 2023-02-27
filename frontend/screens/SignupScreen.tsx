import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DismissKeyboard from '../components/DismissKeyboard';
import { AuthContext } from '../navigation/AuthProvider';


const SignUpScreen = ({navigation}) => {
    const { register, login } = useContext(AuthContext);
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={() => DismissKeyboard()}>
            <View>
                <View>
                    <TextInput
                        placeholder='Full Name'
                        onChangeText={(name) => setFullName(name)}
                        numberOfLines={1}
                        value={fullName}
                        keyboardType={'default'}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='Email Address'
                        onChangeText={(email) => setEmail(email)}
                        numberOfLines={1}
                        value={email}
                        keyboardType={'email-address'}
                    />
                </View>
                <View>
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
                    onPress={() => {
                        console.log("here")
                        register(email, password)
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );  
}


export default SignUpScreen;
