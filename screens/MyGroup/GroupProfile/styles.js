import {StyleSheet, PixelRatio, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	content: {
        backgroundColor: 'white',
        marginBottom: hp(1)
        // flex: 1,
        // paddingHorizontal: wp(5),
		// height: '100%',
		// width: '100%',
		// justifyContent: 'space-evenly',
		// alignItems: 'center'
	},
    imageCar:{
        width: PixelRatio.get()*40,
        borderRadius: wp(100),
        borderColor: '#fff',
        borderWidth: 2,
        marginVertical: hp(3),
        height: PixelRatio.get()*40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf :'center',
    },
    centerText: {
        textAlign: 'center'
    },
    groupInfoContainer: {
        width: wp(100),
        // flex: 1,
        backgroundColor: theme.SECONDARY_COLOR,
        paddingTop: Platform.OS === 'ios' ? 60 : 80,
        paddingBottom: hp(2),
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: '#EFEFF4',
        shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 10, 
    },
    groupNameText: {
        fontSize: theme.FONT_SIZE_EXTRA_LARGE,
        color: 'white'
    },
    groupDescriptionText: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: 'white'

    },
    groupSubtitle: {
        fontSize: theme.FONT_SIZE_MEDIUM
    },
    iconButtonContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        margin: 10,
        borderRadius: 50,
        borderColor: '#EFEFF4',
        shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 2, 
    },
    iconButtonTitle: {

    },
    actionBottomButton: {
        position: 'absolute',
        bottom: 0,
        height: hp(9),
        width: wp(100)
      }
})
