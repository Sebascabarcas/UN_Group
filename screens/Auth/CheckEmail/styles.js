import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style.js'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	fullImage: {
		width: '100%',
		height: '100%',
	},
	textSuccess:{
		color: '#FFF',
		textAlign: 'center'
	},
	buttonSuccess:{
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: wp(70),
	},
	mainContainer:{
		flex: 1,
		flexDirection: 'column',
    	justifyContent: 'space-evenly',
    	alignItems: 'center',
		marginLeft: wp(5),
		marginRight: wp(5),
	}
});
