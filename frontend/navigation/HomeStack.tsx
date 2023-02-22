import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MarketplaceScreen1 from '../screens/MarketPlaceScreen1';
import MyItemsScreen from '../screens/MyItemsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                iconName = focused
                    ? 'home'
                    : 'home-outline';
                }
                else if (route.name === 'Marketplace') {
                  iconName = focused ? 'ios-apps' : 'ios-apps-outline';
                }
                else if (route.name === 'Profile') {
                iconName = focused ? 'ios-people' : 'ios-people-outline';
                }
                else if (route.name === 'MyItems') {
                  iconName = focused ? 'pricetag' : 'pricetag-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Marketplace' component={MarketplaceScreen1} />
        <Tab.Screen name='MyItems' component={MyItemsScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
}