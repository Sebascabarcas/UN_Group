import React from 'react';
import { Platform, Image } from 'react-native';
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
import theme from '../styles/theme.style';
import Solicitudes from '../screens/MyGroup/Solicitudes';
import Members from '../screens/MyGroup/Members';
import Events from '../screens/MyGroup/Events/Events';
import GroupProfile from '../screens/MyGroup/GroupProfile';
import Member from '../screens/MyGroup/Member';

const GroupStack = createStackNavigator({
  GroupProfile: GroupProfile,
}, { headerMode: "none" });

GroupStack.navigationOptions = {
  tabBarLabel: 'Grupo',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: 'white',
    style: {
      backgroundColor: theme.PRIMARY_COLOR,
    }
  },
  tabBarIcon: ({ focused }) => (
    <Image
      source={images['logo']}
      fadeDuration={0}
      style={{width: 26, height: 26}}
    />
  ),
};

const MembersStack = createStackNavigator({
  Groups: Members,
  Member: Member
  
}, { headerMode: "none" });

MembersStack.navigationOptions = {
  tabBarLabel: 'Miembros',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: 'white',
    style: {
      backgroundColor: theme.PRIMARY_COLOR,
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      focusedColor="white"
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  ),
};

const EventsStack = createStackNavigator({
  Events: Events,
}, { headerMode: "none" });

EventsStack.navigationOptions = {
  tabBarLabel: 'Eventos',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: 'white',
    style: {
      backgroundColor: theme.PRIMARY_COLOR,
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      focusedColor="white"
      name={
        Platform.OS === 'ios'
          ? `ios-calendar-${focused ? '' : '-outline'}`
          : 'md-calendar'
      }
      // name={Platform.OS === 'ios' ? `ios-checkmark-circle${focused ? '' : '-outline'}` : `md-checkmark-circle${focused ? '' : '-outline'}`}
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
    activeTintColor: 'white',
    style: {
      backgroundColor: theme.PRIMARY_COLOR,
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      focusedColor="white"
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
