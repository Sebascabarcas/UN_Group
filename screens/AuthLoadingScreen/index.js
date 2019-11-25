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
  const [loadingAnimation, _setLoadingAnimation] = useState(false)
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
    // console.log('Session Info: ', sessionInfo);
    // let {status} = await Permissions.getAsync (Permissions.LOCATION);

    if (sessionInfo) {
      let current_group = null;
      let {user: {id: userId, userGroupRelations}, secret} = sessionInfo;
      let {user, user: {isSuperAdmin, isRolemodel, isMentor}} = await showUser (userId);
      if (isSuperAdmin) {
        var {groups} = await getGroups ();
        current_group = groups ? groups[0] || null : null;
      } else {
        if (userGroupRelations.length > 0) {
          userGroupRelations[0].group.isAdmin = userGroupRelations[0].isAdmin;
          userGroupRelations = userGroupRelations.map (
            groupRelation => groupRelation.group
          );
          current_group = userGroupRelations[0];
        }
      }
      user.isAdmin = current_group ? current_group.isAdmin : false;
      await Storage.set (
        'Session',
        {
          secret,
          user,
          groups: isSuperAdmin ? groups : userGroupRelations,
          current_group,
        },
      );

      // console.log('Current group:', current_group);
      dispatch ({
        type: 'session/SET_STATE',
        payload: {
          current_user: user,
          current_group,
          myGroups: isSuperAdmin ? groups : userGroupRelations,
          isSuperAdmin,
          isRolemodel,
          isMentor,
          isAdmin: current_group ? current_group.isAdmin : false,
        },
      });
      dispatch ({type: 'groups/SET_STATE', payload: {current_group}});
      props.navigation.navigate ('App');
      // props.navigation.navigate (status === 'granted' ? 'App' : 'Intro');
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
