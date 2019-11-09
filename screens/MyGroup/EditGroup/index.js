import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles';
import images from '../../../constants/Images';
import MyText from '../../../components/MyText';
import ConfirmButton from '../../../components/ConfirmEditProfile';
import {Input, Button, List, ListItem, Form, Item} from 'native-base';
import Storage from '../../../services/Storage';
import {
  Ionicons,
  FontAwesome,
  Foundation,
  MaterialIcons,
} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {USER_FACING_NOTIFICATIONS} from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Images from '../../../constants/Images.js';

const {height: fullHeight} = Dimensions.get ('window');

const EditGroup = () => {
  const {navigate} = useNavigation ();
  const [showImageModal, _setShowImageModal] = useState (false);
  const {editing_group: group} = useSelector (state => state.groups);
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
      dispatch ({
        type: 'groups/SET_STATE',
        payload: {editing_group: {...group, file}},
      });
    }
  };
  
  _takePhoto = async () => {
    const file = await ImagePicker.launchCameraAsync ({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
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
      dispatch ({
        type: 'groups/SET_STATE',
        payload: {editing_group: {...group, file}},
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
                group.file ? {uri: group.file.uri} : Images['raul']
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
              onChangeText={groupName =>
                dispatch ({
                  type: 'groups/SET_STATE',
                  payload: {editing_group: {...group, groupName}},
                })}
              style={styles.input}
              value={group.groupName}
              placeholder="Nombre del Grupo"
            />
          </Item>
          {/* <Item>
            <Input
              onChangeText={last_name =>
                dispatch ({
                  type: 'groups/SET_STATE',
                  payload: {editing_group: {...group, last_name}},
                })}
              style={styles.input}
              value={user.last_name}
              placeholder="Apellidos"
            />
          </Item> */}
        </Form>
      </View>
      <View style={styles.infoContainer}>
        <MyText color={theme.GRAY_COLOR} style={{margin: 8}} />

        <List style={{backgroundColor: 'white'}}>
          <ListItem style={styles.listItem}>
            <Input
              placeholderTextColor="#ABABAB"
              inputStyle={{color: '#ABABAB'}}
              placeholder="Descripción..."
              leftIcon={
                <Foundation
                  style={styles.iconContainer}
                  name="comment"
                  color={theme.PRIMARY_COLOR}
                  size={theme.ICON_SIZE_SMALL}
                />
              }
              inputContainerStyle={{
                borderBottomWidth: 0,
                marginLeft: -wp (2),
              }}
              value={group.description}
              onChangeText={description =>
                dispatch ({
                  type: 'groups/SET_STATE',
                  payload: {editing_group: {...group, description}},
                })}
            />
          </ListItem>
        </List>
        <Button
          primary
          full
          onPress={() => {
            dispatch ({type: 'groups/UPDATE_GROUP', payload: {id: group.id, group, navigate}});
            // navigate ('Groups');
          }}
          // onPress={() => navigate('EditProfile')}
          style={styles.actionBottomButton}
        >
          <MyText
            style={{fontSize: theme.FONT_SIZE_LARGE}}
            fontStyle="bold"
            color={theme.HEADER_MENU_TITLE_COLOR}
          >
            EDITAR
          </MyText>
        </Button>
      </View>
    </View>
  );
};

EditGroup.navigationOptions = ({navigation}) => {
  return {
    title: 'Editar',
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft
        transparent
        onPress={() => navigation.goBack ()}
      >
        <FontAwesome
          name="arrow-left"
          color={theme.HEADER_MENU_TITLE_COLOR}
          size={theme.ICON_SIZE_SMALL}
        />
      </Button>
    ),
  };
};

export default EditGroup;
