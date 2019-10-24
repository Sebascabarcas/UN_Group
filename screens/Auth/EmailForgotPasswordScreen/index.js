import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import {Button, Input, CheckBox} from 'react-native-elements';
import styles from "./styles.js";
import {useNavigation} from 'react-navigation-hooks';
import MyText from '../../../components/MyText';
import theme from '../../../styles/theme.style';
import Images from '../../../constants/Images.js';

const EmailForgotPasswordScreen = () => {
  //   state = {
  //     checked: true
  //   }
  const {navigate} = useNavigation ();
  useEffect (() => {
    console.log('EmailForgot');
  }, []);

  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    navigate ('SignIn');
  };

    // const {checked} = this.state
    return (
      <ImageBackground
        source={Images['auth_bg_image']}
        style={styles.container}
        // blurRadius={0.5}
        // tintColor={"rgba(0, 0, 0, .75)"}
      >
        <View style={styles.container}>
          <Image
            style={{width: 100, height: 100, marginBottom: 20}}
            source={Images['password_restored']}
          />

          <MyText style={{marginTop: 20, width: 350, marginBottom: 40, textAlign: "center", color: 'white', fontSize: theme.FONT_SIZE_LARGE}}>
            Por favor revise su correo, hemos enviado infomación que le ayudará a restablecer sus accesos
          </MyText>

          <Button
            onPress={() => _signInAsync ()}
            buttonStyle={{width: 250}}
            title="Iniciar Sesión"
          />

        </View>
      </ImageBackground>
    );
}
EmailForgotPasswordScreen.navigationOptions = {header: null};
export default EmailForgotPasswordScreen