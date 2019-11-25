import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Modal,
} from 'react-native';
import {Button, Switch, Content, Icon, Grid, Row, Col, Item, Input, Label} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import {NavigationAction} from 'react-navigation';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import Images from '../../../constants/Images.js';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const HeaderComponent = ({user, title, file, handlePostTitle, showImageModal, handleDescription, description, goBack}) => {
  return (
  <View style={styles.headerContainer}>
    <View style={styles.headerInnerContainer}>
      <View style={styles.groupInfoContainer}>
        <Image
          resizeMode="cover"
          style={styles.imageGroup}
          source={
            user.picture
              ? {uri: `${user.picture.uri}`}
              : Images['no-profile-photo']
          }
        />
        <View>
          <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
            {user.firstName} {user.firstLastName}
          </MyText>
          <MyText style={{color: theme.GRAY_LIGHT_COLOR}} fontStyle="semibold">
            Nueva Publicación
          </MyText>
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
    <View style={styles.userTextInputContainer}>
      <TextInput
          style={{textAlign: 'center', fontFamily: theme.FONT_FAMILY_BOLD, fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE}}
          placeholder="Título"
          onChangeText={(postTitle) => handlePostTitle(postTitle)}
          value={title}
          //  autoFocus
      />
    </View>
    <View style={styles.postImgContainer}>
      <TouchableWithoutFeedback onPress={() => showImageModal (true)}>
        <ImageBackground
          style={styles.profileImg}
          source={
            file
              ? {uri: file.uri} : Images['logo']  
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
    </View>
    <View style={styles.inputContainer}>
        <Item style={{height: 80}} stackedLabel>
            <Label>Publicación</Label>
            <Input value={description} multiline numberOfLines={2} onChangeText={(description) => handleDescription(description)} />
        </Item>
    </View>
  </View>
  );
};

const CreatePost = () => {
  const {current_user: user, current_group: group} = useSelector (state => state.session);
  const {new_post: post} = useSelector (state => state.roleModels);
  const dispatch = useDispatch ();
  const [showImageModal, _setShowImageModal] = useState (false);
  const {navigate, goBack, getParam} = useNavigation ();
  
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
      post.file = file  
      dispatch ({
        type: 'session/SET_STATE',
        payload: {new_post: post},
      });
    }
  };

  _takePhoto = async () => {
    let file = await ImagePicker.launchCameraAsync ({
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
      post.file = file
      dispatch ({
        type: 'roleModels/SET_STATE',
        payload: {new_post: post},
      });
    }
  };

  const handleCreatePost = () => {
    dispatch({
      type: 'roleModels/CREATE_POST',
      payload: {
        goBack,
        post,
        groupId: group.id
      }
    })
  }
  
  const handlePostTitle = (title) => {
    dispatch({type: 'roleModels/SET_STATE', payload: { new_post: {...post, title}}})
  }

  const handleDescription = (description) => {
    dispatch({type: 'roleModels/SET_STATE', payload: { new_post: {...post, description}}})
  }

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
      <HeaderComponent user={user} {...post} showImageModal={_setShowImageModal} handlePostTitle={handlePostTitle} handleDescription={handleDescription}  goBack={goBack}/>
        {
        }
        <Button style={styles.postButton} onPress={handleCreatePost} full block primary>
          <Icon
            type="FontAwesome"
            name="send-o"
            style={{color: "white", fontSize: theme.ICON_SIZE_MEDIUM}}
          />
        </Button>
    </View>
  );
};

export default CreatePost;
