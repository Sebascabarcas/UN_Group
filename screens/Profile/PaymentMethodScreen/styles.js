import {StyleSheet, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 : 110,
    backgroundColor: theme.GRAY_BACKGROUND_COLOR,
    flex: 1,
    opacity: 0.98,
    padding: 16,
  }, 
  primaryTextStyles: {
    paddingTop: 0,
    paddingBottom: 2
  },
  subtitleText: {
    marginTop: 32,
    marginBottom: 10
  }
});
