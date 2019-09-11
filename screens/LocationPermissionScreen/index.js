import React from 'react';
import styles from './styles';
import {View, Image, ToastAndroid} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {useNavigation} from 'react-navigation-hooks';
import * as Permissions from 'expo-permissions';
import {Button} from 'native-base';
import MyText from '../../components/MyText';

const LocationScreen = () => {
  const {navigate} = useNavigation ();

  const _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync (Permissions.LOCATION);
    if (status !== 'granted') {
      ToastAndroid.show (
        'Los permisos de la localización son necesarios para el uso de la aplicación.',
        ToastAndroid.SHORT
      );
    } else {
      navigate ('App');
    }
    //console.log(location)
  };

  const handleLocation = () => {
    _getLocationAsync ();
  };
  return (
    <View style={styles.mainContent}>
      {/* <SvgUri style={styles.logoIntroSlider} source={require('./../../assets/images/splash_4.svg')}/> */}
      <Image
        style={styles.logoIntroSlider}
        source={require ('./../../assets/images/splash_4.png')}
      />
      <View>
        <MyText style={styles.mainTitle} fontStyle="semibold">
          {' '}Activa tu Ubicación{' '}
        </MyText>
        <MyText style={styles.description}>
          {' '}Empieza la jornada activando tu ubicación.{' '}
        </MyText>
      </View>
      <View style={styles.buttonCircle}>
        <Button primary rounded block onPress={handleLocation}>
          <MyText fontStyle="bold">USAR MI UBICACION</MyText>
        </Button>
      </View>
    </View>
  );
};

export default LocationScreen;
