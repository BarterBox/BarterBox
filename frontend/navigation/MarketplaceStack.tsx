import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketplaceScreen1 from '../screens/MarketPlaceScreen1';
const Stack = createStackNavigator();
export default function MarketplaceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Marketplace1' component={MarketplaceScreen1} />
    </Stack.Navigator>
  );
}




