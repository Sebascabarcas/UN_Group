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
import {Button, Input, Item, Label, Icon} from 'native-base';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import getEnvVars from '../../../environment';
import moment from 'moment';
import BigIconItem from '../../../components/BigIconItem';

const {height: fullHeight} = Dimensions.get ('window');
const {apiUrl} = getEnvVars();

const ShowEvent = () => {
  const {navigate, goBack, getParam} = useNavigation ();
  // const {new_group: group} = useSelector (state => state.groups);
  const {current_user: {id: userId}} = useSelector (state => state.session);
  const {current_event: event} = useSelector (state => state.events);
  const { group } = event
  const dispatch = useDispatch ();
  const invitationId = getParam('invitationId')

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.groupInfoContainer}>
            <Image
              resizeMode="cover"
              style={styles.imageGroup}
              source={
                group.groupPicture ? {uri: `${apiUrl}${group.groupPicture.uri}`} : images['logo']
              }
            />
            <View>
              <MyText style={{color: 'white'}} fontStyle="bold">{group.groupName}</MyText>
              <MyText style={{color: 'white'}} fontStyle="semibold">Evento</MyText>
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
        </View>}
      {/* </View> */}
    </View>
  );
};

ShowEvent.navigationOptions = ({navigation}) => {
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

export default ShowEvent;
