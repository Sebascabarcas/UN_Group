import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {AntDesign} from '@expo/vector-icons';
import MyText from '../MyText';
import styles from './styles';
import LottieView from 'lottie-react-native';
import theme from '../../styles/theme.style';
import { Modal, View } from 'react-native';
import Animations from '../../constants/Animations';

export default (LoadingModal = () => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();
  const {loading: loadingSession} = useSelector (state => state.session);
  const {loading: loadingMentors} = useSelector (state => state.mentors);
  const {loading: loadingRoleModels} = useSelector (state => state.roleModels);
  const {loading: loadingGroups} = useSelector (state => state.groups);
  return (
    <Modal animationType="fade" transparent={true} visible={loadingSession || loadingRoleModels || loadingMentors || loadingGroups}>
      <View style={styles.container}>
        <LottieView style={styles.lottieView} source={Animations['scanning']} autoPlay loop />
      </View>
    </Modal>
  );
});
