import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  Image,
  View,
  Animated,
  Easing
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import Storage from '../../services/Storage';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import Animations from '../../constants/Animations.js';
import Images from '../../constants/Images.js';
import {showUser} from '../../services/Session.js';
import { getGroups } from '../../services/Groups.js';

export default (AuthLoadingScreen = props => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();
  const spinValue = new Animated.Value(0)

  // First set up animation 

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
// Second interpolate beginning and end values (in this case 0 and 1)

  useEffect (
    () => {
      Animated.timing(
        spinValue,
      {
        toValue: 1,
        useNativeDriver: true,
        duration: 9000,
        easing: Easing.linear
      }
      ).start()
    },
    []
  );

  useEffect (
    () => {
      _bootstrapAsync ();
    },
    [dispatch]
  );
  // Fetch the token from storage then navigate to our appropriate places
  _bootstrapAsync = async () => {
    const sessionInfo = await Storage.get ('Session');
    if (sessionInfo) {
      dispatch({
        type: 'session/LOAD_CURRENT_ACCOUNT',
        payload: {
          navigate,
          current_session: sessionInfo
        }
      })
    } else {
      props.navigation.navigate ('Auth');
    }
  };

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator /> */}
      {/* <StatusBar barStyle="default" /> */}
      <Animated.Image style={{width: 200, height: 200, transform: [{ rotate: spin }]}} source={Images['logo']} />
    </View>
  );
});
