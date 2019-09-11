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
		width: wp(70)
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
		marginLeft: 5,
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	sendButton:{
		marginTop: 40,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: wp(5),
		marginRight: wp(5),
		borderRadius: 10,
	},
	mainTextSend:{
		color: '#FFF',
	},
	backButton:{
		marginTop: 15,
		backgroundColor: '#FFF',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: wp(5),
		marginRight: wp(5)
	},
	mainTextBack:{
		color: '#242E42',
	},
	iconInput:{
		position: 'absolute',
		right: 0
	},
});
