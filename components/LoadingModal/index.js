import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles';
import LottieView from 'lottie-react-native';
import { Modal, View, Platform } from 'react-native';
import Animations from '../../constants/Animations';

export default (LoadingModal = () => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();
  const {loadingModalVisible} = useSelector (state => state.modals);
  return (
    <Modal animationType="fade" transparent={true} visible={loadingModalVisible}>
      <View style={styles.container}>
        <LottieView style={styles.lottieView} source={Animations[Platform.OS === 'ios' ? 'loading-2' : 'scanning']} autoPlay loop />
      </View>
    </Modal>
  );
});
