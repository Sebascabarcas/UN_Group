import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Button, Icon} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import theme from '../styles/theme.style';
import TabBarIcon from '../components/TabBarIcon';

/* Screens */
import GroupsScreen from '../screens/Groups/GroupsScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import SelectGroupButton from '../components/SelectGroupButton';
import ReloadButton from '../components/ReloadButton';

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
        style={{marginLeft: 5}}
        transparent
        onPress={() => navigation.openDrawer()}
      >
        <Icon
          type="FontAwesome"
          name="navicon"
          style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
        />
      </Button>
    ),
    // headerTintColor: theme.HEADER_MENU_TITLE_COLOR,
    headerTitle: (
      <SelectGroupButton/>
    ),
    headerRight: (
      <ReloadButton/>
    )
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
          ? `ios-calendar`
          : 'md-calendar'
      }
    />
  ),
};

const GroupsStack = createStackNavigator (
  {
    Groups: GroupsScreen,
  },
  // defaultStackConfig
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

export default createBottomTabNavigator ({
  EventsStack,
  GroupsStack,
});
