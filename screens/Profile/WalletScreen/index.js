import React, {useEffect, useState} from 'react';
import {
  View,
  Platform,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import * as navigationHooks from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {
  Button,
  Thumbnail,
  Tabs,
  Tab,
} from 'native-base';
import {MaterialIcons, FontAwesome, Foundation, Entypo} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import BigListItem from '../../../components/BigListItem';
import Images from '../../../constants/Images';

const WIDTH = Dimensions.get ('window').width;
const HEIGHT = Dimensions.get ('window').height;
const WalletScreen = () => {
  const {navigate} = navigationHooks.useNavigation ();
  const [loading, _setLoading] = useState (false);
  const user = useSelector (state => state.session.current_user);
  const dispatch = useDispatch ();

  return (
    <View style={styles.container}>
      <Tabs
        tabContainerStyle={styles.tabsContainer}
        tabBarUnderlineStyle={{backgroundColor: 'transparent'}}
      >
        <Tab
          tabStyle={{...styles.tab, ...styles.leftTab}}
          textStyle={styles.tabTextStyle}
          activeTextStyle={styles.activeTabTextStyle}
          activeTabStyle={{...styles.activeTab, ...styles.leftTab}}
          heading="Efectivo"
        >
          <View style={styles.walletTopContainer}>
            <View style={styles.walletTopMoney}>
              <MyText color={theme.DARK_COLOR} fontStyle="bold" style={styles.topMoneyText}>$325.000</MyText>
              <MyText color={theme.DARK_COLOR} fontStyle="semibold">GASTO TOTAL</MyText>
            </View>
          </View>
          {/* <View style={styles.paymentMethodContainer}> */}
            <BigListItem
              onPress={() => navigate('PaymentMethod')}
              listContainerStyles={{marginHorizontal: 10, marginBottom: 10, borderRadius: 8, borderColor: '#EFEFF4', borderTopWidth: 0.5}}
              leftItem={
              <Button large onPress={() => navigate('PaymentMethod')} style={{ backgroundColor: '#FFD428', borderRadius: 50, padding: 20}}>
                <MaterialIcons color="white" size={theme.ICON_SIZE_MEDIUM} name="monetization-on"/>
              </Button>
                }
              primaryText="Método de Pago"
              primaryTextStyles={{paddingTop: 0, paddingBottom: 2}}
              rightItem={
                <Entypo color="rgba(0, 0, 0, 0.25)" size={theme.ICON_SIZE_SMALL} name="chevron-small-right"/>
              }
            />
          {/* </View> */}
          <View style={styles.walletBottomContainer}>
            <MyText color={theme.GRAY_COLOR} style={{margin: 16}}>
              HISTORIAL
            </MyText>
            <ScrollView style={{flex: 1}}>
              <BigListItem
                leftItem={<Thumbnail small source={Images.default} />}
                primaryText="Robot Pool"
                primaryTextStyles={{paddingTop: 0, paddingBottom: 2}}
                secondaryText="Usted ha sido asignado"
                rightItem={<MyText>$25.000</MyText>}
                rightContainerStyles={{alignSelf: 'flex-end'}}
              />
              <BigListItem
                leftItem={<Thumbnail small source={Images['123456789']} />}
                primaryText="Sebastian Cabarcas"
                primaryTextStyles={{paddingTop: 0, paddingBottom: 2}}
                secondaryText="Viaje en espera"
                rightItem={<MyText>$25.000</MyText>}
                rightContainerStyles={{alignSelf: 'flex-end'}}
              />
              <BigListItem
                leftItem={<Thumbnail small source={Images['72261184']} />}
                primaryText="Albeiro Espitia"
                primaryTextStyles={{paddingTop: 0, paddingBottom: 2}}
                secondaryText="Ha sido rechazado"
                rightItem={<MyText>$25.000</MyText>}
                rightContainerStyles={{alignSelf: 'flex-end'}}
              />
              <BigListItem
                leftItem={<Thumbnail small source={Images['8787433']} />}
                primaryText="Robert Daza"
                primaryTextStyles={{paddingTop: 0, paddingBottom: 2}}
                secondaryText="Transacción completada"
                rightItem={<MyText>$25.000</MyText>}
                rightContainerStyles={{alignSelf: 'flex-end'}}
              />
            </ScrollView>
          </View>
        </Tab>
        <Tab
          tabStyle={{...styles.tab, ...styles.rightTab}}
          textStyle={styles.tabTextStyle}
          activeTextStyle={styles.activeTabTextStyle}
          activeTabStyle={{...styles.activeTab, ...styles.rightTab}}
          heading="Crédito"
        />
      </Tabs>

    </View>
  );
};

WalletScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Mi Billetera',
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
export default WalletScreen;
