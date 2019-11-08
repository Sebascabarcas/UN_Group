import React from 'react'
import { ImageBackground, View, Image } from 'react-native'
import styles from './styles.js'
import MyText from '../../../components/MyText'
// import SvgUri from 'react-native-svg-uri';
import {Button} from 'native-base'
import {useNavigation}  from 'react-navigation-hooks';
import Images from '../../../constants/Images.js';

const CheckEmail = () => {
	const {navigate} = useNavigation ();
	return(
		<ImageBackground style={styles.fullImage} source={Images['dashboard_bg_image']}>
			<View style={styles.mainContainer}>
				{/* <SvgUri style={styles.checkLogo} source={require('../../../assets/images/big_check.svg')}/> */}
				<Image style={styles.checkLogo} source={Images['big_check']}/>
				<MyText fontStyle="semibold" style={styles.textSuccess}>Por favor revise su correo, hemos enviado informacion que le ayudara a reestablecer sus accesos.</MyText>
				<Button primary block rounded onPress={() => navigate('SignIn')} style={styles.buttonSuccess}>
					<MyText fontStyle="bold" style={styles.sendSuccess}>LISTO</MyText>
				</Button>
			</View>
		</ImageBackground>
	)
}

CheckEmail.navigationOptions = {
  header: null,
};

export default CheckEmail
