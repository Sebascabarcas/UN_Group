import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Platform,
  AsyncStorage,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles.js';
import images from '../../../constants/Images';
import MyText from '../../../components/MyText';
import {
  Input,
  CheckBox,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Icon,
} from 'native-base';
// import {Input, CheckBox, Button, Header} from 'react-native-elements';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import EditProfileButton from '../../../components/EditProfileButton';
import {updateUser} from '../../../services/Session';
import {useSelector, useDispatch} from 'react-redux';

const MyProfileScreen = () => {
  const {navigate} = useNavigation ();
  const [loading, _setLoading] = useState (false);
  const user = useSelector (state => state.session.current_user);
  const dispatch = useDispatch ();

  useEffect (() => {
    // const fetchUserInfo = async () => {
    //   const {user_id: userID, profileImg} = await Storage.get ('Session');
    //   try {
    //     const userInfo = await showUser (userID);
    //     Object.entries (userInfo).map (
    //       ([key, value]) =>
    //         (userInfo[key] = userInfo[key] ? value.toString () : null)
    //     );
    //     _setUser (userInfo);
    //   } catch (error) {
    //     console.log (error);
    //   }
    // };
    // fetchUserInfo ();
    dispatch ({
      type: 'session/SET_STATE',
      payload: {current_user_edition: user},
    });
  }, []);

  _signOutAsync = async () => {
    await AsyncStorage.clear ();
    navigate ('Auth');
  };

  _updateUserAsync = async () => {
    _setLoading (true);
    try {
      const res = await updateUser (user, user.id);
      ToastAndroid.show (
        'Actualización de usuario éxitosa',
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.log (error);
      ToastAndroid.show (
        'Actualización de usuario fallida',
        ToastAndroid.SHORT
      );
    }
    _setLoading (false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImgContainer}>
        <View style={styles.imgView}>
          <Image
            style={styles.profileImg}
            source={
              user.picture
                ? {uri: `${user.picture.uri}`}
                : images['no-profile-photo']
            }
          />
        </View>
        <MyText fontStyle="bold" style={styles.name}>
          {user.firstName} {user.firstLastName}
        </MyText>
        <MyText style={styles.role}> {user.username} </MyText>
      </View>
      <ScrollView style={styles.infoContainer}>
        <MyText color={theme.GRAY_COLOR} style={{margin: 16}}>
          INFORMACIÓN
        </MyText>
        <List style={{backgroundColor: 'white'}}>
          <ListItem style={styles.listItem}>
            <MyText>Nombre</MyText>
            <MyText color={theme.GRAY_COLOR}>{user.firstName}</MyText>
          </ListItem>
          <ListItem style={styles.listItem}>
            <MyText>Apellidos</MyText>
            <MyText color={theme.GRAY_COLOR}>{user.firstLastName}</MyText>
          </ListItem>
          <ListItem style={styles.listItem}>
            <MyText>E-mail</MyText>
            <MyText color={theme.GRAY_COLOR}>{user.email}</MyText>
          </ListItem>
          <ListItem style={styles.listItem}>
            <MyText>Teléfono</MyText>
            <MyText color={theme.GRAY_COLOR}>{user.cellphone_number}</MyText>
          </ListItem>
          <ListItem style={styles.listItem}>
            <MyText>Género</MyText>
            <MyText color={theme.GRAY_COLOR}>
              {user.gender === 'male' ? 'Masculino' : 'Femenino'}
            </MyText>
          </ListItem>
        </List>
      </ScrollView>
      <Button
        danger
        full
        onPress={() => {
          dispatch ({
            type: 'session/DELETE_ACCOUNT',
            payload: {navigate},
          });
          // navigate ('Groups');
        }}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionBottomButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          fontStyle="bold"
          color={theme.HEADER_MENU_TITLE_COLOR}
        >
          ELIMINAR CUENTA
        </MyText>
      </Button>
    </View>
  );
};

MyProfileScreen.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    headerLeft: (
      <Button
        style={{marginLeft: 5}}
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Icon
          type="Ionicons"
          name="ios-arrow-back"
          style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.HEADER_MENU_TITLE_COLOR}}
        />
      </Button>
    ),
    headerRight: <EditProfileButton />,
  };
};

export default MyProfileScreen;
