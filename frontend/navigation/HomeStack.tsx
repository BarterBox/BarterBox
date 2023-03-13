import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyItemsStack from './ItemsStack';
import MarketplaceStack from "./MarketplaceStack";
import MessagingStack from "./MessagingStack";
import ProfileStack from './ProfileStack';

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
          else if (route.name == "Messaging") {
            iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
          }
          else if (route.name === 'Items') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name='Marketplace' component={MarketplaceStack} />
      <Tab.Screen name='Items' component={MyItemsStack} />
      <Tab.Screen name="Messaging" component={MessagingStack} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
}