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
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {USER_FACING_NOTIFICATIONS} from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import getEnvVars from '../../../environment';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const {apiUrl} = getEnvVars();
const EditProfileScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const [showImageModal, _setShowImageModal] = useState (false);
  const {current_user_edition: user} = useSelector (state => state.session)
  console.log('EditProfileScreen user:', user);
  
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
    let file = await ImagePicker.launchImageLibraryAsync ({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!file.cancelled) {
      _setShowImageModal (false);
      let localUri = file.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`
      file = { type, filename, uri: localUri,data: `data:${type};base64,${file.base64}`}
      user.file = file
      dispatch ({
        type: 'session/SET_STATE',
        payload: {current_user_edition: user},
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

    console.log (file);

    if (!file.cancelled) {
      _setShowImageModal (false);
      let localUri = file.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`
      file = { type, filename, uri: localUri,data: `data:${type};base64,${file.base64}`}
      user.file = file
      dispatch ({
        type: 'session/SET_STATE',
        payload: {current_user_edition: user},
      });
    }
  };


  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showImageModal}
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
                user.file
                  ? {uri: user.file.pictureName ? `${apiUrl}${user.file.pictureName}` : user.file.uri} 
                  : images['no-profile-photo']
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
              onChangeText={firstName =>
                dispatch ({
                  type: 'session/SET_STATE',
                  payload: {current_user_edition: {...user, firstName}},
                })}
              style={styles.input}
              value={user.firstName}
              placeholder="Nombres"
            />
          </Item>
          <Item>
            <Input
              onChangeText={lastName =>
                dispatch ({
                  type: 'session/SET_STATE',
                  payload: {current_user_edition: {...user, lastName}},
                })}
              style={styles.input}
              value={user.lastName}
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
