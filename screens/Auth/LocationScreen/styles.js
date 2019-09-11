import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style.js'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export default StyleSheet.create({
	mainContent: {
		flex: 1,
		width: wp(100),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	logoIntroSlider:{
		alignSelf: 'center'
	},
	mainTitle:{
		textAlign: 'center',
		width: wp(80),
		fontSize: theme.FONT_SIZE_EXTRA_LARGE
	},
	description:{
		textAlign: 'center',
		fontSize: theme.FONT_SIZE_MEDIUM,
		width: wp(80),
		marginTop: 10
	},
	dotStyle: {
		backgroundColor: '#019CDE'
	},
	buttonCircle: {
		width: wp(70),
		marginBottom: 40
	},
	skipContainer:{
		marginBottom: 40
	},
	skipLabel:{
		color: '#BEC2CE',
	}
});
