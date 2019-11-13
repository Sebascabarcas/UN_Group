import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
export default StyleSheet.create ({
	touchContainerStyles: {
		borderColor: '#EFEFF4',
        shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 2, 
	},
	leftContainer: {
		alignItems: 'center', marginHorizontal: 15
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
		marginVertical: 1,
		paddingVertical: 10,
		// margin: 20,
		elevation: 1,
		backgroundColor: 'white',
		borderColor: 'transparent',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		// flex: 1,
		// height: '40%',
		// backgroundColor:'red',
		// alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	primaryText: {
		fontSize: theme.FONT_SIZE_LARGE,
		paddingTop: 10,
		paddingBottom: 5,
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