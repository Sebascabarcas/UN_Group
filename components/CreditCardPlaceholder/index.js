import React from 'react';
import {View} from 'react-native';
import styles from './styles.js';
import MyText from '../MyText';
import {Input} from 'native-base';

const CreditCardPlaceholder = props => {
  return (
    <View style={styles.creditCardContainer}>
        <Input placeholder="1234 567 890" placeholderTextColor="#BEC2CE" style={styles.roundedInput}/>
        {/* <View style={styles.dateContainer}>
            <MyText></MyText>
        </View> */}
        <View style={styles.dateContainer}>
            <Input placeholder="MM/YYYY" placeholderTextColor="#BEC2CE" style={{...styles.roundedInput, ...styles.roundedInputDate}}/>

        </View>
    </View>
  );
};

export default CreditCardPlaceholder;
