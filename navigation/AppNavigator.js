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
import MainTabNavigator from './MainTabNavigator';

import { Transition } from 'react-native-reanimated';
import theme from '../styles/theme.style'
import MyText from '../components/MyText';
import {Button, Icon} from 'native-base';
// Loading Screen
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
// Drawer
import MenuDrawer from '../components/MenuDrawer';
// Auth
import SignInScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgetScreen';
import CheckEmail from '../screens/Auth/CheckEmail';
// Profile
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
// Tasks
import MyTasks from '../screens/MyGroup/MyTasks';
import MyTask from '../screens/MyGroup/MyTask';
import CreateTask from '../screens/MyGroup/CreateTask';
import ShowTasks from '../screens/MyGroup/ShowTasks';
import ShowTask from '../screens/MyGroup/ShowTask';
import EditTask from '../screens/MyGroup/EditTask';
// Groups
import SelectGroupModal from '../screens/SelectGroupModal';
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';
import ShowGroupScreen from '../screens/Groups/ShowGroupScreen';
import GroupMembers from '../screens/Groups/GroupMembers';
// MyGroup
import GroupProfile from '../screens/MyGroup/GroupProfile';
import EditGroup from '../screens/MyGroup/EditGroup';
// Members
import Member from '../screens/MyGroup/Member';
import Members from '../screens/MyGroup/Members';
import AddMember from '../screens/MyGroup/AddMember';
// Events
import CreateEvent from '../screens/MyGroup/Events/CreateEvent';
import ShowEvent from '../screens/Events/ShowEvent';
import AddAdress from '../screens/Events/AddAdress';
import TypeOfRoad from '../screens/Events/TypeOfRoad';
import AddLocation from '../screens/Events/AddLocation';
import Invitations from '../screens/Invitations';
import MyUsers from '../screens/MyUsers';
import Events from '../screens/MyGroup/Events/Events';
import Solicitudes from '../screens/MyGroup/Solicitudes';
import EditEvent from '../screens/MyGroup/Events/EditEvent';
import Atendees from '../screens/MyGroup/Atendees';
import RoleModels from '../screens/MyGroup/RoleModels';
// Posts
import ShowPost from '../screens/MyGroup/ShowPost';
import EditPost from '../screens/MyGroup/EditPost';
import CreatePost from '../screens/MyGroup/CreatePost';
// RoleModel
import ShowRoleModel from '../screens/MyGroup/ShowRoleModel';
import BeRoleModel from '../screens/BeRoleModel';
import BeMentor from '../screens/BeMentor';
// Mentor
import Mentoring from '../screens/Mentoring';
import GroupMentoring from '../screens/MyGroup/GroupMentoring';
import ShowMentorActivity from '../screens/MyGroup/ShowMentorActivity';
import ShowMentor from '../screens/MyGroup/ShowMentor';
import CreateAvailability from '../screens/CreateAvailability';
import CreateActivity from '../screens/CreateActivity';
import ShowActivity from '../screens/ShowActivity';
import EditActivity from '../screens/EditActivity';
import SearchActivity from '../screens/MyGroup/SearchActivity';
import WeekDay from '../screens/WeekDay';
import { Modal, View } from 'react-native';
import LoadingModal from '../components/LoadingModal';
import ConfirmModal from '../components/ConfirmModal';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const defaultStackConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: theme.PRIMARY_COLOR,
    },
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
            style={{marginLeft: 5}}
            transparent
            onPress={() => navigation.goBack ()}
          >
            <Icon
              type="Ionicons"
              name="ios-arrow-back"
              style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
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
    },
    EditGroup: {
      screen: EditGroup,
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
      screen: Members,
      navigationOptions: {
        header: null
      },

    },
    AddMember: {
      screen: AddMember,
      navigationOptions: {
        header: null
      },
    },
    Member: {
      screen: Member,
      navigationOptions: {
        header: null
      }
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
    ShowEvent: {
      screen: ShowEvent,
      navigationOptions: {
        header: null
      },
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
            style={{marginLeft: 5}}
            transparent
            onPress={() => navigation.goBack ()}
          >
            <Icon
              type="Ionicons"
              name="ios-arrow-back"
              style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
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
            style={{marginLeft: 5}}
            transparent
            onPress={() => navigation.goBack ()}
          >
            <Icon
              type="Ionicons"
              name="ios-arrow-back"
              style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
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
    SelectGroup: {
      screen: SelectGroupModal,
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
  createAnimatedSwitchNavigator (
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppDrawerNavigator,
    },
    {
      transition: (
        <Transition.Together>
          <Transition.Out
            // type="slide-left"
            type="fade" 
            durationMs={500}
            interpolation="easeInOut"
          />
          <ConfirmModal/>
          <LoadingModal/>
          <Transition.In type="fade" durationMs={500} />
        </Transition.Together>
      ),
    }
  )
);
