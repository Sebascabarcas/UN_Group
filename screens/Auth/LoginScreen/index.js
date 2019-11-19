import React, {useState} from 'react';
import {
  AsyncStorage,
  Image,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import MyText from '../../../components/MyText';
import {FontAwesome} from '@expo/vector-icons';
import {
  Container,
  Icon,
  Form,
  Item,
  Input,
  Label,
  CheckBox,
  Button,
  Spinner,
} from 'native-base';
import styles from './styles.js';
import theme from '../../../styles/theme.style.js';
import {useNavigation} from 'react-navigation-hooks';
import {login} from '../../../services/Session';
import Storage from '../../../services/Storage';
import {useDispatch} from 'react-redux';
import Images from '../../../constants/Images';

const LoginScreen = () => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();
  // const [checked, _setChecked] = useState (true);
  const [showPassword, _setShowPassword] = useState (false);
  const [loading, _setLoading] = useState (false);
  const [username, _setUsername] = useState (null);
  const [pwd, _setPassword] = useState (null);
  // const [username, _setUsername] = useState ('sebastiancabarcas');
  // const [pwd, _setPassword] = useState ('tester');

  _signInAsync = async () => {
    _setLoading (true);
    try {
      dispatch({type: 'session/LOGIN', payload: {auth: {username, pwd}, navigate}});
      // storeSession: checked, }});
    } catch (error) {
      console.log('error');
      console.log(error);
      
      ToastAndroid.show ('Usuario o contraseña invalidos', ToastAndroid.SHORT);
    }
    _setLoading (false);
    // await AsyncStorage.setItem ('userToken', 'abc');
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
          {loading && <Spinner color={theme.PRIMARY_COLOR} />}
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
          <MyText
            style={styles.forgetPassword}
            onPress={() => navigate ('ForgotPassword')}
          >
            ¿Olvidaste tu contraseña?
          </MyText>
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
