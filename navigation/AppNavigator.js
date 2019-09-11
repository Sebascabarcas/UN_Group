import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';

// export default createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// }));

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import theme from '../styles/theme.style'
import MyText from '../components/MyText';
import {FontAwesome} from '@expo/vector-icons';
import {Button} from 'native-base';
// Loading Screen
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
// Drawer
import MenuDrawer from '../components/MenuDrawer';
// Auth
import SignInScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgetScreen';
import CheckEmail from '../screens/Auth/CheckEmail';
import HomeScreen from '../screens/HomeScreen';
// Intro
import IntroSlider from '../screens/Intro/IntroSlider';
// LocationPermissions
import LocationPermissionsScreen from '../screens/LocationPermissionScreen';
// App 
import TripPreviewScreen from '../screens/TripPreviewScreen';
import ChooseLocationScreen from '../screens/ChooseLocationScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ShowOrderScreen from '../screens/ShowOrderScreen';
// Profile
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
// Configuration
import ConfigurationScreen from '../screens/Configuration/ConfigurationScreen';
import NotificationsScreen from '../screens/Configuration/NotificationsScreen';
// Wallet
import WalletScreen from '../screens/Profile/WalletScreen';
import PaymentMethodScreen from '../screens/Profile/PaymentMethodScreen';
import AddCreditCardScreen from '../screens/Profile/AddCreditCardScreen';

// import { Divider, Button } from 'react-native-elements';

// import AssigmentScreen from '../screens/AssigmentScreen/AssigmentScreen';
// import QualificationScreen from '../screens/QualificationScreen/QualificationScreen';
// import TripScreen from '../screens/TripScreen/TripScreen';
// import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator(
  {
    // AddCreditCard: {
    //   screen: AddCreditCardScreen,
    // },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'INICIO',
      },
    },
    Configuration: {
      screen: ConfigurationScreen,
      navigationOptions: {
        title: 'Configuración',
      },
    },
    Notifications: {
      screen: NotificationsScreen,
    },
    MyProfile: {
      screen: MyProfileScreen,
    },
    EditProfile: {
      screen: EditProfileScreen,
    },
    Wallet: {
      screen: WalletScreen,
    },
    PaymentMethod: {
      screen: PaymentMethodScreen,
    },
    AddCreditCard: {
      screen: AddCreditCardScreen,
    },
    Orders: {
      screen: OrdersScreen,
      navigationOptions: {
        title: "MIS VIAJES",
        // headerLeft: ({navigation}) => (
        //   <Button
        //     iconLeft transparent
        //     onPress={() => navigation.openDrawer()}
        //   >
        //     <FontAwesome
        //         name="navicon"
        //         color={theme.HEADER_MENU_TITLE_COLOR}
        //         size={theme.ICON_SIZE_SMALL}
        //       />
        //   </Button>
        // ),
      },
    },
    TripPreview: {
      screen: TripPreviewScreen,
      navigationOptions: {
        mode: 'modal',
        headerMode: 'none',
        header: null,
      },
    },
    ShowOrder: {
      screen: ShowOrderScreen,
    },
    ChooseLocationOnMap: {
      screen: ChooseLocationScreen,
      navigationOptions: {
        mode: 'modal',
        headerMode: 'none',
        header: null,
      },
    },
  },
  {
    // initialRouteName: 'EditProfile',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
      },
      headerLeft: (
        <Button
          // block
          style={{marginLeft: 20}}
          iconLeft transparent
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome
              name="navicon"
              color={theme.HEADER_MENU_TITLE_COLOR}
              size={theme.ICON_SIZE_SMALL}
            />
        </Button>
      ),
      headerTintColor: theme.HEADER_MENU_TITLE_COLOR,
      headerTitleStyle: {
        fontFamily: theme.FONT_FAMILY_BOLD,
        fontSize: theme.FONT_SIZE_LARGE,
        color: theme.HEADER_MENU_TITLE_COLOR
      }
    }),
  }
);

const AppDrawerNavigator = createDrawerNavigator (
  {
    AppNavigator: { screen: AppStack}
  },
  {
    initialRouteName: 'AppNavigator',
    contentComponent: ({navigation}) => {
      return <MenuDrawer navigation={navigation} />;
    }
  }
);

const AuthStack = createStackNavigator ({
  SignIn: SignInScreen,
  ForgotPassword: ForgotPasswordScreen,
  SignUp: SignUpScreen,
  CheckEmail,
});

export default createAppContainer (
  // createSwitchNavigator (
  createAnimatedSwitchNavigator (
    {
      AuthLoading: AuthLoadingScreen,
      Intro: IntroSlider,
      LocationPermissions: LocationPermissionsScreen,
      App: AppDrawerNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
      transition: (
        <Transition.Together>
          <Transition.Out
            // type="slide-left"
            type="fade" 
            durationMs={500}
            interpolation="easeInOut"
          />
          <Transition.In type="fade" durationMs={500} />
        </Transition.Together>
      ),
    }
  )
);
