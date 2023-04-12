import React, {useState, useContext} from 'react'
import {View, Button, Text, TextField} from 'react-native-ui-lib';
import {TouchableWithoutFeedback} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import DismissKeyboard from '../components/DismissKeyboard';
import Heading1 from "../components/Heading1";
import BBButton from "../components/general/BBButton";
import Background from "../components/general/Background";
import { StyleSheet} from "react-native";

const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Separator = (): React.ReactElement => {
        return <View marginT-5 marginB-5>
            <View height={1} bg-dark70 style={{marginHorizontal: 10}}/>
        </View>
    }

    return (
        <TouchableWithoutFeedback onPress={() => DismissKeyboard()}>
            <View flex paddingH-25 style={styles.container}>
                <Background />
                <Heading1 text="Login"/>
                <View>
                    <TextField
                        migrate
                        text50 grey10
                        placeholder='Email Address'
                        onChangeText={(email) => setEmail(email)}
                        numberOfLines={1}
                        value={email}
                        keyboardType={'email-address'}
                    />
                    <Separator/>
                    <TextField text50 grey10
                               migrate
                               placeholder='Password'
                               onChangeText={(password) => setPassword(password)}
                               numberOfLines={1}
                               value={password}
                               secureTextEntry={true}
                    />
                    <Button link label="Forgot Password?"/>
                    <View center>
                        <BBButton label="Login"
                                onPress={() => login(email, password)}
                        />
                        <Text marginT-100>Don't have an account?</Text>
                        <BBButton label="Sign Up"
                                onPress={() => navigation.navigate('Signup')}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    }
});

export default LoginScreen;
