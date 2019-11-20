import { StyleSheet } from 'react-native'
import theme from '../../styles/theme.style.js'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Dimensions, Platform } from 'react-native';
const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

const IS_IOS = Platform.OS === 'ios';
const slideHeight = hp(20);
const slideWidth = wp(25);
const itemHorizontalMargin = wp(2);

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: slideWidth,
        height: slideHeight,
        // backgroundColor: 'red',
        // paddingHorizontal: itemHorizontalMargin,
        marginBottom: 5,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        // flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        height: hp(15),
        width: wp(25),
        borderRadius: wp(10),
    },
    imageContainerEven: {
        backgroundColor: colors.black,
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        // resizeMode: 'cover',
        height: hp(15),
        width: wp(25),
        borderRadius: wp(10)
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 15 - entryBorderRadius,
		paddingBottom: 5,
        // paddingHorizontal: wp(5),
        backgroundColor: 'transparent',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: theme.FONT_SIZE_SMALL,
        // letterSpacing: 0.5
    }
});