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
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MainTabNavigator from './MainTabNavigator';

import { Transition } from 'react-native-reanimated';
import theme from '../styles/theme.style'
import MyText from '../components/MyText';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
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
// Intro
import IntroSlider from '../screens/Intro/IntroSlider';
// LocationPermissions
import LocationPermissionsScreen from '../screens/LocationPermissionScreen';
// App 
import TripPreviewScreen from '../screens/TripPreviewScreen';
import ChooseLocationScreen from '../screens/ChooseLocationScreen';
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
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';
import ShowGroupScreen from '../screens/Groups/ShowGroupScreen';
import GroupMembers from '../screens/Groups/GroupMembers';
import GroupTabNavigator from './GroupTabNavigator';
import SelectGroupModal from '../screens/SelectGroupModal';
import Member from '../screens/MyGroup/Member';
import CreateEvent from '../screens/MyGroup/Events/CreateEvent';
import EditGroup from '../screens/MyGroup/EditGroup';
import ShowEvent from '../screens/Events/ShowEvent';
import Invitations from '../screens/Invitations';
import AddMember from '../screens/MyGroup/AddMember';
import AddAdress from '../screens/Events/AddAdress';
import TypeOfRoad from '../screens/Events/TypeOfRoad';
import AddLocation from '../screens/Events/AddLocation';
import GroupProfile from '../screens/MyGroup/GroupProfile';
import Members from '../screens/MyGroup/Members';
import Events from '../screens/MyGroup/Events/Events';
import Solicitudes from '../screens/MyGroup/Solicitudes';
import CreateTask from '../screens/MyGroup/CreateTask';
import ShowTasks from '../screens/MyGroup/ShowTasks';
import ShowTask from '../screens/MyGroup/ShowTask';
import EditTask from '../screens/MyGroup/EditTask';
import EditEvent from '../screens/MyGroup/Events/EditEvent';
import MyTasks from '../screens/MyGroup/MyTasks';
import MyTask from '../screens/MyGroup/MyTask';
import Atendees from '../screens/MyGroup/Atendees';
import MyUsers from '../screens/MyUsers';
import RoleModels from '../screens/MyGroup/RoleModels';
import CreatePost from '../screens/MyGroup/CreatePost';
import ShowPost from '../screens/MyGroup/ShowPost';
import ShowRoleModel from '../screens/MyGroup/ShowRoleModel';
import BeRoleModel from '../screens/BeRoleModel';
import BeMentor from '../screens/BeMentor';
import EditPost from '../screens/MyGroup/EditPost';
import Mentoring from '../screens/Mentoring';
import CreateActivity from '../screens/CreateActivity';
import ShowActivity from '../screens/ShowActivity';
import CreateAvailability from '../screens/CreateAvailability';
import WeekDay from '../screens/WeekDay';
import EditActivity from '../screens/EditActivity';
import GroupMentoring from '../screens/MyGroup/GroupMentoring';
import SearchActivity from '../screens/MyGroup/SearchActivity';
import ShowMentorActivity from '../screens/MyGroup/ShowMentorActivity';
import ShowMentor from '../screens/MyGroup/ShowMentor';

// import { Divider, Button } from 'react-native-elements';

// import AssigmentScreen from '../screens/AssigmentScreen/AssigmentScreen';
// import QualificationScreen from '../screens/QualificationScreen/QualificationScreen';
// import TripScreen from '../screens/TripScreen/TripScreen';
// import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const defaultStackConfig = {
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

const AppStack = createStackNavigator(
  {
    // Home: {
    //   screen: HomeScreen,
    //   navigationOptions: {
    //     title: 'W STEM',
    //     headerTransparent: true,
    //     headerStyle: {
    //       backgroundColor: 'transparent',
    //     },
    //   },
    // },
    Home: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null
      },
    },
    Mentoring: {
      screen: Mentoring,
      navigationOptions: {
        header: null
      },
    },
    ShowActivity: {
      screen: ShowActivity,
      navigationOptions: {
        header: null
      },
    },
    CreateActivity: {
      screen: CreateActivity,
      navigationOptions: {
        header: null
      },
    },
    EditActivity: {
      screen: EditActivity,
      navigationOptions: {
        header: null
      },
    },
    CreateAvailability: {
      screen: CreateAvailability,
      navigationOptions: {
        header: null
      },
    },
    SelectWeekDay: {
      screen: WeekDay,
      navigationOptions: ({navigation}) => ({
        title: 'SELECCIONE EL DÍA DE SEMANA',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeft: (
          <Button
            // block
            style={{marginLeft: 20}}
            iconLeft transparent
            onPress={() => navigation.goBack()}
          >
            <Ionicons
                name="ios-arrow-back"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
          </Button>
        ),
        headerTitleStyle: {
          fontFamily: theme.FONT_FAMILY_SEMIBOLD,
          fontSize: theme.FONT_SIZE_MEDIUM,
          color: theme.DARK_COLOR
        }
      })
    },
    CreateGroup: {
      screen: CreateGroupScreen,
      navigationOptions: {
        title: 'Nuevo Grupo',
      },
    },
    ShowGroup: {
      screen: ShowGroupScreen,
      // navigationOptions: {
      //   header: null
      // },
    },
    ShowEvent: {
      screen: ShowEvent,
      navigationOptions: {
        header: null
      },
    },
    EditGroup: {
      screen: EditGroup,
      // navigationOptions: {
      //   header: null
      // },
    },
    GroupMembers: {
      screen: GroupMembers,
      navigationOptions: {
        header: null
      },
    },
    BeRoleModel: {
      screen: BeRoleModel
    },
    BeMentor: {
      screen: BeMentor
    },
    Notifications: {
      screen: NotificationsScreen,
    },
    MyProfile: {
      screen: MyProfileScreen,
    },
    MyUsers: {
      screen: MyUsers,
      navigationOptions: {
        header: null
      },
    },
    MyInvitations: {
      screen: Invitations,
      navigationOptions: {
        header: null
      },
    },
    MyGroup: {
      screen: GroupProfile,
    },
    MyMembers: {
      screen: Members
    },
    AddMember: {
      screen: AddMember,
      navigationOptions: {
        header: null
      },
    },
    Member: {
      screen: Member,
      navigationOptions: ({navigation}) => ({
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeft: (
          <Button
            // block
            style={{marginLeft: 20}}
            iconLeft transparent
            onPress={() => navigation.goBack()}
          >
            <FontAwesome
                name="arrow-left"
                color="white"
                size={theme.ICON_SIZE_SMALL}
              />
          </Button>
        )
      })
    },
    MySolicitudes: {
      screen: Solicitudes
    },
    GroupMentoring: {
      screen: GroupMentoring,
      navigationOptions: {
        header: null
      }
    },
    SearchActivity: {
      screen: SearchActivity,
      navigationOptions: {
        header: null
      }
    },
    ShowMentor: {
      screen: ShowMentor,
      navigationOptions: {
        header: null
      }
    },
    ShowMentorActivity: {
      screen: ShowMentorActivity,
      navigationOptions: {
        header: null
      }
    },
    MyEvents: {
      screen: Events
    },
    Atendees: {
      screen: Atendees,
      navigationOptions: {
        header: null
      }
    },
    EditEvent: {
      screen: EditEvent,
      navigationOptions: {
        header: null
      }
    },
    CreateEvent: {
      screen: CreateEvent,
      navigationOptions: {
        header: null
      }
    },
    AddAdress: {
      screen: AddAdress,
      navigationOptions: ({navigation}) => ({
        title: 'AGREGAR DIRECCIÓN',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeft: (
          <Button
            // block
            style={{marginLeft: 20}}
            iconLeft transparent
            onPress={() => navigation.goBack()}
          >
            <Ionicons
                name="ios-arrow-back"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
          </Button>
        ),
        headerTitleStyle: {
          fontFamily: theme.FONT_FAMILY_SEMIBOLD,
          fontSize: theme.FONT_SIZE_MEDIUM,
          color: theme.DARK_COLOR
        }
      })
    },
    SelectTypeOfRoad: {
      screen: TypeOfRoad,
      navigationOptions: ({navigation}) => ({
        title: 'SELECCIONE TIPO DE VÍA',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeft: (
          <Button
            // block
            style={{marginLeft: 20}}
            iconLeft transparent
            onPress={() => navigation.goBack()}
          >
            <Ionicons
                name="ios-arrow-back"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
          </Button>
        ),
        headerTitleStyle: {
          fontFamily: theme.FONT_FAMILY_SEMIBOLD,
          fontSize: theme.FONT_SIZE_MEDIUM,
          color: theme.DARK_COLOR
        }
      })
    },
    AddLocation: {
      screen: AddLocation,
      // navigationOptions: {
      //   header: null
      // }
    },
    MyTasks: {
      screen: MyTasks,
      navigationOptions: {
        header: null
      }
    },
    MyTask: {
      screen: MyTask,
      navigationOptions: {
        header: null
      }
    },
    CreateTask: {
      screen: CreateTask,
      navigationOptions: {
        header: null
      }
    },
    EditTask: {
      screen: EditTask,
      navigationOptions: {
        header: null
      }
    },
    ShowTasks: {
      screen: ShowTasks,
      navigationOptions: {
        header: null
      }
    },
    ShowTask: {
      screen: ShowTask,
      navigationOptions: {
        header: null
      }
    },
    RoleModels: {
      screen: RoleModels,
      navigationOptions: {
        header: null
      }
    },
    CreatePost: {
      screen: CreatePost,
      navigationOptions: {
        header: null
      }
    },
    EditPost: {
      screen: EditPost,
      navigationOptions: {
        header: null
      }
    },
    ShowPost: {
      screen: ShowPost,
      navigationOptions: {
        header: null
      }
    },
    ShowRoleModel: {
      screen: ShowRoleModel,
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
    SelectGroup: {
      screen: SelectGroupModal,
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
  defaultStackConfig
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
      Auth: AuthStack,
      App: AppDrawerNavigator,
      Intro: IntroSlider,
      LocationPermissions: LocationPermissionsScreen,
    },
    {
      // initialRouteName: 'AuthLoading',
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
