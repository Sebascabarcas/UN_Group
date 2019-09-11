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
import {
  Body,
  Button,
} from 'native-base';
import Storage from '../../../services/Storage';
import {MaterialIcons, FontAwesome, Foundation, Entypo} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import BigListItem from '../../../components/BigListItem';
import Images from '../../../constants/Images';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const PaymentMethodScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const user = useSelector (state => state.session.current_user);
  const dispatch = useDispatch ();

  return (
    <View style={styles.container}>
      <BigListItem
        listContainerStyles={{borderRadius: 8, borderColor: '#EFEFF4', borderTopWidth: 0.5}}
        // listContainerStyles={{marginHorizontal: 10, width: '120%'}}
        onPress={() => navigate('AddCreditCard')}
        leftItem={
        <Button large style={{ backgroundColor: '#4CE5B1', borderRadius: 50, padding: 20}}>
          <Entypo color="white" size={theme.ICON_SIZE_MEDIUM} name="credit-card"/>
        </Button>
          }
        primaryText="Agregar nueva tarjeta"
        // rightItem={
        //   <Entypo color="rgba(0, 0, 0, 0.25)" size={theme.ICON_SIZE_SMALL} name="chevron-small-right"/>
        // }
      />
      <MyText color={theme.GRAY_COLOR} style={styles.subtitleText}>
        TARJETAS DE CRÉDITO
      </MyText>
      <BigListItem
        listContainerStyles={{ borderTopLeftRadius: 8,
          borderTopRightRadius: 8 }}
        leftItem={
        <Button large style={{ backgroundColor: '#F1F2F6', borderRadius: 50, padding: 20}}>
          <FontAwesome color={theme.DARK_COLOR} size={theme.ICON_SIZE_MEDIUM} name="cc-visa"/>
        </Button>
          }
        primaryText="**** **** **** 3765"
        primaryTextStyles={styles.primaryTextStyles}
        secondaryText="VISA"
        
        
      />
      <BigListItem
        // listContainerStyles={{marginHorizontal: 10, width: '120%'}}
        leftItem={
        <Button large style={{ backgroundColor: '#F1F2F6', borderRadius: 50, padding: 20}}>
          <FontAwesome color={theme.DARK_COLOR} size={theme.ICON_SIZE_MEDIUM} name="cc-paypal"/>
        </Button>
          }
        primaryText="rulan@dbits.net"
        primaryTextStyles={styles.primaryTextStyles}
        secondaryText="Paypal"
      />
      <BigListItem
        // listContainerStyles={{marginHorizontal: 10, width: '120%'}}
        listContainerStyles={{ borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8 }}
        leftItem={
        <Button large style={{ backgroundColor: '#F1F2F6', borderRadius: 50, padding: 20}}>
          <FontAwesome color={theme.DARK_COLOR} size={theme.ICON_SIZE_MEDIUM} name="cc-mastercard"/>
        </Button>
          }
        primaryText="**** **** **** 8562"
        primaryTextStyles={styles.primaryTextStyles}
        secondaryText="Master Card"
      />
    </View>
  );
};

PaymentMethodScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Método de Pago',
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
export default PaymentMethodScreen;
