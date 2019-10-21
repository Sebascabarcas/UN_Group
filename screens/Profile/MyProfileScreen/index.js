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
import * as navigationHooks from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles.js';
import images from '../../../constants/Images';
import MyText from '../../../components/MyText';
import {Input, CheckBox, Button, List, ListItem, Left, Right} from 'native-base';
import Storage from '../../../services/Storage';
// import {Input, CheckBox, Button, Header} from 'react-native-elements';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import EditButton from '../../../components/EditProfile';
import {USER_FACING_NOTIFICATIONS} from 'expo-permissions';
import {watchPositionAsync} from 'expo-location';
import {updateUser} from '../../../services/Session';
import {showUser} from '../../../services/Session';
import {useSelector, useDispatch} from 'react-redux';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const MyProfileScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const user = useSelector(state => state.session.current_user)
  const dispatch = useDispatch();

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
    dispatch({type: 'session/SET_STATE', payload: {current_user_edition: user}})
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
        <Image style={styles.profileImg} source={images[user.identification]} />
        <MyText fontStyle="bold" style={styles.name}>{user.name} {user.last_name}</MyText>
        <MyText style={styles.role}> Grupo </MyText>
      </View>
    <ScrollView style={styles.infoContainer}>
          <MyText color={theme.GRAY_COLOR} style={{margin: 16}}>INFORMACIÓN</MyText>
          <List style={{backgroundColor: 'white'}}>
            <ListItem style={styles.listItem}>
              <MyText>Nombre</MyText>
              <MyText color={theme.GRAY_COLOR}>{user.name}</MyText>
            </ListItem>
            <ListItem style={styles.listItem}>
              <MyText>Apellidos</MyText>
              <MyText color={theme.GRAY_COLOR}>{user.last_name}</MyText>
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
              <MyText color={theme.GRAY_COLOR}>{user.gender === 'male' ? 'Masculino' : 'Femenino' }</MyText>
            </ListItem>
          </List>
    </ScrollView>
    </View>
  );
};

MyProfileScreen.navigationOptions = ({navigation}) => {
  
  return {
    // title: '',
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft transparent
        onPress={() => navigation.goBack()}
      >
        <FontAwesome
            name="arrow-left"
            color={theme.HEADER_MENU_TITLE_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
      </Button>
    ),
    headerRight: (
      <EditProfileButton/>
    )
  }
}

export default MyProfileScreen;
