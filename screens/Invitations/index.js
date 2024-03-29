import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Modal,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../styles/theme.style';
import styles from './styles';
import {Button, Input, Item, Label, Icon} from 'native-base';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import getEnvVars from '../../environment';
import moment from 'moment';
import BigListItem from '../../components/BigListItem';
import MyText from '../../components/MyText';

const {height: fullHeight} = Dimensions.get ('window');
const {apiUrl} = getEnvVars();

const Invitations = () => {
  const {navigate, goBack} = useNavigation ();
  // const {new_group: group} = useSelector (state => state.groups);
  const {myInvitations: invitations, current_user: user} = useSelector (state => state.session);
  const dispatch = useDispatch ();

  useEffect (
    () => {
      // flatList.current.scrollToOffset ({animated: true, offset: 0});
      dispatch({
        type: 'session/GET_USER_INVITATIONS',
        payload: {id: user.id}
      })
    },
    [dispatch]
  );

  _onPressInvitation = (invitationId, event, index) => {
    dispatch({
      type: 'events/SET_STATE',
      payload: {
        current_event: event
      }
    })
    navigate('ShowEvent', {invitationId, index})
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.groupInfoContainer}>
            <Image
              resizeMode="cover"
              style={styles.imageGroup}
              source={
                user.picture ? {uri: `${apiUrl}${user.picture.pictureName}`} : images['no-profile-photo']
              }
            />
            <View>
              <MyText style={{color: 'white'}} fontStyle="bold">{user.firstName} {user.firstLastname}</MyText>
              <MyText style={{color: 'white'}} fontStyle="semibold">Mis Invitaciones</MyText>
            </View>
          </View>
          <View>
            <Button onPress={() => goBack ()} light rounded>
                <Icon
                  type="AntDesign"
                  name="arrowup"
                  color="#000"
                  size={theme.ICON_SIZE_SMALL}
                />
            </Button>
          </View>
        </View>
      </View>
      {
        invitations.map(({id, event, event: { group: {groupName, groupPicture}, eventName}}, i) => (
          <BigListItem 
            key={id}
            onPress={() => _onPressInvitation(id, event, i)}
            touchContainerStyles={{marginVertical: 5}}
            listContainerStyles={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#EFEFF4',
              elevation: 1,
            }}
            leftItem={
                <Image
                  resizeMode="cover"
                  style={styles.imageGroup}
                  source={
                    groupPicture ? {uri: `${apiUrl}${groupPicture.pictureName}`} : images['logo']
                  }
                />
            }
            primaryText={eventName}
            primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
            secondaryText={groupName}
            rightItem={
              <Button large style={{ backgroundColor: '#7DC623', borderRadius: 50, padding: 20}}>
                <AntDesign
                  color="white"
                  size={theme.ICON_SIZE_MEDIUM}
                  active
                  name="eye"
                />
              </Button>
            }
          />
        )
      )
      }
    </View>
  );
};

Invitations.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Icon
          type="FontAwesome"
          name="arrow-left"
          color={theme.HEADER_MENU_TITLE_COLOR}
          size={theme.ICON_SIZE_SMALL}
        />
      </Button>
    ),
  };
};

export default Invitations;
