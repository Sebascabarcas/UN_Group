import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style.js'
import {Dimensions} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
    dataContainer:{
		display: 'flex',
		width: '100%',
		backgroundColor: theme.BACKGROUND_GRAY_COLOR,
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: wp(3),
		flexDirection: 'row',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderBottomWidth: 1,
		borderColor: '#EFEFF4'
	},
	subDataContainer:{
		flexDirection: 'column',
		flex: 1,
		marginLeft: 10,
	},
	driverPriceContainer:{
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'row'
	},
	profilePhoto:{
		width: 50,
		height: 50,
		borderRadius: 50/3
	},
	driverNameContainer:{
		flexDirection: 'row',
		marginBottom: 5,
		justifyContent: 'space-between',
	},
	driverNameText:{
		fontSize: theme.FONT_SIZE_LARGE
	},
	driverTypeText:{
		fontSize: theme.FONT_SIZE_MEDIUM,
		color: theme.GRAY_COLOR
	},
	badgeContainer:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	badgeItemBlueDark:{
		padding: 0,
		height: 20,
		backgroundColor: theme.SECONDARY_COLOR,
		justifyContent: 'center',
		alignItems: 'center'
	},
	badgeItemBlue:{
		padding: 0,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.PRIMARY_COLOR,
		marginLeft: 5,
	},
	badgeItemGray:{
		padding: 0,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.GRAY_COLOR,
		marginLeft: 5,
	},
	textTime:{
		fontSize: theme.FONT_SIZE_SMALL,
		margin: 0,
		padding: 0,
		color: theme.COMPLEMENTARY_COLOR
	},
	tripData:{
		paddingBottom: 15,
		paddingTop: 10,
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderBottomWidth: 1,
		borderColor: '#EFEFF4'
	},
	actionTrip:{
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		height: '20%',
		borderColor: '#EFEFF4'
	},
	labelTrip: {
		marginLeft: wp(3),
		color: theme.GRAY_COLOR,
		fontSize: theme.FONT_SIZE_SMALL
	},
	labelAddress: {
		marginHorizontal: wp(3),
		marginTop: 2,
		fontSize: theme.FONT_SIZE_INPUT
	},
	fullButtonTravel:{
		height: '10%',
	},
	fullButtonText:{
		padding: 200,
	},
	tripButtons:{
		width: '100%',
		paddingHorizontal: wp(7),
		paddingVertical: 15,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	tripButtonItem: {
		paddingHorizontal: wp(10),
		width: '80%',
		justifyContent: 'center',
		borderRadius: theme.BORDER_RADIUS_MEDIUM,
		backgroundColor: '#7DC623'
	},
	tripButtonStart:{
		fontSize: theme.FONT_SIZE_INPUT
	},
	priceContainer:{
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		width: '100%',
		paddingHorizontal: wp(3),
	},
	labelContainer:{
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 3,
	},
	fullButtonTravel:{
		position: 'absolute',
		bottom: 0,
		height: '10%',
		width: '100%',
		backgroundColor: theme.PRIMARY_COLOR
	},
	buttonAction:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: theme.BORDER_RADIUS_MEDIUM,
		height: '60%',
		marginHorizontal: 5,
		backgroundColor: theme.SECONDARY_COLOR,
		width: '30%'
	},
	buttonTextIcon:{
		fontSize: theme.FONT_SIZE_MEDIUM
	}
})
