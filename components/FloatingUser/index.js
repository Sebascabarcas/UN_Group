import React from 'react';
import styles from './styles.js';
import {View, Image, TouchableOpacity} from 'react-native';
import {Badge, Card} from 'native-base';
import MyText from '../MyText';
import Images from '../../constants/Images.js';
import getEnvVars from '../../environment.js';

const {apiUrl} = getEnvVars();
const FloatingUser = ({firstName, picture, lastName, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={onPress}
    >
      <View style={[styles.imageContainer]}>
        <Image
          source={picture ? {uri: `${apiUrl}${picture.uri}`} : Images['no-profile-picture']}
          style={styles.image}
        />
      </View>
      <View
        style={[styles.textContainer]}
      >
        <MyText
          fontStyle="semibold"
          style={[styles.title]}
          // numberOfLines={2/}
        >
          {firstName} {lastName}
        </MyText>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingUser;
