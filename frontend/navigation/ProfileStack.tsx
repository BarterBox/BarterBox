import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';


const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName='Profiles' screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Editor' component={EditProfileScreen} />
    </Stack.Navigator>
  );
}