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
import {Badge, Button} from 'native-base';
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

const MenuDrawer = () => {
  const dispatch = useDispatch()
  const {navigate} = navigationHooks.useNavigation ();
  const {current_user: user, current_group,  myGroups, isSuperAdmin, isRolemodel, isMentor} = useSelector(state => state.session)
  
  _signOutAsync = async () => {
    navigate('Auth')
    dispatch({type: 'session/LOGOUT', payload: {navigate}})
    
  };

  _handleMyGroup = async () => {
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
              <Image style={styles.img} resizeMode="cover" source={user.picture ? {uri: `${user.picture.uri}`} : images["no-profile-photo"]} />
          </TouchableWithoutFeedback>
          <View style={styles.profileText}>
            <MyText style={styles.name}>{user.firstName} {user.firstLastName}</MyText>
            <View style={styles.settingsContainer}>
              <Badge
                white
                style={styles.roleBadge}
              >
                  <MyText style={styles.roleText}>
                    {user.username}
                  </MyText>
              </Badge>
              <Button
              iconLeft
              style={{paddingTop: 2}}
              transparent
              onPress={() => {
                navigate ('MyProfile')
              }}
            >
              <FontAwesome
                style={{alignSelf: 'flex-start', marginLeft: 6, elevation: 4}}
                name="gear"
                color="white"
                size={theme.ICON_SIZE_SMALL}
              />
              </Button>
            </View>
          </View>
        </View>
        {(!isMentor || !isRolemodel) && <View style={styles.otherOptions}>
          {!isMentor && <TouchableOpacity style={styles.otherOptionContainer} onPress={() => navigate ('BeMentor')}>
            <MyText style={styles.otherOptionText}>
              Deseo convertirme en Mentor
            </MyText>
          </TouchableOpacity>
          }
          {!isRolemodel && <TouchableOpacity style={styles.otherOptionContainer} onPress={() => navigate ('BeRoleModel')}>
            <MyText style={styles.otherOptionText}>
              Deseo convertirme en Role Model
            </MyText>
          </TouchableOpacity>}
        </View>}
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
        { isSuperAdmin && navLink (
          'MyUsers',
          // 'Assignment',
          'Mis Usuarios',
          <Entypo
            style={styles.iconLink}
            name="man"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        { isMentor && navLink (
          'Mentoring',
          'Mentorías',
          <FontAwesome
            style={styles.iconLink}
            name="book"
            color={theme.GRAY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
        )}
        {navLink (
          'MyProfile',
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
