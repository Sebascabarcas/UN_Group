import React from 'react';
import {View} from 'react-native';
import styles from './styles.js';
import MyText from '../MyText';
// import {Input, CheckBox, Button, Header} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const BigListItem = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress} style={props.touchContainerStyles}>
      <View style={{...styles.listItemContainer, ...props.listContainerStyles}}>
        <View style={{...styles.leftContainer, ...props.leftContainerStyles}}>
          {props.leftItem}
        </View>
        <View style={{...styles.bodyContainer, ...props.bodyContainerStyles}}>
          <MyText
            fontStyle="bold"
            style={{...styles.primaryText, ...props.primaryTextStyles}}
          >
            {props.primaryText}
          </MyText>
          {props.secondaryText && <MyText
            style={{...styles.secondaryText, ...styles.secondaryTextStyles}}
          >
            {props.secondaryText}
          </MyText>}
        </View>
        {props.rightItem &&
          <View
            style={{...styles.rightContainer, ...props.rightContainerStyles}}
          >
            {props.rightItem}
          </View>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BigListItem;
