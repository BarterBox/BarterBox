import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from './AuthProvider';

export default function AuthStack() {
    const { loginNotSignup } = useContext(AuthContext)
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Login'>
            { loginNotSignup ?
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                /> 
                :
                <Stack.Screen
                    name='Signup'
                    component={SignupScreen}
                />   
            }
        </Stack.Navigator>
    );
}