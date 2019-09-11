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
import MyText from '../../../components/MyText';
import {
  Body,
  Button,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import Storage from '../../../services/Storage';
import {MaterialIcons, FontAwesome, Foundation, Entypo} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import BigListItem from '../../../components/BigListItem';
import CreditCardPlaceholder from '../../../components/CreditCardPlaceholder';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const AddCreditCardScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const user = useSelector (state => state.session.current_user);
  const dispatch = useDispatch ();
  const emptyCard = require ('../../../assets/images/card_empty.png')
  return (
    <View style={styles.container}>
      {/* <CreditCardPlaceholder/> */}
      <View style={{backgroundColor: 'white', padding: 20, borderRadius: 8}}>
        <Image style={{alignSelf: 'center'}} source={emptyCard} />
      </View>
      <Form style={{marginTop: 20}}>
        <Item stackedLabelRoundedInput>
          <Label>NOMBRE DEL TARJETA HABIENTE</Label>
          <Input placeholder="ANDRES CASTRO LOPEZ" placeholderTextColor="#BEC2CE"/>
        </Item>
        <Item stackedLabelRoundedInput>
          <Label>NÚMERO DE TARJETA</Label>
          <Input placeholder="1234 567 890" placeholderTextColor="#BEC2CE"/>
        </Item>
        <Item stackedLabelRoundedInput>
          <Label>FECHA DE VENCIMIENTO</Label>
          <Input placeholder="MM/YYYY" placeholderTextColor="#BEC2CE"/>
        </Item>
        <Item stackedLabelRoundedInput>
          <Label>CÓDIGO DE SEGURIDAD</Label>
          <Input placeholder="1234" placeholderTextColor="#BEC2CE"/>
        </Item>
      </Form>
      <Button
      primary
      full
      onPress={() =>
        {
        // dispatch ({
        //   type: 'session/SET_STATE',
        //   payload: {current_user_edition: current_user},
        // });
        navigate('PaymentMethod');
      }}
      // onPress={() => navigate('EditProfile')}
      style={styles.actionBottomButton}
    >
      <MyText
        style={{fontSize: theme.FONT_SIZE_LARGE}}
        fontStyle="bold"
        color={theme.HEADER_MENU_TITLE_COLOR}
      >
        AGREGAR
      </MyText>
    </Button>
    </View>
  );
};

AddCreditCardScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Agregar Tarjeta',
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
export default AddCreditCardScreen;
