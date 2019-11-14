import React from 'react';
import styles from './styles.js';
import {View, Image, TouchableOpacity} from 'react-native';
import {Badge, Card} from 'native-base';
import MyText from '../MyText';
import Images from '../../constants/Images.js';
import getEnvVars from '../../environment.js';

const {apiUrl} = getEnvVars();
const FloatingUser = ({firstName, picture, firstLastName, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={onPress}
    >
      <View style={[styles.imageContainer]}>
        <Image
          resizeMode="cover"
          source={picture ? {uri: `${picture.uri}`} : Images['no-profile-photo']}
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
          {firstName} {firstLastName}
        </MyText>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingUser;
