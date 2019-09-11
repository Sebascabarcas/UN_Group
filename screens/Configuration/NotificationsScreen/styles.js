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
	notificationsContainer: {
		flex: 1,
		marginTop: 20,
		opacity: 0.98,
	},
	iconContainer: {
		left: 0, marginRight: wp(2)
	}
})