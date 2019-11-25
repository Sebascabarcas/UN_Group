import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'native-base';
import MyText from '../MyText';
import styles from './styles';
import LottieView from 'lottie-react-native';
import theme from '../../styles/theme.style';
import {Modal, View} from 'react-native';
import Animations from '../../constants/Animations';

export default (ConfirmModal = () => {
  const dispatch = useDispatch ();
  const {handleOnConfirm, confirmModalVisible} = useSelector (
    state => state.modals
  );
  // const {loading: loadingMentors} = useSelector (state => state.mentors);
  // const {loading: loadingRoleModels} = useSelector (state => state.roleModels);
  // const {loading: loadingGroups} = useSelector (state => state.groups);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={confirmModalVisible}
      onRequestClose={() =>
        dispatch ({
          type: 'modals/SET_STATE',
          payload: {
            confirmModalVisible: false,
          },
        })}
    >
      <View style={styles.container}>
        <View style={styles.confirmModal}>
          <LottieView
            style={styles.lottieView}
            source={Animations['question-mark']}
            autoPlay
            loop
          />
          <MyText fontStyle="bold" style={styles.questionText}>
            ¿Está seguro?
          </MyText>
          <View style={styles.actionButtonsContainer}>
            <Button
              primary
              style={styles.acceptButton}
              onPress={() => {
                dispatch ({
                  type: 'modals/SET_STATE',
                  payload: {
                    confirmModalVisible: false,
                  },
                })
                handleOnConfirm();
              }}
            >
              <MyText fontStyle="bold">
                SI
              </MyText>
            </Button>
            <Button
              danger
              style={styles.denyButton}
              onPress={() => {
                dispatch ({
                  type: 'modals/SET_STATE',
                  payload: {
                    confirmModalVisible: false,
                  },
                });
              }}
            >
              <MyText fontStyle="bold">
                NO
              </MyText>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
});
