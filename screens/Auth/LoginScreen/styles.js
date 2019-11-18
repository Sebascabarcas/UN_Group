import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style.js'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	containerBack:{
		width: '100%',
		height: '100%',
	},
	fullImage: {
		width: '100%',
		height: '100%',
		flex: 1,
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	logo:{
		width: wp(50),
		height: wp(50)
	},
	mainForm: {
		width: wp(80)
	},
	input: {
		marginTop: 3,
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		alignContent: 'flex-end',
		color: '#FFF',
		height: 35,
		fontSize: theme.FONT_SIZE_INPUT
	},
	itemForm: {
		marginTop: 10,
		marginBottom: 10
	},
	containerMainCheck:{
		marginTop: 30,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	mainCheck: {
		borderRadius: 50,
	},
	mainCheckText: {
		color: '#FFF',
		marginLeft: 15,
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	loginButton:{
		marginTop: 40,
		width: '90%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: wp(5),
		marginRight: wp(5),
	},
	mainTextLogin:{
		color: '#FFF',
		fontWeight: '600'
	},
	forgetPassword:{
		color: '#FFF',
		textAlign: 'center',
		marginTop: 18,
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	iconInput:{
		position: 'absolute',
		right: 0
	},
});
