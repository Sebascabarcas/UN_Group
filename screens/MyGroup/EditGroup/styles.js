import {StyleSheet, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    opacity: 0.98,
    // backgroundColor: 'red',
  },
  topProfileContainer: {
	flex: 0.4,
	flexDirection: 'row',
	alignItems: 'center',
	elevation: 1,
	// backgroundColor: 'red',
	borderColor: 'transparent',
    borderBottomWidth: 1,
  },
  listItem: {
    // backgroundColor: "blue",
    justifyContent: 'space-between',
  },
  itemInput: {
    textAlign: 'right',
    color: theme.GRAY_COLOR,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: theme.GRAY_BACKGROUND_COLOR,
    opacity: 0.98,
  },
  profileImgContainer: {
    // justifyContent: 'center',
	// margin: 20,
	
    flex: 0.4,
    // height: '40%',
    // backgroundColor:'red',
    // alignContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  input: {
    textTransform: 'capitalize',
  },
  Iteminput: {
    textTransform: 'capitalize',
  },
  profileNameForm: {
    // backgroundColor:'blue',
    // justifyContent: 'center',
    // margin: 20,
    flex: 0.6,
    // height: '40%',
    // backgroundColor:'red',
    // alignContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  profileImg: {
    // marginTop: 15,
    // marginBottom: 15,
    borderRadius: 62.5,
    height: 125,
    width: 125,
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
  inputName: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    paddingTop: 10,
    paddingBottom: 5,
    textTransform: 'capitalize',
    color: theme.DARK_COLOR,
    textAlign: 'left',
  },
  editPhotoText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    paddingTop: 10,
    // color: theme.PRIMARY_COLOR,
    // textAlign: 'center',
  },
  profile: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 25,
    // borderBottomWidth: 1,
    // borderBottomColor: '#777777',
  },
  profileInfo: {
    flex: 1,
    marginTop: hp (1),
    marginBottom: hp (1),
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  profileInfoChecks: {
    flex: 1,
    flexDirection: 'column',
    width: wp (80),
    // flexDirection: 'row',
    // alignItems: "center",
    // alignContent: "center",
    justifyContent: 'center',
  },
  infoChecks: {
    flexDirection: 'row',
  },
  actionButton: {
    width: wp (80),
  },
  imgView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  img: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  topLinks: {
    height: 220,
    // backgroundColor: 'black',
  },
  bottomLinks: {
    flex: 1,
    // backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 450,
  },
  link: {
    flex: 1,
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    padding: 6,
    color: 'white',
    paddingLeft: 20,
    margin: 5,
    textAlign: 'left',
  },
  checkboxContainer: {
    // width: 300,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginBottom: 10,
  },
  inputContainer: {
    width: wp (80),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  iconContainer: {
    left: 0,
    marginRight: wp (2),
  },
  actionBottomButton: {
    // paddingVertical: 50,
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: wp(100)
  }
});
