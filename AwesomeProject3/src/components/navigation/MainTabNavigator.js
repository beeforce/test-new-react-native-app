import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../styles/tabBarIcon';
import FeedScreen from '../screen/FeedScreen';
import VIPsScreen from '../screen/VIPsScreen';
import SettingsScreen from '../screen/settingScreen';
import ScheduleScreen from '../screen/ScheduleScreen';
import ProfileScreen from '../screen/profileScreen';

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
});


//Feed app page
FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-apps${focused ? '' : '-outline'}`
          : 'md-apps'
      }
    />
  ),
};

//Schedule page
const ScheduleStack = createStackNavigator({
  Schedule: ScheduleScreen,
});

ScheduleStack.navigationOptions = {
  tabBarLabel: 'Schedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused = {focused}
    name={Platform.OS === 'ios' ? `ios-calendar-outline${focused ? '': '-outline'}` : 'md-calendar'}
    />
  ),
  style: {
        paddingTop: 20,
      },
};

//Q&A page
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Q & A',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-chatbubbles'}
    />
  ),
};

//VIP page
const VIPsStack = createStackNavigator({
  VIPs: VIPsScreen,
});

VIPsStack.navigationOptions = {
  tabBarLabel: 'VIPs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-ribbon${focused ? '' : '-outline'}` : 'md-ribbon'}
    />
  ),
};

//Profile
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused = {focused}
    name={Platform.OS === 'ios' ? `ios-people${focused ? '': '-outline'}` : 'md-people'}
    />
  ),
};

export default createBottomTabNavigator({
  FeedStack,
  ScheduleStack,
  SettingsStack,
  VIPsStack,
  ProfileStack,
});
