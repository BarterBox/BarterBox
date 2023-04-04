import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyItemsScreen from '../screens/MyItemsScreen';
import NewItemScreen from '../screens/NewItemScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import RatingScreen from '../screens/RatingScreen';

export default function MyItemsStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator 
        initialRouteName='ItemsHere'
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
            <Stack.Screen
                name='ItemDetails'
                
                component={ItemDetailsScreen}
            />
            <Stack.Screen
                name='Rating'
                component={RatingScreen}
            />
        </Stack.Navigator>
    );
}