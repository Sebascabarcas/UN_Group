import React from 'react'
import styles from './styles'
import { View, Image } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import MyText from '../../../components/MyText'
// import SvgUri from 'react-native-svg-uri';
import { Button } from 'native-base'


const LocationScreen = () => {
	return (
		<View style={styles.mainContent}>
  		    {/* <SvgUri style={styles.logoIntroSlider} source={require('../../../assets/images/splash_4.svg')}/> */}
  		    <Image style={styles.logoIntroSlider} source={require('../../../assets/images/splash_4.png')}/>
  		    <View>
  			    <MyText style={styles.mainTitle} fontStyle="semibold"> Activa tu Ubicacion </MyText>
  			    <MyText style={styles.description}> Empieza la jornada activando tu ubicacion. </MyText>
  		    </View>
  		    <View style={styles.buttonCircle}>
  				<Button primary rounded block>
  					<MyText fontStyle="bold">USAR MI UBICACION</MyText>
  				</Button>
		    </View>
  	    </View>
    );
}

LocationScreen.navigationOptions = {
  header: null,
};


export default LocationScreen
