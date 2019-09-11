import {StyleSheet} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
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
  },
  actionBottomButton: {
    // paddingVertical: 50,
    height: 100,
    position: 'absolute',
    bottom: 0,
    width: wp(100)
  }
});
