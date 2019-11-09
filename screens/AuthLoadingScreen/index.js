import React, {useEffect} from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import styles from "./styles.js";
import Storage from '../../services/Storage';
import * as Permissions from 'expo-permissions';
import {useDispatch} from 'react-redux';

export default AuthLoadingScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    _bootstrapAsync()
  }, [dispatch])
  // Fetch the token from storage then navigate to our appropriate places
  _bootstrapAsync = async () => {
    const sessionInfo = await Storage.get ('Session');
    // console.log('Session Info: ', sessionInfo);
    // let {status} = await Permissions.getAsync (Permissions.LOCATION);
    if (sessionInfo) {
      const {user: current_user, user: {isSuperAdmin, isAdmin}, current_group, groups} = sessionInfo
      // console.log('Current group:', current_group);
      dispatch({type: 'session/SET_STATE', payload: {current_user, current_group, myGroups: groups, isSuperAdmin, isAdmin}});
      props.navigation.navigate('App');
      // props.navigation.navigate (status === 'granted' ? 'App' : 'Intro');
    } else {
      props.navigation.navigate ('Auth');
    }
  };

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}