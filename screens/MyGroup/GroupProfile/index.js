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
  AntDesign,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import CardGroupInfo from '../../../components/CardGroupInfo';
import getEnvVars from '../../../environment.js';
import theme from '../../../styles/theme.style.js';

const {height: fullHeight} = Dimensions.get ('window');
const { apiUrl } = getEnvVars();
const GroupProfile = () => {
  const {
    current_group
  } = useSelector (state => state.groups);

  const {
    isAdmin,
    isSuperAdmin,
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

  handleEditButton = () => {
    dispatch({
      type: 'groups/SET_STATE',
      payload: {editing_group: current_group}
    })
    navigate('EditGroup')
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden={true}/> */}
      <Image
        resizeMode="cover"
        style={styles.imageCar}
        source={
          // uri: 'https://www.indiacarnews.com/wp-content/uploads/2017/03/Renault-Duster-petrol-automatic-cvt-compressed.jpg',
          current_group.groupPicture ? {uri: `${current_group.groupPicture.uri}`} : images['logo']
        }
      />
      <Button style={styles.arriveButton}>
        <MyText style={{textAlign: 'center'}} fontStyle="bold">
          {current_group.groupName}
        </MyText>
      </Button>
      <View>
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
      {isAdmin || isSuperAdmin && <Button primary iconRight block superRounded onPress={handleEditButton}>
            <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Editar</MyText>
            <AntDesign
              name="form"
              color="white"
              size={theme.ICON_SIZE_SMALL}
            />
      </Button>}
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
