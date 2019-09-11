import {StyleSheet, Platform} from 'react-native';
import theme from '../../styles/theme.style';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { PLATFORM } from '../../native-base-theme/variables/commonColor';
import variables from '../../native-base-theme/variables/platform';



export default StyleSheet.create ({
	creditCardContainer: {
		backgroundColor: 'white',
		elevation: 4,
		borderTopWidth: 0.5,
		borderTopColor: '#EFEFF4',
		borderRadius: 8,
		padding: 15,
		// height: 200,
		flex: .25,
		// paddingVertical: 50,
		flexDirection: 'column'
	},
	dateContainer: {
		marginTop: 10
		// flex: 1,
		// flexDirection: 'row'
	},
	roundedInput: {
		backgroundColor: '#F1F2F6',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#EFEFF4',
        alignSelf: Platform.OS === PLATFORM.IOS ? 'stretch' : 'flex-start',
        flex: 1,
        fontFamily: theme.FONT_FAMILY_SEMIBOLD,
        fontSize: variables.inputFontSize,
        paddingVertical: 10,
		paddingLeft: 10,
		minHeight: variables.inputHeightBase + 40,
		maxHeight: variables.inputHeightBase + 40,
		width: '100%'
	},
	roundedInputDate: {
		backgroundColor: '#4CE5B1',
		width: '30%'
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