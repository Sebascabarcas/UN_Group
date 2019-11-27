import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'native-base';
import MyText from '../../MyText';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {Modal, View} from 'react-native';
import Animations from '../../../constants/Animations';

export default (ErrorModal = () => {
  const dispatch = useDispatch ();
  const {errorModalVisible, errorModalProps: {errorText, errorAnimation}} = useSelector (
    state => state.modals
  );
  // const {loading: loadingMentors} = useSelector (state => state.mentors);
  // const {loading: loadingRoleModels} = useSelector (state => state.roleModels);
  // const {loading: loadingGroups} = useSelector (state => state.groups);
  return (
    <Modal
      animationType="fade"
      hardwareAccelerated={true}
      transparent={true}
      visible={errorModalVisible}
      onRequestClose={() =>
        dispatch ({
          type: 'modals/SET_STATE',
          payload: {
            errorModalVisible: false,
          },
        })}
    >
      <View style={styles.container}>
        <View style={styles.errorModal}>
          <LottieView
            style={styles.lottieView}
            source={Animations[errorAnimation || 'failure']}
            autoPlay
            loop
          />
          <MyText fontStyle="bold" style={styles.errorText}>
            {errorText}
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
                    errorModalVisible: false,
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
