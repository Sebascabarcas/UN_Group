import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
export default StyleSheet.create ({
	noFoundContainer: {
        // margin: wp(10),
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    noFoundTextContainer: {
        alignItems: 'center'
    },
    noFoundTextPrimary: {
        fontSize: theme.FONT_SIZE_MEDIUM,
    },
    noFoundTextSecondary: {
        color: theme.GRAY_NO_RESULTS_COLOR, 
        fontSize: theme.FONT_SIZE_MEDIUM,
        textAlign: 'center'
    }
})