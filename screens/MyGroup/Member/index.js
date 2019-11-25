import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {Button, Switch, Icon, Container} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
// import {NavigationAction} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import MyText from '../../../components/MyText';
import Images from '../../../constants/Images';
import styles from './styles';
import theme from '../../../styles/theme.style';

const HeaderComponent = ({group, bottomSheet, isSuperAdmin, navigate, goBack}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View>
          <Button
            style={{marginLeft: 5}}
            transparent
            onPress={() => goBack ()}
          >
            <Icon
              type="Ionicons"
              name="ios-arrow-back"
              style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
            />
          </Button>
        </View>
        <View style={styles.groupInfoContainer}>
          <Image
            resizeMode="cover"
            style={styles.imageGroup}
            source={
              group.groupPicture
                ? {uri: `${group.groupPicture.uri}`}
                : Images['logo']
            }
          />
          <View>
            <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
              Grupo
            </MyText>
            <MyText
              style={{color: 'white'}}
              fontStyle="semibold"
            >
              {group.groupName}
            </MyText>
          </View>
        </View>
        {isSuperAdmin && <View>
        <Button
            // block
            style={{marginRight: 5}}
            transparent
            onPress={() => {
              bottomSheet.current.open ();
            }}
          >
            <Icon
              type="SimpleLineIcons"
              name="options-vertical"
              style={{color: theme.PRIMARY_COLOR, fontSize: theme.ICON_SIZE_SMALL}}
            />
          </Button>
        </View>}
      </View>
    </View>
  );
};

const Member = () => {
  console.log ('MyGroup/Member:');
  const _RBSheetRef = useRef (null);
  const {
    current_group: group,
    current_group: {id: groupId},
    current_user: {id: current_user_id},
    isSuperAdmin,
  } = useSelector (state => state.session);
  const {
    current_group_member: {user, isAdmin, id: relationId},
    more_pages,
    loading,
    refreshing,
  } = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, goBack} = useNavigation ();

  /*   useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  ); */
  const handleDeleteMember = () => {
    dispatch ({
      type: 'groups/DELETE_GROUP_MEMBER',
      payload: {id: groupId, relationId, userID: user.id, goBack, navigate},
    });
  }

  const BottomSheetComponent = () => (
    <View>
      <View style={{alignItems: 'center'}}>
        <MyText fontStyle="bold">Acciones</MyText>
      </View>
      <View
        style={{...styles.containerBottomAction, ...{flexDirection: 'row'}}}
      >
        <MyText>Admin</MyText>
        <Switch
          onChange={() =>
            dispatch ({
              type: isAdmin
                ? 'groups/REDUCE_PRIVILEGES'
                : 'groups/INCREASE_PRIVILEGES',
              payload: {id: groupId, userID: user.id},
            })}
          value={isAdmin}
        />
      </View>
      <View style={styles.containerBottomAction}>
        <Button
          onPress={() => {
            dispatch ({
              type: 'modals/SET_STATE',
              payload: {confirmModalVisible: true, handleOnConfirm: handleDeleteMember},
            });
          }}
          full
        >
          <MyText>
            {current_user_id === user.id
              ? 'Dejar el grupo'
              : 'Eliminar del Grupo'}
          </MyText>
        </Button>
      </View>

    </View>
  );

  return (
    <Container container={styles.container}>
      <HeaderComponent isSuperAdmin={isSuperAdmin} bottomSheet={_RBSheetRef} group={group} navigate={navigate} goBack={goBack}/>
      <View style={styles.content}>
        <View style={styles.containerProfileImg}>
          <Image
            style={styles.profileImg}
            resizeMode="cover"
            source={
              user.picture
                ? {uri: `${user.picture.uri}`}
                : images['no-profile-photo']
            }
          />
          <MyText fontStyle="bold" style={styles.memberName}>
            {user.firstName} {user.firstLastName}
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
          <View style={[styles.secondaryInfo, styles.secondaryInfoEmail]}>
            <MyText fontStyle="semibold" style={styles.secondaryInfoTitle}>
              Correo
            </MyText>
            <MyText fontStyle="bold" style={styles.secondaryInfoText}>
              {user.email}
            </MyText>
          </View>
        </View>
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
          <BottomSheetComponent />
        </RBSheet>
      </View>
    </Container>
  )
}
export default Member;
