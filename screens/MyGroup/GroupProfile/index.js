import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {Input, Button, List, ListItem, Form, Item, Badge} from 'native-base';
import {
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import CardGroupInfo from '../../../components/CardGroupInfo';
import getEnvVars from '../../../environment.js';

const {height: fullHeight} = Dimensions.get ('window');
const { apiUrl } = getEnvVars();
const GroupProfile = () => {
  const {
    current_group,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.session);
  const dispatch = useDispatch ();
  const {navigate, getParam} = useNavigation ();

  useEffect (() => {
    dispatch({
      type: 'groups/GET_GROUP',
      payload: {id: current_group.id}
    })
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden={true}/> */}
      <Image
        resizeMode="cover"
        style={styles.imageCar}
        source={
          // uri: 'https://www.indiacarnews.com/wp-content/uploads/2017/03/Renault-Duster-petrol-automatic-cvt-compressed.jpg',
          current_group.groupPictures ? {uri: `${apiUrl}${current_group.groupPictures.groupPictureName}`} : images['no-circle-photo']
        }
      />
      <Button style={styles.arriveButton}>
        <MyText style={{textAlign: 'center'}} fontStyle="bold">
          {current_group.groupName}
        </MyText>
      </Button>
      <View style={{marginHorizontal: 20}}>
        <CardGroupInfo description={current_group.description} />
      </View>
     {/*  <View style={styles.actionTrip}>
        <Button transparent onPress={() => {navigate('GroupMembers')}} style={styles.buttonAction}>
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
      </View> */}
    </View>
  );
};

GroupProfile.navigationOptions = ({navigation}) => {
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

export default GroupProfile;
