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
          else if (route.name === 'BarterBox') {
            iconName = focused ? 'ios-apps' : 'ios-apps-outline';
          }
          else if (route.name === 'Personal') {
            iconName = focused ? 'ios-people' : 'ios-people-outline';
          }
          else if (route.name == "Messages") {
            iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
          }
          else if (route.name === 'MyItems') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name='BarterBox' component={MarketplaceStack} />
      <Tab.Screen name='MyItems' component={MyItemsStack} />
      <Tab.Screen name="Messages" component={MessagingStack} />
      <Tab.Screen name='Personal' component={ProfileStack} />
    </Tab.Navigator>
  );
}
