import {StyleSheet, Platform, PixelRatio} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  headerContainer: {
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
    paddingBottom: 25,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    backgroundColor: theme.SECONDARY_COLOR,
  },
  headerInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupInfoContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  imageGroup: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  },
  content: {
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
    flexDirection: 'row',
    marginVertical: hp(5)
    // marginHorizontal: wp(10)
  },
  usernameText: {
    color: theme.DARK_COLOR
    // fontSize: theme.FONT_SIZE_LARGE
  },
  secondaryInfo: {
    width: wp(30)
  },
  secondaryInfoEmail: {
    width: wp(60)
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
