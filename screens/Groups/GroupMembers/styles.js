import {StyleSheet, PixelRatio} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
		backgroundColor: theme.GRAY_COLOR,
		height: '100%',
		width: '100%',
		// justifyContent: 'space-evenly',
		// alignItems: 'center'
	},
    scrollview: {
        flex: 1
    },
	// containerButtons:{
	// 	flexDirection: 'column',
	// 	justifyContent: 'center',
	// 	alignItems: 'center'
	// },
	// buttonItem:{
	// 	paddingHorizontal: wp(5),
	// 	borderRadius: theme.BORDER_RADIUS_MEDIUM,
	// 	backgroundColor: theme.COMPLEMENTARY_COLOR
	// },
	textItemButton:{
		fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.SECONDARY_COLOR
	},
    
    ////
    exampleContainer: {
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: '#1a1917'
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: '#1a1917'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
})
