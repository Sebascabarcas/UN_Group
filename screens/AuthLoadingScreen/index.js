import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import styles from "./styles.js";
import Storage from '../../services/Storage';
import * as Permissions from 'expo-permissions';

export default class AuthLoadingScreen extends React.Component {
  constructor () {
    super ();
    this._bootstrapAsync ();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log('WHATTTTTTTTTTTTTT')
    const userToken = await Storage.get ('Session');
    let {status} = await Permissions.getAsync (Permissions.LOCATION);
    console.log(status)
    if (userToken) {
      this.props.navigation.navigate (status === 'granted' ? 'App' : 'Intro');
    } else {
      this.props.navigation.navigate ('Auth');
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.z
    /////////////////////////
    
  };

  // Render any loading content that you like here
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}