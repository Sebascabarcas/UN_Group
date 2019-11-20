import React from 'react';
import styles from './styles';
import {View, Image, TouchableOpacity} from 'react-native';
import {Badge, Card} from 'native-base';
import MyText from '../MyText';
import Images from '../../constants/Images.js';
import getEnvVars from '../../environment.js';

const FloatingRoleModel = ({firstName, picture, firstLastName, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={onPress}
    >
      <Image
        resizeMode="cover"
        source={picture ? {uri: `${picture.uri}`} : Images['no-profile-photo']}
        style={styles.image}
      />
      <View
        style={[styles.textContainer]}
      >
        <MyText
          fontStyle="semibold"
          style={[styles.title]}
        >
          {firstName} {firstLastName}
        </MyText>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingRoleModel;
