import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import PickImage from '../components/PickImage';
import {AuthContext} from '../navigation/AuthProvider';
import Background from "../components/general/Background";
import {TextField} from "react-native-ui-lib";
import BBButton from "../components/general/BBButton";
import DismissKeyboard from "../components/DismissKeyboard";
import Heading1 from "../components/Heading1";


const SignUpScreen = ({navigation}) => {
    const {register} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            console.log("Registering User")
            await register(email, password, userData)
            console.log("User Registered")
        } catch (e) {
            console.log(e)
        }
    }

    const handlePickImage = async () => {
        const result = await PickImage()
        setUserData({...userData, image_url: result.assets[0].uri})
    }

    return (
        <TouchableWithoutFeedback onPress={() => DismissKeyboard()}>
            <View flex paddingH-25 style={styles.container}>
                <Background/>
                <Heading1 text="Sign Up"/>
                <TextField
                    placeholder='Full Name'
                    value={userData ? userData.fullname : ''}
                    onChangeText={(txt) => setUserData({...userData, fullname: txt})}
                    numberOfLines={1}
                    keyboardType={'default'}
                />
                <TextField
                    placeholder="Country"
                    autoCorrect={false}
                    value={userData ? userData.country : ''}
                    onChangeText={(txt) => setUserData({...userData, country: txt})}
                />
                <TextField
                    placeholder="City"
                    autoCorrect={false}
                    value={userData ? userData.city : ''}
                    onChangeText={(txt) => setUserData({...userData, city: txt})}
                />
                <TextField
                    placeholder='Email Address'
                    onChangeText={(email) => setEmail(email)}
                    numberOfLines={1}
                    value={email}
                    keyboardType={'email-address'}
                />
                <TextField
                    placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    numberOfLines={1}
                    value={password}
                    keyboardType={'default'}
                    secureTextEntry={true}
                />
                <BBButton label={'Add Profile Picture'} onPress={handlePickImage}/>
                <View center>
                    <BBButton label="Sign Up"
                              onPress={registerUser}
                    />
                    <Text marginT-100>Already have an account?</Text>
                    <BBButton label="Login"
                              onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
})

export default SignUpScreen;
