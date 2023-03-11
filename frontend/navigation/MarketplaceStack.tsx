import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketplaceScreen from "../screens/MarketplaceScreen";
import ItemDetailsScreen from '../screens/ItemDetailsScreen';

export default function MarketplaceStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        initialRouteName='Marketplaces'
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen
                name='Marketplace'
                component={MarketplaceScreen}
            />
            <Stack.Screen
                name='ItemDetails'
                
                component={ItemDetailsScreen}
            />
        </Stack.Navigator>
    );
}