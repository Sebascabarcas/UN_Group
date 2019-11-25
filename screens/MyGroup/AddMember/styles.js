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
    marginRight: wp(10),
    textAlign: 'center',
  },
  searchAnimation: {
    height: theme.FONT_SIZE_XL,
    position: 'absolute',
    top: -3,
    right: -18
  },
  bodyContainer: {
    display: 'flex',
    flex: 1,
    borderTopRightRadius: wp(30),
    backgroundColor: theme.SECONDARY_COLOR
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
  userSelectedContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#b650aa',
    borderRadius: wp(50),
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
    height: hp(10),
    bottom: 0,
    width: wp(100)
  },
  userSelectedImageContainer: {
    borderRadius: wp(50),
    height: hp(10),
    width: wp(20),
    marginRight: 10
    // flex: 1,
    // flexDirection: 'row',
  },
  userSelectedImage: {
    // ...StyleSheet.absoluteFillObject,
    height: hp(10),
    width: wp(20),
    resizeMode: 'cover',
    borderRadius: wp(10),
  },
  userSelectedNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userSelectedName: { 
    color: 'white'
  },
  userSelectedActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center'
  },
  cancelButton: {
    marginRight: 5
  }
    ////
})
