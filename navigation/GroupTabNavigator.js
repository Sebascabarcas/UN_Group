import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WalletScreen from '../screens/Profile/WalletScreen';
import GroupsScreen from '../screens/Groups/GroupsScreen';
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';
import AddCreditCardScreen from '../screens/Profile/AddCreditCardScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import theme from '../styles/theme.style';
import Solicitudes from '../screens/MyGroup/Solicitudes';
import Members from '../screens/MyGroup/Members';

const GroupStack = createStackNavigator({
  Events: EventsScreen,
}, { headerMode: "none" });

GroupStack.navigationOptions = {
  tabBarLabel: 'Grupo',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
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

const MembersStack = createStackNavigator({
  Groups: Members,
  
}, { headerMode: "none" });

MembersStack.navigationOptions = {
  tabBarLabel: 'Miembros',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: theme.PRIMARY_COLOR
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  ),
};

const EventsStack = createStackNavigator({
  Settings: AddCreditCardScreen,
}, { headerMode: "none" });

EventsStack.navigationOptions = {
  tabBarLabel: 'Eventos',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: theme.PRIMARY_COLOR
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-checkmark-circle${focused ? '' : '-outline'}` : `md-checkmark-circle${focused ? '' : '-outline'}`}
    />
  ),
};

const SolicitudesStack = createStackNavigator({
  Solicitudes,
}, { headerMode: "none" });

SolicitudesStack.navigationOptions = {
  tabBarLabel: 'Solicitudes',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: theme.PRIMARY_COLOR
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-mail` : `md-mail`}
    />
  ),
};

export default createMaterialTopTabNavigator({
  GroupStack,
  MembersStack,
  EventsStack,
  SolicitudesStack,
});
