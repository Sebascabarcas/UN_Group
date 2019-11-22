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
import theme from '../../../styles/theme.style';
import styles from './styles';
import images from '../../../constants/Images';
import MyText from '../../../components/MyText';
import {Button, Input, Item, Label, Icon, Content} from 'native-base';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import moment from 'moment';
import BigIconItem from '../../../components/BigIconItem';
import { FloatingAction } from 'react-native-floating-action';

const {height: fullHeight} = Dimensions.get ('window');

const ShowEvent = () => {
  const {navigate, replace, goBack, getParam} = useNavigation ();
  // const {new_group: group} = useSelector (state => state.groups);
  const {current_user: {id: userId}, isAdmin} = useSelector (state => state.session);
  const {current_group: group} = useSelector (state => state.groups);
  const {current_event: event} = useSelector (state => state.events);
  const dispatch = useDispatch ();
  const invitationId = getParam('invitationId')
  const isGroupEvent = getParam('isGroupEvent')

  // useEffect(() => {
  //   dispatch({
  //     type: "events/GET_EVENT",
  //     payload: {id: event.id}
  //   })
  // }, [dispatch])

  const handleAcceptEvent = () => {
    dispatch({
      type: "session/ACCEPT_EVENT_INVITATION",
      payload: {id: invitationId, eventId: event.id, navigate}
    })
  }

  const handleCancelEvent = () => {
    dispatch({
      type: "session/ACCEPT_EVENT_INVITATION",
      payload: {id: invitationId, eventId: event.id}
    })
  }

  const handleOnPressEdit = () => {
    dispatch({
      type: 'events/SET_STATE',
      payload: {editing_event: {...event,  date: moment (event.date).format ('YYYY-MM-DD'), time: moment (event.date).format ('hh:mm A')}}
    })
    navigate('EditEvent')
  }

  const handleOnPressDelete = () => {
    dispatch({
      type: 'events/DELETE_EVENT',
      payload: {eventId: event.id, navigate}
    })
  }

  const actions = [
    {
      name: 'Delete button',
      render: () => 
      <Button key="deleting" transparent onPress={handleOnPressDelete}>
        <MaterialCommunityIcons name="delete-circle" color={theme.DANGER_COLOR} size={theme.ICON_SIZE_MEDIUM} />
      </Button>
    },
    {
      name: 'Edit button',
      render: () => 
      <Button key="edit" transparent onPress={handleOnPressEdit}>
        <MaterialCommunityIcons name="circle-edit-outline" color={theme.WARNING_COLOR} size={theme.ICON_SIZE_MEDIUM} />  
      </Button>
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.groupInfoContainer}>
            <Image
              resizeMode="cover"
              style={styles.imageGroup}
              source={
                group.groupPicture ? {uri: `${group.groupPicture.uri}`} : images['logo']
              }
            />
            <View>
              <MyText style={{color: 'white'}} fontStyle="bold">{group.groupName}</MyText>
              <MyText style={{color: 'white'}} fontStyle="semibold">Evento</MyText>
            </View>
          </View>
          <View>
            {/* <Button onPress={() => replace ('MyEvents')} light rounded> */}
            <Button onPress={() => goBack()} light rounded>
                <Icon
                  type="AntDesign"
                  name="arrowup"
                  fontSize={theme.ICON_SIZE_SMALL}
                  style={{color: '#000'}}
                />
            </Button>
          </View>
        </View>
        <View style={styles.eventTitleContainer}>
            <MyText
            fontStyle="bold"
            style={{fontSize: theme.FONT_SIZE_XL, color: 'white'}}
            >
              {event.eventName}
            </MyText>
            <View style={styles.eventLocationContainer}>
              <FontAwesome
                name="map-marker"
                color="white"
                style={{marginRight: 5}}
                size={theme.ICON_SIZE_SMALL}
              />
              <MyText
              fontStyle="bold"
              style={{fontSize: theme.FONT_SIZE_MEDIUM, color: 'white'}}
              >
                {event.location}
              </MyText>
            </View>
        </View>
      </View>
      <Content padder>
        <View style={styles.descriptionContainer}>
          <View>
            <MyText style={{fontSize: theme.FONT_SIZE_LARGE}} fontStyle="bold">Descripción</MyText>
            <MyText>{event.description}</MyText>
          </View>
        </View>
        <BigIconItem 
        leftContainerStyles={{backgroundColor: '#68C2BB'}}
        leftItem={
          <AntDesign
            name="calendar"
            color="white"
            size={theme.ICON_SIZE_MEDIUM}
          />
        } 
        primaryText="Fecha"
        rightItem={
          <MyText> {moment(event.date).format('YYYY-MM-DD') }</MyText>
        }
        />
        <BigIconItem 
        touchContainerStyles={{marginVertical: 15}}
        leftContainerStyles={{backgroundColor: '#F57E55'}}
        leftItem={
          <AntDesign
            name="clockcircle"
            color="white"
            size={theme.ICON_SIZE_MEDIUM}
          />
        } 
        primaryText="Hora"
        rightItem={
          <MyText> {moment(event.date).format('hh:mm A') }</MyText>
        }
        />
        { invitationId === undefined && <View style={styles.actionEvent}>
          <Button transparent onPress={() => {navigate('Atendees')}} style={styles.buttonAction}>
            <FontAwesome name="users" size={theme.ICON_SIZE_MEDIUM} color={theme.PRIMARY_COLOR} />
            <MyText fontStyle="semibold" style={styles.buttonTextIcon}>
              Asistentes
            </MyText>
          </Button>
          <Button transparent onPress={() => {
            dispatch({
              type: 'events/SET_STATE',
              payload: {
                current_event_tasks: event.tasks
              }
            })
            navigate('ShowTasks')}
            } style={styles.buttonAction}>
            <Ionicons name="ios-clipboard" size={theme.ICON_SIZE_MEDIUM} color={theme.PRIMARY_COLOR} />
            <MyText fontStyle="semibold" style={styles.buttonTextIcon}>
              Tareas
            </MyText>
          </Button>
        </View>
      }
        {/* <View style={styles.footerContainer}>
          <MyText fontStyle="bold">{group.groupName}/Nuevo Evento</MyText> */}
          { invitationId !== undefined && <View style={styles.actionButtonContainer}> 
            <Button onPress={handleCancelEvent} style={styles.cancelButton} danger block superRounded>
              <Icon
                type="AntDesign"
                name="close"
                style={{color: "white", fontSize: theme.ICON_SIZE_SMALL}}
              />
            </Button>
            <Button primary iconRight block superRounded>
              <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} onPress={handleAcceptEvent} fontStyle="bold">¡Asistiré!</MyText>
              <Icon
                type="AntDesign"
                name="rightcircle"
                style={{color: "white", fontSize: theme.ICON_SIZE_SMALL}}
              />
            </Button>
          </View>
          }
      </Content>
          {isGroupEvent !== undefined && isAdmin && 
            <FloatingAction
              actions={actions}
              onPressItem={name => {
                console.log(`selected button: ${name}`);
              }}
            />
          }
    </View>
  );
};

ShowEvent.navigationOptions = ({navigation}) => {
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
  };
};

export default ShowEvent;
