import { StyleSheet } from 'react-native'
import theme from '../../styles/theme.style.js'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
		borderRadius: 20,
		width: '100%',
		backgroundColor: theme.COMPLEMENTARY_COLOR,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		padding: wp(3),
		paddingLeft: wp(1),
		// borderBottomWidth: 3,
		// borderColor: '#EFEFF4'
	},
	dataContainer:{
		// width: '100%',
		// backgroundColor: 'red',
		// justifyContent: 'space-around',
		marginLeft: 0,
		// alignItems: 'center',
		// flexDirection: 'row',
	},
	postPhoto:{
		width: wp(20),
		height: wp(20),
		borderRadius: wp(20)/3
	},
	groupNameContainer:{
		flexDirection: 'row',
		marginBottom: 5,
		justifyContent: 'space-between',
	},
	postTitleText:{
		marginLeft: 3,
		color: theme.DARK_COLOR,
		fontSize: theme.FONT_SIZE_LARGE
	},
	descriptionData: {
		// marginRight: wp(20)
	},
	labelName: {
		marginLeft: 10,
		color: theme.GRAY_COLOR,
		fontSize: theme.FONT_SIZE_SMALL
	},
	labelAddress: {
		marginLeft: 10,
		marginTop: 2,
		fontSize: theme.FONT_SIZE_INPUT
	},
})
