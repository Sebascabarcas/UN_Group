import React from 'react';
import styles from './styles';
import {View, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import MyText from '../../../components/MyText';
import SvgUri from 'react-native-svg-uri';
import {Button} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import * as Permissions from 'expo-permissions';

const IntroSlider = () => {
  const {navigate} = useNavigation ();

  const begin = async () => {
    let {status} = await Permissions.getAsync (Permissions.LOCATION);
    navigate(status === 'granted' ? 'App' : 'LocationPermissions')
  } 
  
  const slides = [
    {
      key: 'splash1',
      title: 'Asignamos Viajes',
      text: 'Seras notificado ser asignado con futuros viajes.',
      image: require ('../../../assets/images/splash_1.png'),
    },
    {
      key: 'splash2',
      title: 'Rastreo en Tiempo Real',
      text: 'Con tecnologia GPS calculamos y rastreamos todos los viajes en tiempo real.',
      image: require ('../../../assets/images/splash_2.png'),
    },
    {
      key: 'splash3',
      title: 'Gestor de Ganancia',
      text: 'Lleva el record de tus viajes y ganancias mediante nuestro gestor',
      image: require ('../../../assets/images/splash_3.png'),
    },
  ];

  const _renderItem = ({item, dimensions}) => (
    <View style={styles.mainContent}>
      <Image style={styles.logoIntroSlider} source={item.image} />
      {/* <SvgUri style={styles.logoIntroSlider} source={item.image} /> */}
      <View>
        <MyText style={styles.mainTitle} fontStyle="semibold">
          {item.title}
        </MyText>
        <MyText style={styles.description}> {item.text} </MyText>

      </View>
      {item.key === 'splash3'
        ? <View style={styles.buttonCircle}>
            <Button
              primary
              rounded
              block
              onPress={begin}
            >
              <MyText fontStyle="bold">EMPEZAR</MyText>
            </Button>
          </View>
        : <Button
            transparent
            onPress={begin}
            style={styles.skipContainer}
          >
            <MyText style={styles.skipLabel}>Saltar</MyText>
          </Button>}
    </View>
  );

  return (
    <AppIntroSlider
      slides={slides}
      renderItem={_renderItem}
      skipLabel={'Saltar'}
      buttonStyle={styles.buttonTest}
      activeDotStyle={styles.dotStyle}
    />
  );
};

export default IntroSlider;
