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
import getEnvVars from '../../../../environment';
import moment from 'moment';

const {height: fullHeight} = Dimensions.get ('window');
const {apiUrl} = getEnvVars();

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
    dispatch({
      type: 'events/CREATE_EVENT', 
      payload: {groupId: group.id, event}
    })
  }
  _pickImage = async () => {
    let file = await ImagePicker.launchImageLibraryAsync ({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!file.cancelled) {
      _setShowImageModal (false);
      let localUri = file.uri;
      let filename = localUri.split ('/').pop ();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`
      file = { type, filename, uri: localUri,data: `data:${type};base64,${file.base64}`}
      dispatch ({
        type: 'events/SET_STATE',
        payload: {new_group: {...group, file}},
      });
    }
  };

  _takePhoto = async () => {
    const file = await ImagePicker.launchCameraAsync ({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!file.cancelled) {
      _setShowImageModal (false);
      let localUri = file.uri;
      let filename = localUri.split ('/').pop ();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`
      file = { type, filename, uri: localUri,data: `data:${type};base64,${file.base64}`}
      dispatch ({
        type: 'events/SET_STATE',
        payload: {new_group: {...group, file}},
      });
    }
  };

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
  
  const ImageModal = () => (
    <Modal animationType="fade" transparent={true} visible={showImageModal}>
      <View
        style={{
          backgroundColor: '#6c6c6ca3',
          flex: 1,
          alignContent: 'center',
          justifyContent: 'flex-end',
          // marginHorizontal:
          alignItems: 'center',
        }}
      >
        <Button
          // block
          full
          rounded
          primary
          style={{marginTop: 5, marginHorizontal: 10}}
          onPress={_takePhoto}
        >
          <MyText
            style={{fontSize: theme.FONT_SIZE_LARGE}}
            color={theme.HEADER_MENU_TITLE_COLOR}
            onPress={_takePhoto}
          >
            Tomar Foto
          </MyText>
        </Button>
        <Button
          full
          rounded
          primary
          style={{marginTop: 5, marginHorizontal: 10}}
          onPress={_pickImage}
        >
          <MyText
            style={{fontSize: theme.FONT_SIZE_LARGE}}
            color={theme.HEADER_MENU_TITLE_COLOR}
          >
            Escoger Foto
          </MyText>
        </Button>
        <Button
          full
          rounded
          transparent
          danger
          style={{marginVertical: 5, marginHorizontal: 10}}
          onPress={() => _setShowImageModal (false)}
        >
          <MyText
            style={{fontSize: theme.FONT_SIZE_LARGE}}
            color={theme.HEADER_MENU_TITLE_COLOR}
          >
            Cancelar
          </MyText>
        </Button>
      </View>
    </Modal>
  );
  
  return (
    <View style={styles.container}>
      <ImageModal/>
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
              group.groupPicture ? {uri: `${apiUrl}${group.groupPictures.groupPictureName}`} : images['logo']
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
                color="#000"
                size={theme.ICON_SIZE_SMALL}
              />
          </Button>
        </View>
      </View>
      <View style={styles.inputContainer}>
          <TextInput
           style={{fontFamily: theme.FONT_FAMILY_BOLD, fontSize: theme.FONT_SIZE_XL}}
           placeholder="Nombre del Evento"
           onChangeText={(eventName) => dispatch({type: 'events/SET_STATE', payload: { new_event: {...event, eventName}}})}
           value={event.eventName}
           autoFocus
          />
          <Item stackedLabel>
              <Label>Descripción del Evento</Label>
              <Input value={event.description} onChangeText={(description) => dispatch({type: 'events/SET_STATE', payload: { new_event: {...event, description}}})} />
          </Item>
      </View>
      <View style={styles.inputContainer}>
          <Item stackedLabel>
              <Label>Lugar del Evento</Label>
              <Input value={event.location} onChangeText={(location) => dispatch({type: 'events/SET_STATE', payload: { new_event: {...event, location}}})} />
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

export default CreateEvent;
