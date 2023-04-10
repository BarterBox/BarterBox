import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyItemsScreen from '../screens/MyItemsScreen';
import NewItemScreen from '../screens/NewItemScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import RatingScreenLender from '../screens/RatingScreenLender';
import RatingScreenBorrower from '../screens/RatingScreenBorrower';

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
                name='RatingLender'
                component={RatingScreenLender}
            />
            <Stack.Screen
                name='RatingBorrower'
                component={RatingScreenBorrower}
            />
        </Stack.Navigator>
    );
}