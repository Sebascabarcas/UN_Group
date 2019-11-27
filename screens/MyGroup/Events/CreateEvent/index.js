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
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../../../styles/theme.style';
import styles from './styles.js';
import images from '../../../../constants/Images';
import MyText from '../../../../components/MyText';
import {Button, Input, Item, Label, Icon} from 'native-base';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Constants from 'expo-constants';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import moment from 'moment';

const CreateEvent = () => {
  const {navigate, goBack} = useNavigation ();
  const {new_event: event} = useSelector (state => state.events);
  const [text, _setText] = useState ('Nombre del Evento');
  const [showImageModal, _setShowImageModal] = useState (false);
  // const {new_group: group} = useSelector (state => state.groups);
  const {current_group: group} = useSelector (state => state.session);
  const [modeDateTimePicker, _setModeDateTimePicker] = useState ('date');
  const [isDateTimePickerVisible, _setIsDateTimePickerVisible] = useState (
    false
  );
  const dispatch = useDispatch ();

  useEffect (() => {
    getPermissionAsync ();
  }, []);

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync (
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      if (status !== 'granted') {
        alert ('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  handleCreateEvent = async () => {
    // dispatch({
    //   type: 'events/CREATE_EVENT', 
    //   payload: {groupId: group.id, event}
    // })
    navigate('AddAdress')
  }

  showDateTimePicker = mode => {
    _setModeDateTimePicker (mode);
    _setIsDateTimePickerVisible (true);
  };

  hideDateTimePicker = () => {
    _setIsDateTimePickerVisible (false);
  };

  handleDatePicked = date => {
    _setIsDateTimePickerVisible (false);
    _setModeDateTimePicker (modeDateTimePicker);
    modeDateTimePicker === 'date'
      ? dispatch ({
          type: 'events/SET_STATE',
          payload: {new_event: {...event, date: moment (date).format ('YYYY-MM-DD')}},
        })
      : dispatch ({
          type: 'events/SET_STATE',
          payload: {new_event: {...event, time: moment (date).format ('hh:mm A')}},
        });
    // hideDateTimePicker ();
    _setIsDateTimePickerVisible (false);
    // console.log(new Date (moment (date).format ('MM-DD-YYYY')))
    // console.log(new Date (date))
  };
  
  return (
    <View style={styles.container}>
      <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          date={new Date (event.date)}
          minimumDate={new Date ()}
          mode={modeDateTimePicker}
          onCancel={hideDateTimePicker}
        />
      <View style={styles.headerContainer}>
        <View style={styles.groupInfoContainer}>
          <Image
            resizeMode="cover"
            style={styles.imageGroup}
            source={
              group.groupPicture ? {uri: `${group.groupPicture.uri}`} : images['logo']
            }
          />
          <View>
            <MyText fontStyle="bold">{group.groupName}</MyText>
            <MyText style={{color: theme.PRIMARY_COLOR}} fontStyle="semibold">Nuevo evento</MyText>
          </View>
        </View>
        <View>
          <Button onPress={() => goBack ()} light rounded>
              <Icon
                type="AntDesign"
                name="arrowup"
                style={{fontSize: theme.ICON_SIZE_SMALL, color: '#000'}}
              />
          </Button>
        </View>
      </View>
      <View style={styles.inputContainer}>
          <TextInput
           style={{fontFamily: theme.FONT_FAMILY_BOLD, fontSize: theme.FONT_SIZE_XL}}
           placeholder="Nombre Evento"
           onChangeText={(eventName) => dispatch({type: 'events/SET_STATE', payload: { new_event: {...event, eventName}}})}
           value={event.eventName}
           autoFocus
          />
          <Item style={{height: 80}} stackedLabel>
              <Label>Descripción del Evento</Label>
              <Input value={event.description} multiline numberOfLines={2} onChangeText={(description) => dispatch({type: 'events/SET_STATE', payload: { new_event: {...event, description}}})} />
          </Item>
      </View>
      <TouchableWithoutFeedback onPress={() => showDateTimePicker('date')} style={styles.dateTimeContainer}>
        <View>
          <MyText fontStyle="bold">¿Cuando?</MyText>
          <MyText>Agregue la fecha del Evento</MyText>
          {event.date && <MyText>{event.date}</MyText>}
        </View>
        <AntDesign
          name="calendar"
          color={theme.PRIMARY_COLOR}
          size={theme.ICON_SIZE_MEDIUM}
        />
        <Ionicons
          name="ios-arrow-forward"
          color={theme.GRAY_COLOR2}
          size={theme.ICON_SIZE_MEDIUM}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => showDateTimePicker('time')} style={styles.dateTimeContainer}>
        <View>
          <MyText fontStyle="bold">¿A qué hora?</MyText>
          <MyText>Agregue la hora del Evento</MyText>
          {event.time && <MyText>{event.time}</MyText>}
        </View>
        <AntDesign
          name="clockcircle"
          color={theme.PRIMARY_COLOR}
          size={theme.ICON_SIZE_MEDIUM}
        />
        <Ionicons
          name="ios-arrow-forward"
          color={theme.GRAY_COLOR2}
          size={theme.ICON_SIZE_MEDIUM}
        />
      </TouchableWithoutFeedback>
      {/* <View style={styles.footerContainer}>
        <MyText fontStyle="bold">{group.groupName}/Nuevo Evento</MyText>
        <View style={styles.actionButtonContainer}> */}
          <Button warning iconRight block superRounded onPress={handleCreateEvent}>
            <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Continuar</MyText>
            <AntDesign
              name="rightcircle"
              color="white"
              size={theme.ICON_SIZE_SMALL}
            />
          </Button>
        {/* </View>
      </View> */}
    </View>
  );
};

CreateEvent.navigationOptions = ({navigation}) => {
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

export default CreateEvent;
