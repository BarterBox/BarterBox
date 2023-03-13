import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatsScreen from '../screens/ChatsScreen';
import MessagingScreen from "../screens/MessagingScreen";

export default function MessagingStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Chats'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Chats"
                component={ChatsScreen}
            />

            <Stack.Screen
                name="Messaging"
                component={MessagingScreen}
            />
        </Stack.Navigator>
    );
}