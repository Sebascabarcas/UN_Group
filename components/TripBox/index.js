import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Badge} from 'react-native-elements';
import styles from './styles.js';
import MyText from '../MyText';
import moment from 'moment'
import {FontAwesome} from '@expo/vector-icons';
import theme from '../../styles/theme.style';

export default TripBox = props => {
  const {code, origin, destiny, date_and_time, status, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.box, ...props.style}}
    >
      <View>
        <MyText fontStyle="bold" style={styles.codeText}>COD: {code}</MyText>
        <View style={styles.infoBoxContainer}>
          <View style={styles.infoContainer}>
            <FontAwesome
              style={styles.iconContainer}
              name="map-marker"
              color={theme.PRIMARY_COLOR}
              size={theme.ICON_SIZE_MEDIUM}
            />
            <MyText style={styles.textInfo} numberOfLines={2} ellipzeMode="tail">{origin}</MyText>
          </View>
          <View style={{...styles.infoContainer}}>
            <FontAwesome
              style={styles.iconContainer}
              name="flag"
              color={theme.PRIMARY_COLOR}
              size={theme.ICON_SIZE_SMALL}
            />
            <MyText style={styles.textInfo} numberOfLines={2} ellipzeMode="tail">{destiny}</MyText>
          </View>
        </View>
        <View style={styles.infoBoxContainer}>
          <View style={styles.infoContainer}>
            <FontAwesome
              style={styles.iconContainer}
              name="calendar"
              color={theme.PRIMARY_COLOR}
              size={theme.ICON_SIZE_SMALL}
            />
            <MyText style={styles.textInfo}>{moment(date_and_time).format('DD-MM-YYYY')}</MyText>
          </View>
          <View style={styles.infoContainer}>
            <FontAwesome
              style={styles.iconContainer}
              name="clock-o"
              color={theme.PRIMARY_COLOR}
              size={theme.ICON_SIZE_SMALL}
            />
            <MyText style={styles.textInfo}>{moment(date_and_time).format('hh:mm a')}</MyText>
          </View>
        </View>
        <View style={styles.badgeContainer}>
          <Badge badgeStyle={styles.badge} status={(status === 'finished' ? 'warning' : 'success')} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
