import React, { useState } from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import MyText from '../../../components/MyText'
import { FontAwesome } from '@expo/vector-icons';
import { Container, Icon, Form, Item, Input, Label, CheckBox, Button } from 'native-base';
import styles from './styles.js';
import {KeyboardAvoidingView} from 'react-native';
import {useNavigation} from 'react-navigation-hooks'
import Images from '../../../constants/Images';


const ForgetScreen = () => {
	const {navigate} = useNavigation();
	const [checked, setChecked] = useState(false)
	const [emailForgot, setEmailForgot] = useState('')

	const handleChange = event => {
		setEmailForgot(event.target.value)
	}
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.containerBack}>
			<ImageBackground style={styles.fullImage} source={Images['dashboard_bg_image']}>
				<Image style={styles.logo} source={Images['logo']} />
				<Form style={styles.mainForm}>
					<Item style={styles.itemForm}>
						<Input placeholder="Correo" value={emailForgot} onChange={handleChange} placeholderTextColor="#FFF" style={styles.input} rightIcon/>
						<FontAwesome style={styles.iconInput} name="user" color="#FFF" size={24}/>
					</Item>
					<View style={styles.containerMainCheck}>
						<Text style={styles.mainCheckText}>Por favor ingrese su direccion de correo electronico.</Text>
					</View>
					<Button primary block rounded style={styles.sendButton} onPress={()=>{navigate('CheckEmail')}}>
						<MyText fontStyle="bold" style={styles.mainTextSend}> ENVIAR </MyText>
					</Button>
					<Button primary block rounded style={styles.backButton} onPress={()=>{navigate('SignIn')}}>
						<MyText fontStyle="bold" style={styles.mainTextBack}> VOLVER </MyText>
					</Button>
	        	</Form>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

ForgetScreen.navigationOptions = {
  header: null,
};

export default ForgetScreen
