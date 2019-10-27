import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Modal,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles.js';
import images from '../../../constants/Images';
import MyText from '../../../components/MyText';
import ConfirmButton from '../../../components/ConfirmEditProfile';
import {Input, Button, List, ListItem, Form, Item, Badge} from 'native-base';
import Storage from '../../../services/Storage';
import {
  Ionicons,
  FontAwesome,
  Foundation,
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons';
import {Permissions} from 'expo';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {USER_FACING_NOTIFICATIONS} from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Images from '../../../constants/Images.js';
import CardGroupInfo from '../../../components/CardGroupInfo';

const {height: fullHeight} = Dimensions.get ('window');

const ShowGroupScreen = () => {
  const {
    current_group,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, getParam} = useNavigation ();
  const user_id = getParam('id');

  useEffect (() => {
    dispatch({
      type: 'groups/GET_GROUP',
      payload: {id: user_id}
    })
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden={true}/> */}
      <Image
        resizeMode="cover"
        style={styles.imageCar}
        source={{
          // uri: 'https://www.indiacarnews.com/wp-content/uploads/2017/03/Renault-Duster-petrol-automatic-cvt-compressed.jpg',
          uri: current_group.groupPictures.length > 0 ? `http://192.168.1.11:4936${current_group.groupPictures[0].groupPictureName}` : 'https://www.indiacarnews.com/wp-content/uploads/2017/03/Renault-Duster-petrol-automatic-cvt-compressed.jpg',
        }}
      />
      <Button style={styles.arriveButton}>
        <MyText style={{textAlign: 'center'}} fontStyle="bold">
          {current_group.groupName}
        </MyText>
      </Button>
      <View style={{marginHorizontal: 20}}>
        <CardGroupInfo description={current_group.description} />
      </View>
      <View style={styles.containerButtons}>
        <Button style={styles.buttonItem}>
          <MyText fontStyle="bold" style={styles.textItemButton}>
            Ver Eventos
          </MyText>
        </Button>
      </View>
      <View style={styles.actionTrip}>
        <Button transparent style={styles.buttonAction}>
          <FontAwesome name="users" size={30} color="white" />
          <MyText fontStyle="semibold" style={styles.buttonTextIcon}>
            Miembros
          </MyText>
        </Button>
        <Button transparent style={styles.buttonAction}>
          <Ionicons name="ios-chatbubbles" size={30} color="white" />
          <MyText fontStyle="semibold" style={styles.buttonTextIcon}>
            Chat
          </MyText>
        </Button>
      </View>
    </View>
  );
};

ShowGroupScreen.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    header: null,
    // headerLeft: (
    //   <Button
    //     // block
    //     style={{marginLeft: 20}}
    //     iconLeft
    //     transparent
    //     onPress={() => navigation.goBack ()}
    //   >
    //     <FontAwesome
    //       name="arrow-left"
    //       color={theme.HEADER_MENU_TITLE_COLOR}
    //       size={theme.ICON_SIZE_SMALL}
    //     />
    //   </Button>
    // ),
  };
};

export default ShowGroupScreen;
