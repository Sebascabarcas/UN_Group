import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WalletScreen from '../screens/Profile/WalletScreen';
import GroupsScreen from '../screens/Groups/GroupsScreen';
// // import CreateGroupScreen from '../screens/CreateGroupScreen';
import AddCreditCardScreen from '../screens/Profile/AddCreditCardScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import theme from '../styles/theme.style';

const EventsStack = createStackNavigator({
  Events: EventsScreen,
}, { headerMode: "none" });

EventsStack.navigationOptions = {
  tabBarLabel: 'Eventos',
  tabBarOptions: {
    activeTintColor: theme.PRIMARY_COLOR
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-calendar-${focused ? '' : '-outline'}`
          : 'md-calendar'
      }
    />
  ),
};

const GroupsStack = createStackNavigator({
  Groups: GroupsScreen,
  // CreateGroup: CreateGroupScreen
}, { headerMode: "none" });

GroupsStack.navigationOptions = {
  tabBarLabel: 'Grupos',
  tabBarOptions: {
    activeTintColor: theme.PRIMARY_COLOR
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: AddCreditCardScreen,
}, { headerMode: "none" });

SettingsStack.navigationOptions = {
  tabBarLabel: 'No se',
  tabBarOptions: {
    activeTintColor: theme.PRIMARY_COLOR
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
    />
  ),
};

export default createBottomTabNavigator({
  EventsStack,
  GroupsStack,
  SettingsStack,
});
