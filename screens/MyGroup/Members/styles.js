import {StyleSheet, PixelRatio} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
        flex: 1,
        // flexDirection: 'column',
		backgroundColor: theme.GRAY_LIGHT_COLOR,
		// height: '100%',
		// width: '100%',
	},
    scrollview: {
        // flex: 1,
    },
	scrollviewContainer:{
        flex: 1,
        // alignContent: 'flex-end',
        // flexGrow: 1,
        justifyContent : 'center',
        // justifyContent: 'space-around',
        // alignItems: 'baseline',
	},
	sliderContainer:{
        // backgroundColor: 'red',
        // flex: 1,
        // alignContent: 'flex-end',
        // justifyContent: 'space-around',
        // alignItems: 'baseline',
    },
	slider:{
	},
	textItemButton:{
		fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.SECONDARY_COLOR
	},
    ////
})
