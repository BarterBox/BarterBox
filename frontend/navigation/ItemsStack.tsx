import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyItemsScreen from '../screens/MyItemsScreen';
import NewItemScreen from '../screens/NewItemScreen';

export default function MyItemsStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator 
        initialRouteName='Items'
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen
                name='Items'
                component={MyItemsScreen}
            />
            <Stack.Screen
                name='NewItem'
                
                component={NewItemScreen}
            />
        </Stack.Navigator>
    );
}