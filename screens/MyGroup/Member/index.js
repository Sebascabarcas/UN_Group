import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {Button, Switch} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
// import {NavigationAction} from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
import Images from '../../../constants/Images';
import styles from './styles';

const {apiUrl} = getEnvVars ();
const {height: fullHeight} = Dimensions.get ('window');

const Member = () => {
  console.log ('MyGroup/Member:');
  const _RBSheetRef = useRef (null);
  const {current_group: {id: groupId}, current_user: {id: current_user_id}, isSuperAdmin} = useSelector (state => state.session);
  const {
    current_group_member: {user, isAdmin, index},
    more_pages,
    loading,
    refreshing,
  } = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, goBack, reset, dispatch: dispatchNavigation, getParam} = useNavigation ();

  /*   useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  ); */
  const resetNavigationStack = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });

  const BottomSheetComponent = () => (
    <View>
      <View style={{alignItems: 'center'}}>
        <MyText fontStyle="bold">Acciones</MyText>
      </View>
      { isSuperAdmin &&
        <View
          style={{...styles.containerBottomAction, ...{flexDirection: 'row'}}}
        >
          <MyText>Admin</MyText>
          <Switch onChange={() => 
              dispatch({
                type: isAdmin ? 'groups/REDUCE_PRIVILEGES' : 'groups/INCREASE_PRIVILEGES',
                payload: {id: groupId, userID: user.id, index}
              })} 
              value={isAdmin} 
              />
        </View>
      }
        <View style={styles.containerBottomAction}>
          <Button
            onPress={() => {
              current_user_id === user.id ? 
              dispatch({
                type: 'groups/LEAVE_GROUP',
                payload: {id: groupId, navigate, resetNavigationStack, dispatchNavigation}
              })
              :
              dispatch({
                type: 'groups/DELETE_GROUP_MEMBER',
                payload: {id: groupId, index, userID: user.id, goBack}
              })
            }}
            full
          >
            <MyText>{current_user_id === user.id ? "Dejar el grupo" : "Eliminar del Grupo"}</MyText>
          </Button>
        </View>
      
    </View>
  );


  return (
    <ImageBackground source={Images['abstractgradient4']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.containerProfileImg}>
          <Image
            style={styles.profileImg}
            resizeMode="cover"
            source={
              user.picture
                ? {uri: `${apiUrl}${user.picture.uri}`}
                : images['no-profile-photo']
            }
          />
          <MyText fontStyle="bold" style={styles.memberName}>
            {user.firstName} {user.lastName}
          </MyText>
        </View>
        <View style={styles.containerUsername}>
          <MyText fontStyle="bold" style={styles.usernameText}>
            {user.username}{' '}
          </MyText>
          <MyText fontStyle="semibold" style={styles.secondaryInfoTitle}>
            Usuario
          </MyText>
        </View>
        <View style={styles.containerSecondaryInfo}>
          <View style={styles.secondaryInfo}>
            <MyText fontStyle="semibold" style={styles.secondaryInfoTitle}>
              Género
            </MyText>
            <MyText fontStyle="bold" style={styles.secondaryInfoText}>
              {user.gender === 'male' ? 'Masculino' : 'Femenino'}
            </MyText>
          </View>
          <View style={styles.secondaryInfo}>
            <MyText fontStyle="semibold" style={styles.secondaryInfoTitle}>
              Correo
            </MyText>
            <MyText fontStyle="bold" style={styles.secondaryInfoText}>
              {user.email}
            </MyText>
          </View>
        </View>
        <Button
          onPress={() => {
            _RBSheetRef.current.open ();
          }}
        >
          <MyText>Acciones</MyText>
        </Button>
        <RBSheet
          ref={_RBSheetRef}
          height={150}
          duration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              // justifyContent: "center",
            },
          }}
        >
          <BottomSheetComponent/>
        </RBSheet>
      </View>
    </ImageBackground>
  );
};

Member.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    // header: null,
    // headerLeft: (
    //   <Button
    //     // block
    //     style={{marginLeft: 20}}
    //     iconLeft
    //     transparent
    //     onPress={() => navigation.goBack ()}
    //   >
    //     <FontAwesome
    //       name="arrow-left"
    //       color={theme.HEADER_MENU_TITLE_COLOR}
    //       size={theme.ICON_SIZE_SMALL}
    //     />
    //   </Button>
    // ),
  };
};

export default Member;
