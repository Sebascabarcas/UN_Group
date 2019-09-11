import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import * as navigationHooks from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles.js';
import images from '../../../constants/Images';
import MyText from '../../../components/MyText';
import ConfirmButton from '../../../components/ConfirmEditProfile';
import {Input, Button, List, ListItem, Form, Item} from 'native-base';
import Storage from '../../../services/Storage';
import {Ionicons, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {Permissions} from 'expo';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {USER_FACING_NOTIFICATIONS} from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const EditProfileScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const [showImageModal, _setShowImageModal] = useState (false);
  const user = useSelector (state => state.session.current_user_edition);
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

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync ({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log (result);

    if (!result.cancelled) {
      _setShowImageModal (false);
      dispatch ({
        type: 'session/SET_STATE',
        payload: {current_user_edition: {...user, profileImg: result.uri}},
      });
    }
  };

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync ({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log (result);

    if (!result.cancelled) {
      _setShowImageModal (false);
      dispatch ({
        type: 'session/SET_STATE',
        payload: {current_user_edition: {...user, profileImg: result.uri}},
      });
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showImageModal}
        // onShow={}
        // onRequestClose={() => {
        //   Alert.alert ('Modal has been closed.');
        // }}
      >
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
            //
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
      <View style={styles.topProfileContainer}>
        <View style={styles.profileImgContainer}>
          <TouchableWithoutFeedback onPress={() => _setShowImageModal (true)}>
            <ImageBackground
              imageStyle={{borderRadius: 100}}
              style={styles.profileImg}
              source={
                user.profileImg
                  ? {uri: user.profileImg}
                  : images[user.identification]
              }
            >
              <View style={styles.profileImgOverlay}>
                <MaterialIcons
                  name="photo-camera"
                  size={theme.ICON_SIZE_MEDIUM}
                  color="white"
                />
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <MyText
            color={theme.PRIMARY_COLOR}
            onPress={() => _setShowImageModal (true)}
            style={styles.editPhotoText}
          >
            Editar Foto
          </MyText>
        </View>
        <Form style={styles.profileNameForm}>
          <Item>
            <Input
              onChangeText={name =>
                dispatch ({
                  type: 'session/SET_STATE',
                  payload: {current_user_edition: {...user, name}},
                })}
              style={styles.input}
              value={user.name}
              placeholder="Nombres"
            />
          </Item>
          <Item>
            <Input
              onChangeText={last_name =>
                dispatch ({
                  type: 'session/SET_STATE',
                  payload: {current_user_edition: {...user, last_name}},
                })}
              style={styles.input}
              value={user.last_name}
              placeholder="Apellidos"
            />
          </Item>
        </Form>
      </View>
      <ScrollView style={styles.infoContainer}>
        <MyText color={theme.GRAY_COLOR} style={{margin: 8}} />
        <List style={{backgroundColor: 'white'}}>
          <ListItem style={styles.listItem}>
            <MyText>E-mail</MyText>
            <Input
              onChangeText={email =>
                dispatch ({
                  type: 'session/SET_STATE',
                  payload: {current_user_edition: {...user, email}},
                })}
              style={styles.itemInput}
              value={user.email}
              placeholder="Email"
            />
          </ListItem>
          <ListItem style={styles.listItem}>
            <MyText>Teléfono</MyText>
            <Input
              onChangeText={cellphone_number =>
                dispatch ({
                  type: 'session/SET_STATE',
                  payload: {current_user_edition: {...user, cellphone_number}},
                })}
              style={styles.itemInput}
              value={user.cellphone_number}
              placeholder="Télefono"
            />
          </ListItem>
          <ListItem style={styles.listItem}>
            <MyText>Género</MyText>
            <Input
              disabled
              style={styles.itemInput}
              value={user.gender === 'female' ? 'Femenino' : 'Masculino'}
              placeholder="Género"
            />
          </ListItem>
        </List>
      </ScrollView>
    </View>
  );
};

EditProfileScreen.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    headerLeft: (
      <Button
        // block
        // style={{marginLeft: 20}}
        iconLeft
        transparent
        onPress={() => navigation.goBack ()}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          color={theme.HEADER_MENU_TITLE_COLOR}
        >
          Cancelar
        </MyText>
      </Button>
    ),
    headerRight: <ConfirmButton />,
  };
};

export default EditProfileScreen;
