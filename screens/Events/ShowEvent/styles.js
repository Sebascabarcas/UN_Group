import {StyleSheet, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    opacity: 0.98,
    // padding: wp(5),
    // justifyContent: 'space-between'
    // backgroundColor: 'red',
  },
  headerContainer: {
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
    paddingBottom: 25,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: theme.PRIMARY_COLOR,
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
    borderRadius: 25,
    marginRight: 5
  },
  eventTitleContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center'
  },
  eventLocationContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  inputContainer: {
    // flex: 1,
    // backgroundColor: '#E4E5E9',
    // opacity: 0.98,
    // backgroundColor: 'red',
  },
  descriptionContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#EFEFF4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(5)
    // backgroundColor: '#E4E5E9',
    // opacity: 0.98,
    // backgroundColor: 'red',
  },
  footerContainer: {
    width: wp(100),
    padding: wp(5),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#EFEFF4',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    // flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
    // alignSelf: ''
  },
  actionButtonContainer: {
    // alignSelf: 'c',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    padding: 5,
    // margin: 20,
    // flex: 0.5
  },
  cancelButton: {
    marginRight: 5
  },
  actionEvent:{
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
    marginVertical: 10,
	},
  buttonAction:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: theme.BORDER_RADIUS_MEDIUM,
		marginHorizontal: 5,
		width: '50%'
	},
	buttonTextIcon:{
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.DARK_COLOR
	},
});
