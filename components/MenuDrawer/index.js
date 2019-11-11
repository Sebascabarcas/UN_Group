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
import getEnvVars from '../../environment.js';

const { apiUrl } = getEnvVars();
const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;

const MenuDrawer = () => {
  const [isReady, _setReady] = useState (false);
  const dispatch = useDispatch()
  const {navigate} = navigationHooks.useNavigation ();
  const {current_user: user, current_group,  myGroups, isSuperAdmin} = useSelector(state => state.session)
  // console.log(user);
  
  
 /*  useEffect (() => {
    const fetchUserInfo = async () => {
      const sessionInfo = await Storage.get ('Session');
      if (!sessionInfo) return null
      try {
        // const userInfo = await showUser (userID);
        // Object.entries (userInfo).map (
        //   ([key, value]) =>
        //     (userInfo[key] = userInfo[key] ? value.toString () : null)
        // );
        dispatch({type: 'session/SET_STATE', payload: {current_user: sessionInfo.user}});
        _setReady (true);
      } catch (error) {
        console.log (error);
      }
    };
    // setTimeout(() => {
    fetchUserInfo ();
    // }, 10000);
  }, []); */

  _signOutAsync = async () => {
    // await logout();
    navigate('Auth')
    dispatch({type: 'session/LOGOUT', payload: {navigate}})
    
  };

  _handleMyGroup = async () => {
    // await logout();
    navigate('MyGroup')
    dispatch({type: 'groups/SET_STATE', payload: {current_group}})
    
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
      case 'MyGroup':
        return (
          <TouchableOpacity style={styles.linkContainer} onPress={_handleMyGroup}>
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
              <Image style={styles.img} resizeMode="cover" source={user.picture ? {uri: `${user.picture.uri}`} : images["no-profile-photo"]} />
            {/* </View> */}
          </TouchableWithoutFeedback>
          <View style={styles.profileText}>
            <MyText style={styles.name}>{user.firstName} {user.lastName}</MyText>
            <View style={styles.settingsContainer}>
              <Badge
                white
                style={styles.roleBadge}
              >
                  {/* <AntDesign
                    name=""
                    color={theme.PRIMARY_COLOR}
                    size={theme.ICON_SIZE_SUPER_EXTRA_SMALL}
                  /> */}
                  <MyText style={styles.roleText}>
                    {user.username}
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
        { myGroups.length > 0 && navLink (
          'MyGroup',
          'Mi Grupo',
          <Entypo
            style={styles.iconLink}
            name="users"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />,
          {user}
        )}
        { !isSuperAdmin && navLink (
          'MyInvitations',
          'Mis Invitaciones',
          <MaterialIcons
            style={styles.iconLink}
            name="mail"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {navLink (
          'Wallet',
          // 'Assignment',
          'Mis Usuarios',
          <Entypo
            style={styles.iconLink}
            name="wallet"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {/* {navLink (
          // 'Wallet',
          'Assignment',
          'Enviar PQR',
          <Ionicons
            style={styles.iconLink}
            name="md-notifications"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )} */}
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
