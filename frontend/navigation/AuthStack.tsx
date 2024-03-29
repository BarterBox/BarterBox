import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

export default function AuthStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={
            {
                headerShown: false
            }
        } initialRouteName='Login'>
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                /> 
                <Stack.Screen
                    name='Signup'
                    component={SignupScreen}
                />   
        </Stack.Navigator>
    );
}