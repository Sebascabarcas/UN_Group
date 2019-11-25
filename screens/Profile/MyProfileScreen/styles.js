import {StyleSheet} from 'react-native';
import theme from '../../../styles/theme.style';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
export default StyleSheet.create ({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		opacity: 0.98
	},
	listItem: {
		justifyContent: 'space-between'
	},
	infoContainer: {
		flex: 1,
		marginBottom: hp(9),
		backgroundColor: theme.GRAY_BACKGROUND_COLOR,
		opacity: 0.98
	},
	profileImgContainer: {
		justifyContent: 'center',
		// margin: 20,
		elevation: 1,
		paddingTop: 5,
		// backgroundColor: 'white',
		borderColor: 'transparent',
		borderBottomWidth: 1,
		flex: 0.7,
		// height: '40%',
		// backgroundColor:'red',
		// alignContent: 'center',
		alignItems: 'center',
		// flexDirection: 'row',
	},
	profileImg: {
		borderRadius: hp(12),
		// marginTop: 15,
		// marginBottom: 15,
		height: hp(25),
		width: hp(25),
        borderColor: theme.GRAY_COLOR,
        borderWidth: 2,
        overflow: 'hidden'
		// justifyContent: 'space-between'
	},
	name: {
		fontSize: theme.FONT_SIZE_EXTRA_LARGE,
		paddingTop: 10,
		paddingBottom: 5,
		textTransform: "capitalize",
		color: theme.DARK_COLOR,
		textAlign: 'left',
	},
	role: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		// paddingBottom: 5,
		color: theme.ROLE_TEXT_COLOR,
		textAlign: 'center',
	},
	scroller: {
		flex: 1,
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
		marginTop: hp(1),
		marginBottom: hp(1)
		// flexDirection: 'row',
		// justifyContent: 'center',
	},
	profileInfoChecks: {
		flex: 1,
		flexDirection: "column", 
		width: wp(80),
		// flexDirection: 'row',
		// alignItems: "center",
		// alignContent: "center",
		justifyContent: 'center',
	},
	infoChecks: {
		flexDirection: "row", 
	},
	actionButton: {
		width: wp(80) 
	},
	title: {
		fontSize: theme.FONT_SIZE_LARGE,
		paddingBottom: 5,
		textTransform: "capitalize",
		color: 'white',
		textAlign: 'left',
	},
	email: {
		fontSize: theme.FONT_SIZE_SMALL,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'center',
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
	topLinks:{
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
		color: "white",
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
		width: wp(80), 
		borderWidth: 1,
		borderColor: "white",
		borderRadius: 10
	},
	iconContainer: {
		left: 0, marginRight: wp(2)
	},
	actionBottomButton: {
		// paddingVertical: 50,
		height: hp(10),
		position: 'absolute',
		bottom: 0,
		width: wp(100)
	}
})