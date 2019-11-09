import React from 'react';
import {View} from 'react-native';
import styles from './styles.js';
import MyText from '../MyText';
import LottieView from 'lottie-react-native';
import animations from '../../constants/Animations.js';
// import {Input, CheckBox, Button, Header} from 'react-native-elements';

const NoResults = ({noFoundContainerStyles, lottieProps, primaryTextStyles, secondaryTextStyles, primaryText, secondaryText, animationName}) => {
  return (
    <View style={{...styles.noFoundContainer, ...noFoundContainerStyles}}>
        <LottieView {...lottieProps} source={animations[animationName]} autoPlay loop />
        <View style={styles.noFoundTextContainer}>
        <MyText fontStyle="bold" style={{...styles.noFoundTextPrimary, ...primaryTextStyles}}>{primaryText}</MyText>
        <MyText fontStyle="semibold" style={{...styles.noFoundTextSecondary, ...secondaryTextStyles}}>{secondaryText}</MyText>
        </View>
    </View>
  );
};

export default NoResults;
