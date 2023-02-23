import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketplaceScreen from '../screens/MarketplaceScreen';
const Stack = createStackNavigator();
export default function MarketplaceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Marketplace1' component={MarketplaceScreen} />
    </Stack.Navigator>
  );
}




