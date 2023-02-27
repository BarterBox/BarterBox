import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketplaceScreen from "../screens/MarketplaceScreen";

export default function MarketplaceStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        initialRouteName='Marketplace'
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen
                name='Marketplace'
                component={MarketplaceScreen}
            />
        </Stack.Navigator>
    );
}