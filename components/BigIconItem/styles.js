import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
export default StyleSheet.create ({
	leftContainer: {
		height: '100%',
		alignItems: 'center',
		padding: 10,
		marginRight: 15,
		borderRadius: 20,
	},
	bodyContainer: {
		flex: 1,
		alignItems: 'flex-start',
		opacity: 0.98,
	},
	rightContainer: {
		paddingRight: 15
	},
	listItemContainer: {
		justifyContent: 'center',
		// marginVertical: 1,
		// paddingVertical: 10,
		// margin: 20,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#EFEFF4',
		elevation: 1,
		backgroundColor: 'white',
		// flex: 1,
		// height: '40%',
		// backgroundColor:'red',
		// alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	primaryText: {
		fontSize: theme.FONT_SIZE_LARGE,
		paddingTop: 10,
		// paddingBottom: 0,
		textTransform: "capitalize",
		// backgroundColor: 'red',
		color: theme.DARK_COLOR,
		textAlign: 'left',
	},
	secondaryText: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		// paddingBottom: 5,
		// backgroundColor: 'green',
		color: theme.ROLE_TEXT_COLOR,
		textAlign: 'left',
	},
})