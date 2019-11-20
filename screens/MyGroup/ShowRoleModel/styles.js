import {StyleSheet, PixelRatio, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
    flex: 1,
    // justifyContent: 'space-evenly',
    // flexDirection: 'column',
    // backgroundColor: 'white',
    // marginHorizontal: wp(10)
		// height: '100%',
		// width: '100%',
  },
  headerContainer: {
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
    paddingBottom: 25,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: 'white',
  },
  headerInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerFloatingContainer: {
    flexDirection: 'row',
  },
  floatingScrollView: {

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
  userTextInputContainer: {
    marginTop: hp(5),
    textAlign: 'center',
  },
  bodyContainer: {
    display: 'flex',
    flex: 1,
    borderTopRightRadius: wp(70),
    backgroundColor: theme.SECONDARY_COLOR,
    // paddingBottom: hp(8)
  },
  usersContainer: {
    // flexDirection: 'row',
    // flexGrow: wp(80),
    margin: wp(5),
    marginBottom: wp(15),
  },
  userRow: {
    flex: 1
  },
  actionBottomButton: {
    // paddingVertical: 50,
    height: hp(8),
    borderRadius: wp(10),
    borderTopRightRadius: wp(10),
    position: 'absolute',
    bottom: 0,
    width: wp(100)
  },
  postImgContainer: {
    alignItems: 'center',
    marginVertical: hp(1)
  },
  profileImg: {
    // marginTop: 15,
    // marginBottom: 15,
    height: hp(20),
    width: hp(20),
    // justifyContent: 'space-between'
  },
  profileImgOverlay: {
    backgroundColor: '#000',
    opacity: 0.5,
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
    ////
})
