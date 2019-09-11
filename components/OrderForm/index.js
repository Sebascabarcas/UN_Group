import React, {useState, useEffect} from 'react';
import {View, TouchableHighlight} from 'react-native';
import styles from './styles.js';
import MyText from '../MyText';
import {FontAwesome, Entypo, Foundation} from '@expo/vector-icons';
import Placeholder, {Line} from 'rn-placeholder';
import theme from '../../styles/theme.style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Button} from 'native-base';
// import {useSelector} from 'react-redux';

export default (OrderForm = props => {
  // const originLocation = useSelector(state => state)
  const {
    containerStyle,
    origin,
    destiny,
    time,
    comment,
    date,
    openInput,
    checkFields,
    showDateTimePicker,
    loading,
    formLoading,
  } = props;
  return (
    <View style={{...styles.formContainer, ...containerStyle}}>
      <Placeholder
        isReady={!formLoading}
        animation="fade"
        whenReadyRender={() => (
          <View style={{flex: 1}}>
            <MyText fontStyle="bold" h4 style={styles.formTitle}>
              ¿A dónde vamos?
            </MyText>
            {/* <Divider style={{margin: wp (1)}} /> */}
            <View style={styles.inputContainer}>
              <FontAwesome
                style={styles.iconContainer}
                name="street-view"
                color={theme.SECONDARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
              <TouchableHighlight
                onPress={() => openInput ('origin')}
                underlayColor="transparent"
              >
                <MyText fontStyle="semibold" style={styles.inputText}>
                  {origin ? origin : 'Origen'}
                </MyText>
              </TouchableHighlight>
            </View>
            <View style={styles.inputContainer}>
              <Entypo
                style={{...styles.iconContainer, marginLeft: 2}}
                name="dots-three-vertical"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_EXTRA_SMALL}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome
                style={styles.iconContainer}
                name="dot-circle-o"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
              <TouchableHighlight
                onPress={() => openInput ('destiny')}
                underlayColor="transparent"
              >
                <MyText fontStyle="semibold" style={styles.inputText}>
                  {destiny ? destiny : 'Destino'}
                </MyText>
              </TouchableHighlight>
            </View>
            <View style={{...styles.inputContainer, ...styles.input}}>
              <FontAwesome
                style={styles.iconContainer}
                name="calendar"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
              <TouchableHighlight
                onPress={() => showDateTimePicker ('date')}
                underlayColor="transparent"
              >
                <MyText fontStyle="semibold" style={styles.inputText}>
                  {date ? date : 'Fecha'}
                </MyText>
              </TouchableHighlight>
            </View>
            <View style={{...styles.inputContainer, ...styles.input}}>
              <FontAwesome
                style={styles.iconContainer}
                name="clock-o"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
              <TouchableHighlight
                onPress={() => showDateTimePicker ('time')}
                underlayColor="transparent"
              >
                <MyText fontStyle="semibold" style={styles.inputText}>
                  {time ? time : 'Hora'}
                </MyText>
              </TouchableHighlight>
            </View>
            <View style={{...styles.inputContainer, ...styles.input}}>
              <Foundation
                style={styles.iconContainer}
                name="comment"
                color={theme.PRIMARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
              <TouchableHighlight
                onPress={() => openInput ('comment')}
                underlayColor="transparent"
              >
                <MyText fontStyle="semibold" style={styles.inputText}>
                  {comment ? comment : 'Comentario'}
                </MyText>
              </TouchableHighlight>
            </View>
            {/* <Button
            // loading={loading}
            /> */}
            <Button
              primary
              rounded
              block
              iconLeft
              onPress={checkFields}
              style={{
                width: '40%',
                marginTop: 10,
                alignSelf: 'center',
              }}
            >
              <FontAwesome
                name="check"
                size={theme.ICON_SIZE_SMALL}
                color="white"
              />
              <MyText >Solicitar</MyText>
            </Button>
          </View>
        )}
      >
        {/* <View style={{...styles.formContainer, ...containerStyle}}> */}
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        {/* </View> */}
      </Placeholder>

    </View>
  );
});
