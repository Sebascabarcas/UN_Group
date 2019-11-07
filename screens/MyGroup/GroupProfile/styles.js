import {StyleSheet, PixelRatio} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
        backgroundColor: theme.GRAY_COLOR,
        paddingHorizontal: wp(5),
		height: '100%',
		width: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	cardContainer:{
		borderRadius: theme.BORDER_RADIUS_MEDIUM,
		width: '90%',
		backgroundColor: theme.COMPLEMENTARY_COLOR
	},
	tripData:{
		paddingBottom: 15,
		paddingTop: 10,
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderColor: '#EFEFF4'
	},
	labelTrip: {
		marginLeft: wp(3),
		color: theme.GRAY_COLOR,
		fontSize: theme.FONT_SIZE_SMALL
	},
	labelAddress: {
		marginLeft: wp(3),
		marginTop: 2,
		fontSize: theme.FONT_SIZE_INPUT
	},
	containerButtons:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonItem:{
		paddingHorizontal: wp(5),
		borderRadius: theme.BORDER_RADIUS_MEDIUM,
		backgroundColor: theme.COMPLEMENTARY_COLOR
	},
	textItemButton:{
		fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.SECONDARY_COLOR
	},
    panelHeader: {
      paddingVertical: hp(2),
      width:'100%',
      borderTopLeftRadius: theme.BORDER_RADIUS_EXTRA_LARGE,
      borderTopRightRadius: theme.BORDER_RADIUS_EXTRA_LARGE,
      backgroundColor: theme.COMPLEMENTARY_COLOR,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
    },
    driverData:{
        width: '60%',
        flexDirection: 'row',
    },
    carData:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '30%',
        alignItems: 'center'
    },
    nameContainer:{
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    image:{
        width: PixelRatio.get()*30,
        borderRadius: theme.BORDER_RADIUS_SMALL,
        height: PixelRatio.get()*30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf :'center',
        marginRight: '5%',
    },
    imageCar:{
        width: PixelRatio.get()*50,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 2,
        height: PixelRatio.get()*50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf :'center',
    },
    driverName:{
        width: '65%',
        color: theme.SECONDARY_COLOR,
        fontSize:theme.FONT_SIZE_LARGE
    },
    badgeRate:{
        backgroundColor: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
    },
    rateText:{
        color: theme.COMPLEMENTARY_COLOR,
        fontSize: theme.FONT_SIZE_SMALL
    },
    badgeCarName:{
        height: 20,
        width: '90%',
        backgroundColor: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeModel:{
        height: 20,
        width: '90%',
        backgroundColor: '#FFD428',
        color: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText:{
        color: theme.COMPLEMENTARY_COLOR,
        alignSelf: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: theme.FONT_SIZE_EXTRA_MEDIUM,
    },
    actionTrip:{
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
        marginBottom: 10,
	},
    buttonAction:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: theme.BORDER_RADIUS_MEDIUM,
		marginHorizontal: 5,
		width: '30%'
	},
	buttonTextIcon:{
		fontSize: theme.FONT_SIZE_MEDIUM
	},
    arriveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: '80%',
        borderRadius: theme.BORDER_RADIUS_EXTRA_LARGE,
        backgroundColor: '#7DC623',
    }
})
