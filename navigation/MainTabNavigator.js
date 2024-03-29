import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import theme from '../styles/theme.style';
import TabBarIcon from '../components/TabBarIcon';

/* Screens */
import GroupsScreen from '../screens/Groups/GroupsScreen';
import AddCreditCardScreen from '../screens/Profile/AddCreditCardScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import SelectGroupButton from '../components/SelectGroupButton';

const headerTitleStyle = {
  fontFamily: theme.FONT_FAMILY_BOLD,
  fontSize: theme.FONT_SIZE_LARGE,
  color: theme.HEADER_MENU_TITLE_COLOR,
}

const defaultStackConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({navigation}) => ({
    title: 'UNGROUP',
    headerTransparent: true,
    headerStyle: {},
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft
        transparent
        onPress={() => navigation.openDrawer ()}
      >
        <FontAwesome
          name="navicon"
          color={theme.HEADER_MENU_TITLE_COLOR}
          size={theme.ICON_SIZE_SMALL}
        />
      </Button>
    ),
    // headerTintColor: theme.HEADER_MENU_TITLE_COLOR,
    headerTitle: (
      <SelectGroupButton/>
    ),
  }),
};

const EventsStack = createStackNavigator (
  {
    Events: EventsScreen,
  },
  defaultStackConfig
);

EventsStack.navigationOptions = {
  tabBarLabel: 'Eventos',
  tabBarOptions: {
    // showLabel: false,
    activeTintColor: theme.PRIMARY_COLOR,
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      focusedColor={theme.PRIMARY_COLOR}
      name={
        Platform.OS === 'ios'
          ? `ios-calendar-${focused ? '' : '-outline'}`
          : 'md-calendar'
      }
    />
  ),
};

const GroupsStack = createStackNavigator (
  {
    Groups: GroupsScreen,
  },
  defaultStackConfig
);

GroupsStack.navigationOptions = {
  tabBarLabel: 'Grupos',
  tabBarOptions: {
    // showLabel: false,
    activeTintColor: theme.PRIMARY_COLOR,
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      focusedColor={theme.PRIMARY_COLOR}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const SettingsStack = createStackNavigator (
  {
    Settings: AddCreditCardScreen,
  },
  defaultStackConfig
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'No se',
  tabBarOptions: {
    // showLabel: false,
    activeTintColor: theme.PRIMARY_COLOR,
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      focusedColor={theme.PRIMARY_COLOR}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
    />
  ),
};

export default createBottomTabNavigator ({
  EventsStack,
  GroupsStack,
  SettingsStack,
});
