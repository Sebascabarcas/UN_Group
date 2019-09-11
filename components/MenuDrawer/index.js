import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Platform,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Paragraph} from 'rn-placeholder';
import * as navigationHooks from 'react-navigation-hooks';
import styles from './styles.js';
import MyText from '../MyText';
import {showUser, logout} from '../../services/Session';
import Storage from '../../services/Storage';
import {Badge} from 'native-base';
import {
  AntDesign,
  FontAwesome,
  Entypo,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import theme from '../../styles/theme.style';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;

const MenuDrawer = () => {
  const [isReady, _setReady] = useState (false);
  const dispatch = useDispatch()
  const {navigate} = navigationHooks.useNavigation ();
  const user = useSelector(state => state.session.current_user)
  useEffect (() => {
    const fetchUserInfo = async () => {
      const {user_id: userID, profileImg} = await Storage.get ('Session');
      try {
        const userInfo = await showUser (userID);
        Object.entries (userInfo).map (
          ([key, value]) =>
            (userInfo[key] = userInfo[key] ? value.toString () : null)
        );
        dispatch({type: 'session/SET_STATE', payload: {current_user: userInfo}})
        _setReady (true);
      } catch (error) {
        console.log (error);
      }
    };
    // setTimeout(() => {
    fetchUserInfo ();
    // }, 10000);
  }, []);

  _signOutAsync = async () => {
    // await logout();
    dispatch({type: 'session/LOGOUT', payload: {navigate}})
    
  };

  navLink = (nav, text, icon, options = {}) => {
    switch (nav) {
      case 'Log Out':
        return (
          <TouchableOpacity style={styles.linkContainer} onPress={_signOutAsync}>
            {icon}
            <MyText fontStyle="regular" style={styles.link}>
              {text}
            </MyText>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity
            style={styles.linkContainer} 
            onPress={() => navigate (nav, options)}
          >
              {icon}
            <MyText fontStyle="regular" style={styles.link}>
              {text}
            </MyText>
          </TouchableOpacity>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLinks}>
        <View style={styles.profile}>
          <TouchableWithoutFeedback style={styles.imgView} onPress={() => navigate ('MyProfile')}>
            {/* <View style={styles.imgView}> */}
              <Image style={styles.img} source={images[user.identification]} />
            {/* </View> */}
          </TouchableWithoutFeedback>
          <View style={styles.profileText}>
            <MyText style={styles.name}>{user.name} {user.last_name}</MyText>
            <View style={styles.settingsContainer}>
              <Badge
                white
                style={styles.roleBadge}
              >
                  <AntDesign
                    name="star"
                    color={theme.PRIMARY_COLOR}
                    size={theme.ICON_SIZE_SUPER_EXTRA_SMALL}
                  />
                  <MyText style={styles.roleText}>
                    Funcionario
                  </MyText>
              </Badge>
              <FontAwesome
                style={{alignSelf: 'flex-end', marginLeft: 6, elevation: 4}}
                name="gear"
                color="white"
                size={theme.ICON_SIZE_SMALL}
              />
            </View>
            {/* <MyText >{user.email}</MyText> */}
          </View>
        </View>
      </View>
      <View style={styles.bottomLinks}>
        {navLink (
          'Home',
          'Inicio',
          <Entypo
            style={styles.iconLink}
            name="home"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {navLink (
          'MyProfile',
          'Mi Perfil',
          <Entypo
            style={styles.iconLink}
            name="wallet"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />,
          {user}
        )}
        {navLink (
          'Orders',
          'Mis Viajes',
          <MaterialIcons
            style={styles.iconLink}
            name="update"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {navLink (
          'Wallet',
          // 'Assignment',
          'Mi Billetera',
          <Entypo
            style={styles.iconLink}
            name="wallet"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {navLink (
          // 'Wallet',
          'Assignment',
          'Enviar PQR',
          <Ionicons
            style={styles.iconLink}
            name="md-notifications"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {navLink (
          'Configuration',
          'Opciones',
          <FontAwesome
            style={styles.iconLink}
            name="gear"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {navLink (
          'Log Out',
          'Cerrar Sesión',
          <Entypo
            style={styles.iconLink}
            name="log-out"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
      </View>
    </View>
  );
};

export default MenuDrawer;
