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
		opacity: 0.98,
		backgroundColor: theme.GRAY_BACKGROUND_COLOR,
	},
	listItem: {
		justifyContent: 'space-between'
	},
	optionsContainer: {
		flex: 1,
		opacity: 0.98,
	},
	infoNameContainer: {
		flex: 1,
		alignItems: 'flex-start',
		opacity: 0.98,
	},
	profileInfoContainer: {
		justifyContent: 'center',
		marginVertical: 20,
		paddingVertical: 10,
		// margin: 20,
		elevation: 1,
		backgroundColor: 'white',
		borderColor: 'transparent',
		borderBottomWidth: 1,
		// flex: 1,
		// height: '40%',
		// backgroundColor:'red',
		// alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	profileImg: {
		borderRadius: 80,
		// marginTop: 15,
		// marginBottom: 15,
		height: 80,
		width: 80,
		// justifyContent: 'space-between'
	},
	name: {
		fontSize: theme.FONT_SIZE_LARGE,
		paddingTop: 10,
		paddingBottom: 5,
		textTransform: "capitalize",
		// backgroundColor: 'red',
		color: theme.DARK_COLOR,
		textAlign: 'left',
	},
	role: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		// paddingBottom: 5,
		// backgroundColor: 'green',
		color: theme.ROLE_TEXT_COLOR,
		textAlign: 'left',
	},
	iconContainer: {
		left: 0, marginRight: wp(2)
	}
})