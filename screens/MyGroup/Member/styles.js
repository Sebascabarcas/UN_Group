import {StyleSheet, PixelRatio} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'space-evenly',
    // flexDirection: 'column',
    // backgroundColor: 'white',
    marginHorizontal: wp(10)
		// height: '100%',
		// width: '100%',
  },
  containerProfileImg: {
    // flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    // height: hp(40),
    // width: wp (80)
  },
  profileImg: {
    height: hp(40),
    width: wp (80),
    borderRadius: 90,
    borderColor: 'white',
    borderWidth: 2,
    overflow: 'hidden',
    marginVertical: hp(5)
  },
  memberName: {
    alignSelf: 'flex-start',
    // marginHorizontal: wp(10),
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    color: theme.DARK_COLOR
  },
  containerUsername: {
    flexDirection: 'row'
    // marginHorizontal: wp(10)
  },
  usernameText: {
    color: theme.DARK_COLOR
    // fontSize: theme.FONT_SIZE_LARGE
  },
  secondaryInfoTitle: {
    color: theme.GRAY_LIGHT_COLOR
  },
  secondaryInfoText: {
    color: theme.DARK_COLOR
  },
  containerSecondaryInfo: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between'
  },
  containerBottomAction: {
    marginVertical: 10
  }
    ////
})
