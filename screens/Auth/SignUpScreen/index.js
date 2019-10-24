import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
  Picker,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import {Button, CheckBox, Input, Form, Item} from 'native-base';
import {FontAwesome, AntDesign, Ionicons} from '@expo/vector-icons';
import MyText from '../../../components/MyText';
import styles from './styles.js';
import theme from '../../../styles/theme.style';
import {register} from '../../../services/Session';
import Images from '../../../constants/Images';

const SignUpScreen = () => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();
  const [loading, _setLoading] = useState (false);
  const [showPassword, _setShowPassword] = useState (false);
  // const [gender, _setGender] = useState (null);
  // const [email, _setEmail] = useState (null);
  // const [password, _setPassword] = useState (null);
  // const [user, _setUser] = useState ({});
  const [user, _setUser] = useState ( {
    "username": "tester",
    "firstName": "John",
    "middleName": "Deivis",
    "lastName": "Barbosa",
    "job_title": "Colla",
    "pwd": "123456",
    "pwd_confirmation": "123456"
  });

  useEffect (() => {
    console.log ('SignUp');
  }, []);

  _signUpAsync = async () => {
    dispatch ({type: 'session/REGISTER', payload: {user, navigate}});
    // await AsyncStorage.setItem ('userToken', 'abc');
    // navigate ('SignIn');
  };

  return (
      <ImageBackground
        source={Images['auth_bg_image']}
        style={styles.fullImage}
        // blurRadius={0.5}
        // tintColor={"rgba(0, 0, 0, .75)"}
      >
        {/* <View style={styles.container}> */}
        <Form style={styles.mainForm}>
          {/* {loading && <Spinner color={theme.PRIMARY_COLOR} />} */}
          <KeyboardAvoidingView
            // style={styles.containerBack}
            behavior="padding"
            enabled
          >
          <Item white style={styles.itemForm}>
            <Input
              placeholder="Nombre de Usuario"
              placeholderTextColor="#FFF"
              style={styles.input}
              onChangeText={username => _setUser ({...user, username})}
              value={user.username}
            />
            <Ionicons
              style={styles.iconInput}
              name="ios-mail"
              color="#FFF"
              size={theme.ICON_SIZE_SMALL}
            />
          </Item>
          <Item white style={styles.itemForm}>
            <Input
              placeholder="Primer Nombre"
              placeholderTextColor="#FFF"
              style={styles.input}
              onChangeText={firstName => _setUser ({...user, firstName})}
              value={user.firstName}
            />
            <Ionicons
              style={styles.iconInput}
              name="ios-mail"
              color="#FFF"
              size={theme.ICON_SIZE_SMALL}
            />
          </Item>
          <Item white style={styles.itemForm}>
            <Input
              placeholder="Segundo Nombre"
              placeholderTextColor="#FFF"
              style={styles.input}
              onChangeText={middleName => _setUser ({...user, middleName})}
              value={user.middleName}
            />
            <Ionicons
              style={styles.iconInput}
              name="ios-mail"
              color="#FFF"
              size={theme.ICON_SIZE_SMALL}
            />
          </Item>
          <Item white style={styles.itemForm}>
            <Input
              placeholder="Primer Apellido"
              placeholderTextColor="#FFF"
              style={styles.input}
              onChangeText={lastName => _setUser ({...user, lastName})}
              value={user.lastName}
            />
            <Ionicons
              style={styles.iconInput}
              name="ios-mail"
              color="#FFF"
              size={theme.ICON_SIZE_SMALL}
            />
          </Item>
          <Item white style={styles.itemForm}>
            <Input
              placeholder="Contraseña"
              placeholderTextColor="#FFF"
              secureTextEntry={!showPassword}
              style={styles.input}
              onChangeText={password => _setUser ({...user, pwd})}
              value={user.pwd}
            />
            {!showPassword
              ? <FontAwesome
                  style={styles.iconInput}
                  name="lock"
                  onPress={() => _setShowPassword (true)}
                  color="#FFF"
                  size={theme.ICON_SIZE_SMALL}
                />
              : <FontAwesome
                  style={styles.iconInput}
                  onPress={() => _setShowPassword (false)}
                  name="unlock"
                  color="#FFF"
                  size={theme.ICON_SIZE_SMALL}
                />}
          </Item>
          </KeyboardAvoidingView>
          {/* <View style={styles.checksContainer}>
            <View style={styles.checkContainer}>
              <CheckBox
                center
                title="Hombre"
                // fontFamily={}
                checked={user.gender === 'female' ? false : true}
                onPress={() => _setUser ({...user, gender: 'male'})}
              />
              <MyText
                style={styles.checkText}
                color="white"
                onPress={() => _setUser ({...user, gender: 'male'})}
              >
                Hombre
              </MyText>
            </View>
            <View style={styles.checkContainer}>
              <CheckBox
                center
                title="Hombre"
                // fontFamily={}
                checked={user.gender === 'female' ? true : false}
                onPress={() => _setUser ({...user, gender: 'female'})}
              />
              <MyText
                style={styles.checkText}
                color="white"
                onPress={() => _setUser ({...user, gender: 'female'})}
              >
                Mujer
              </MyText>
            </View>
          </View> */}
          <Button
            onPress={_signUpAsync}
            rounded
            block
            // loading={loading}
            primary
            style={styles.registerButton}
          >
            <MyText> Registrarse </MyText>
          </Button>
        </Form>

        {/* </View> */}
        <View>
          <MyText
            onPress={() => navigate ('SignIn')}
            style={{color: 'white', fontSize: theme.FONT_SIZE_MEDIUM}}
          >
            ¿Tienes una cuenta? Inicia sesión
          </MyText>
        </View>
      </ImageBackground>
    
  );
};

SignUpScreen.navigationOptions = {header: null};
export default SignUpScreen;

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: 'eggplant',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });
