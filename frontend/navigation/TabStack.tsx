import React from 'react';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
export default function TabStack() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-people' : 'ios-people';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        >
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  );
}