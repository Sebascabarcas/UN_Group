import {StyleSheet, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
    backgroundColor: '#fff',
    opacity: 0.98,
    // backgroundColor: 'red',
  },
  inlineForm: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1
  },
  inlineInput: {
    flex: 1
  },
  inlineInputNum: {
    flex: 0.3
  },
  actionBottomButton: {
    // paddingVertical: 50,
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: wp(100)
  }
});
