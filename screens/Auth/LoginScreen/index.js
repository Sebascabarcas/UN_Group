import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import MyText from '../../../components/MyText';
import {FontAwesome} from '@expo/vector-icons';
import {
  Form,
  Item,
  Input,
  Button,
} from 'native-base';
import styles from './styles.js';
import theme from '../../../styles/theme.style.js';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';
import Images from '../../../constants/Images';

const LoginScreen = () => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();
  const [showPassword, _setShowPassword] = useState (false);
  const [username, _setUsername] = useState (null);
  const [pwd, _setPassword] = useState (null);

  _signInAsync = async () => {
    dispatch({type: 'session/LOGIN', payload: {auth: {username, pwd}, navigate}});
  };
  
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.containerBack}>
      <ImageBackground
        style={styles.fullImage}
        source={Images['auth_bg_image']}
      >
        <Image
          style={styles.logo}
          source={Images['logo']}
        />
        <Form style={styles.mainForm}>
          <Item style={styles.itemForm}>
            <Input
              placeholder="Nombre de usuario"
              placeholderTextColor="#FFF"
              style={styles.input}
              onChangeText={text => _setUsername(text)}
              value={username}
            />
            <FontAwesome
              style={styles.iconInput}
              name="user"
              color="#FFF"
              size={24}
            />
          </Item>
          <Item style={styles.itemForm}>
            <Input
              placeholder="Contraseña"
              placeholderTextColor="#FFF"
              secureTextEntry={!showPassword}
              style={styles.input}
              onChangeText={text => _setPassword(text)}
              value={pwd}
            />
            {!showPassword ? <FontAwesome
              style={styles.iconInput}
              name="lock"
              onPress={() => _setShowPassword(true)}
              color="#FFF"
              size={24}
            /> :
            <FontAwesome
              style={styles.iconInput}
              onPress={() => _setShowPassword(false)}
              name="unlock"
              color="#FFF"
              size={24}
            />}
          </Item>
          {/* <View style={styles.containerMainCheck}>
            <CheckBox
              style={styles.mainCheck}
              checked={checked}
              onPress={() => _setChecked (!checked)}
            />
            <MyText
              onPress={() => _setChecked (!checked)}
              style={styles.mainCheckText}
            >
              Mantener mi sesión activa.
            </MyText>
          </View> */}
          <Button
            onPress={_signInAsync}
            rounded
            block
            primary
            style={styles.loginButton}
          >
            <MyText style={styles.mainTextLogin}> INICIAR </MyText>
          </Button>
        </Form>
        <View>
          <MyText
            onPress={() => navigate('SignUp')}
            style={{color: 'white', fontSize: theme.FONT_SIZE_MEDIUM}}
          >
              ¿No tienes una cuenta? Regístrate
          </MyText>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = {
  header: null,
};

export default LoginScreen;
