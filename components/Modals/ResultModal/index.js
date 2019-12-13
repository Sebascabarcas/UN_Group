import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'native-base';
import MyText from '../../MyText';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {Modal, View} from 'react-native';
import Animations from '../../../constants/Animations';

export default (ResultModal = () => {
  const dispatch = useDispatch ();
  const {resultModalVisible, resultModalProps: {resultText, resultAnimation, error}} = useSelector (
    state => state.modals
  );
  console.log(resultText);
  console.log(resultAnimation);
  
  
  return (
    <Modal
      animationType="fade"
      hardwareAccelerated={true}
      transparent={true}
      visible={resultModalVisible}
      onRequestClose={() =>
        dispatch ({
          type: 'modals/SET_STATE',
          payload: {
            resultModalVisible: false,
          },
        })}
    >
      <View style={styles.container}>
        <View style={styles.resultModal}>
          <LottieView
            style={styles.lottieView}
            source={Animations[resultAnimation]}
            autoPlay
            loop
          />
          <MyText fontStyle="bold" style={styles.questionText}>
            {resultText}
          </MyText>
          <View style={styles.actionButtonsContainer}>
            <Button
              primary
              transparent
              style={styles.acceptButton}
              onPress={() => {
                dispatch ({
                  type: 'modals/SET_STATE',
                  payload: {
                    resultModalVisible: false,
                  },
                })
              }}
            >
              <MyText style={styles.acceptButtonText} fontStyle="bold">
                Ok
              </MyText>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
});
