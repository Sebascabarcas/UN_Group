import {StyleSheet, PixelRatio, Platform} from 'react-native';
import theme from '../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
    // justifyContent: 'space-evenly',
    // flexDirection: 'column',
    backgroundColor: '#EFEFF4',
    // marginHorizontal: wp(10)
		// height: '100%',
		// width: '100%',
  },
  content: {
    width: wp(100),
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 10
  },
  userTextInputContainer: {
    textAlign: 'center',
    marginTop: hp(5),
  },
  actionBottomButton: {
    // paddingVertical: 50,
    height: hp(10),
    position: 'absolute',
    bottom: 0,
    width: wp(100)
  }
    ////
})
