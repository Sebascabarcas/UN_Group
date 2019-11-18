import React from 'react';
import styles from './styles';
import {View, Image, TouchableOpacity} from 'react-native';
import {Badge, Card} from 'native-base';
import MyText from '../MyText';
import Images from '../../constants/Images.js';
import getEnvVars from '../../environment.js';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme.style';

const {apiUrl} = getEnvVars();
const FloatingUserSelect = ({firstName, selected, picture, firstLastName, onPress}) => {
  console.log(selected);
  
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={onPress}
    >
      {selected && <View style={[styles.selectIconContainer]}>
        <Ionicons
          name="ios-checkmark-circle"
          color="white"
          size={theme.ICON_SIZE_MEDIUM}
        />
      </View>}
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

export default FloatingUserSelect;
