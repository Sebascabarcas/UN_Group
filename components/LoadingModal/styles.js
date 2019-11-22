import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottieView: {
    width: wp(30),
    height: hp(30),
  }
});