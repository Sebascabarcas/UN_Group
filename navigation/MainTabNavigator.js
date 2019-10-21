import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WalletScreen from '../screens/Profile/WalletScreen';
import PaymentMethodScreen from '../screens/Profile/PaymentMethodScreen';
import AddCreditCardScreen from '../screens/Profile/AddCreditCardScreen';
import OrdersScreen from '../screens/OrdersScreen';
import theme from '../styles/theme.style';

const HomeStack = createStackNavigator({
  Home: OrdersScreen,
}, { headerMode: "none" });

HomeStack.navigationOptions = {
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

const LinksStack = createStackNavigator({
  Links: PaymentMethodScreen,
}, { headerMode: "none" });

LinksStack.navigationOptions = {
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
  HomeStack,
  LinksStack,
  SettingsStack,
});
