import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Platform,
  AsyncStorage,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import * as navigationHooks from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles.js';
import images from '../../../constants/Images';
import MyText from '../../../components/MyText';
import {Body, Button, List, ListItem, Left, Right} from 'native-base';
import Storage from '../../../services/Storage';
// import {Input, CheckBox, Button, Header} from 'react-native-elements';
import {Ionicons, FontAwesome, Foundation} from '@expo/vector-icons';
import EditButton from '../../../components/EditProfile';
import {USER_FACING_NOTIFICATIONS} from 'expo-permissions';
import {watchPositionAsync} from 'expo-location';
import {updateUser} from '../../../services/Session';
import {showUser} from '../../../services/Session';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const ConfigurationScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const user = useSelector (state => state.session.current_user);
  const dispatch = useDispatch ();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigate('MyProfile')}>
        <View style={styles.profileInfoContainer}>
          <View style={{alignItems: 'center', marginHorizontal: 15}}>
            <Image
              style={styles.profileImg}
              source={images[user.identification]}
            />
          </View>
          <View style={styles.infoNameContainer}>
            <MyText fontStyle="bold" style={styles.name}>
              {user.name} {user.last_name}
            </MyText>
            <MyText style={styles.role}>Grupo</MyText>
          </View>
          <View style={{paddingRight: 15}}>
            <Ionicons active name="ios-arrow-forward" />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView style={styles.optionsContainer}>
        <List style={{backgroundColor: 'white'}}>
          <ListItem onPress={() => navigate('Notifications')} icon>
            <Left>
              <Button style={{backgroundColor: '#5AC8FA'}}>
                <Ionicons
                  color="white"
                  size={theme.ICON_SIZE_SMALL}
                  active
                  name="ios-notifications"
                />
              </Button>
            </Left>
            <Body>
              <MyText>Notificaciones</MyText>
            </Body>
            <Right>
              <Ionicons active name="ios-arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#8F8E94'}}>
                <Foundation
                  active
                  name="crown"
                  color="white"
                  size={theme.ICON_SIZE_SMALL}
                />
              </Button>
            </Left>
            <Body>
              <MyText>Terminos & Privacidad</MyText>
            </Body>
            <Right>
              <Ionicons active name="ios-arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#FF2D55'}}>
                <Ionicons
                  active
                  name="ios-help-circle-outline"
                  color="white"
                  size={theme.ICON_SIZE_SMALL}
                />
              </Button>
            </Left>
            <Body>
              <MyText>Ayuda</MyText>
            </Body>
            <Right>
              <Ionicons active name="ios-arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    </View>
  );
};

export default ConfigurationScreen;
