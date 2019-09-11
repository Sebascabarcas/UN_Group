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
import {Body, Button, List, ListItem, Left, Right, Thumbnail} from 'native-base';
import Storage from '../../../services/Storage';
import {Ionicons, FontAwesome, Foundation, Entypo} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import BigListItem from '../../../components/BigListItem';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const NotificationsScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const user = useSelector (state => state.session.current_user);
  const dispatch = useDispatch ();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.notificationsContainer}>
            <BigListItem 
            leftItem={
            <Button large style={{ backgroundColor: '#7DC623', borderRadius: 50, padding: 20}}>
                <Ionicons
                  color="white"
                  size={theme.ICON_SIZE_MEDIUM}
                  // style={{}}
                  active
                  name="ios-checkmark-circle"
                />
            </Button>
            }
            primaryText="Sistema"
            primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
            secondaryText="Usted ha sido asignado"
            />
            <BigListItem 
            leftItem={
            <Button large style={{ backgroundColor: '#019CDE', borderRadius: 50, padding: 20}}>
                <Ionicons
                  color="white"
                  size={theme.ICON_SIZE_MEDIUM}
                  // style={{}}
                  active
                  name="ios-information-circle-outline"
                />
            </Button>
            }
            primaryText="Sin Atender"
            primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
            secondaryText="Viaje en espera"
            />
            <BigListItem 
            leftItem={
            <Button large style={{ backgroundColor: '#F52D56', borderRadius: 50, padding: 20}}>
                <Ionicons
                  color="white"
                  size={theme.ICON_SIZE_MEDIUM}
                  // style={{}}
                  active
                  name="ios-close-circle"
                />
            </Button>
            }
            primaryText="Sistema"
            primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
            secondaryText="Ha sido rechazado"
            />
            <BigListItem 
            leftItem={
            <Button large style={{ backgroundColor: '#4CE5B1', borderRadius: 50, padding: 20}}>
                <Ionicons
                  color="white"
                  size={theme.ICON_SIZE_MEDIUM}
                  // style={{}}
                  active
                  name="ios-wallet"
                />
            </Button>
            }
            primaryText="Sistema"
            primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
            secondaryText="Transacción completada"
            />
      </ScrollView>
    </View>
  );
};

NotificationsScreen.navigationOptions = ({navigation}) => {
  
  return {
    title: 'Notificaciones',
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft transparent
        onPress={() => navigation.goBack()}
      >
        <FontAwesome
            name="arrow-left"
            color={theme.HEADER_MENU_TITLE_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
      </Button>
    )
  }
}
export default NotificationsScreen;
